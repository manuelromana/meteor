module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    "device",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      deviceName: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );
  Device.associate = models => {
    Device.belongsTo(models.user);
  };
  Device.associate = models => {
    Device.hasMany(models.temperature);
  };
  return Device;
};
