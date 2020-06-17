module.exports = (api, db) => {
  api.post("/device/register", (req, res) =>
    db.device
      .create({
        deviceName: req.body.deviceName,
        userId: req.body.userId
      })
      .then(result => res.json(result))
  );
  api.get("/device/:id", (req, res) =>
    db.device.findByPk(req.params.id).then(result => res.json(result))
  );
  api.get("/device", (req, res) =>
    db.device.findAll().then(result => res.json(result))
  );
  api.post("/device/delete/", (req, res) =>
    db.device
      .destroy({
        where: {
          id: req.body.deviceId
        }
      })
      .then(result => res.json({ message: "200 OK" }))
  );
};
