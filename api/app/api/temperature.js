const { Op } = require('sequelize');

module.exports = (api, db, policyJwt) => {
  api.post('/temperature/set', (req, res) =>
    db.temperature
      .create({
        value: req.body.value,
        deviceId: req.body.deviceId,
      })
      .then(result => {
        console.log(req.body);
        res.json(result);
      }),
  );
  api.get('/temperature/get/:id', (req, res) =>
    db.temperature
      .findAll({
        where: {
          createdAt: {
            [Op.lte]: new Date(),
          },
          deviceId: {
            [Op.eq]: req.params.id,
          },
        },
      })
      .then(data => res.json(data)),
  );
};
