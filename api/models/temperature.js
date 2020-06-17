module.exports = (sequelize, DataTypes) => {
  const Temperature = sequelize.define(
    "temperature",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      value: DataTypes.INTEGER
    },
    {
      freezeTableName: true
    }
  );

  Temperature.associate = models => {
    Temperature.belongsTo(models.device);
  };

  return Temperature;
};
