import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

module.exports = (api, db, jwtOptions, policyJwt) => {
  api.post("/user/register", (req, res) => {
    db.user
      .create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
      })
      .then(result =>
        res.json({ msg: `Congrats! ${result.username} You are registered` })
      );
    // .catch(error => {
    //   res.json('test');
    // });
  });
  api.get("/user/:id", policyJwt, (req, res) =>
    db.user
      .findByPk(req.params.id)
      .then(result => res.json({ result: result.username, message: "200 OK" }))
  );
  api.get("/users", policyJwt, (req, res) =>
    db.user.findAll().then(result => res.json(result))
  );

  //login route

  api.post("/user/login", async function(req, res, next) {
    const { username, password } = req.body;
    if (username && password) {
      let user = await db.user.findOne({ where: { username: username } });
      if (!user) {
        res.status(401).json({ message: "No such user found" });
      }
      if (user.password === password) {
        // from now on we'll identify the user by the id and the id is the
        // only personalized value that goes into our token
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: "ok", token: token });
      } else {
        res.status(401).json({ msg: "Password is incorrect" });
      }
    } else {
      res.json({ msg: "no user entered" });
    }
  });
};
