import express from "express";
import bodyParser from "body-parser";

import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";
import db from "./models";
var cors = require("cors");
import passport from "passport";
import passportJWT from "passport-jwt";

import apiUser from "./app/api/user";
import apiDevice from "./app/api/device";
import apiTemp from "./app/api/temperature";
import { getUsers } from "./app/api/user";

// web token
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "secret";

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log("payload received", jwt_payload);
  let user = db.user.findOne({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    console.log("payload received", jwt_payload);
    next(null, false);
  }
});

// use the strategy
passport.use(strategy);

const app = express();
//initialize strategy in app
app.use(passport.initialize());

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// app.get(
//   '/protected',
//   passport.authenticate('jwt', { session: false }),
//   function(req, res) {
//     res.json({
//       msg: 'Congrats! You are seeing this because you are authorized',
//     });
//   },
// );

//var app = express.Router();

//app.use('/app', app);

//routes nonprotected
apiDevice(app, db);

//jwtOptions : to send the jwt when login
apiUser(app, db, jwtOptions, passport.authenticate("jwt", { session: false }));

// protected route
apiTemp(app, db, passport.authenticate("jwt", { session: false }));

//getUsers(app, db);

db.sequelize
  .sync()
  //   uncomment to populate  with dummy data
  // .then(() =>

  //   db.user
  //     .bulkCreate(
  //       times(10, () => ({
  //         username: faker.name.lastName(),
  //         password: "123"
  //       }))
  //     )
  //     .then(() =>
  //       db.device.bulkCreate(
  //         times(10, () => ({
  //           deviceName: faker.lorem.word(),
  //           userId: random(1, 5)
  //         }))
  //       )
  //     )
  //     .then(() =>
  //       db.temperature.bulkCreate(
  //         times(10, () => ({
  //           value: random(1, 50),
  //           deviceId: random(1, 5)
  //         }))
  //       )
  //     )
  // )
  .then(() =>
    app.listen(3000, () => console.log("App listening on port 3000!"))
  );
