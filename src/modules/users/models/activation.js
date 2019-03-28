let activation = (sequelize, DataTypes) => {
  const activationModel = sequelize.define(
    'activation',
    {
      phone: { type: DataTypes.STRING, allowNull: false, unique: true, primaryKey: true},
      code: { type: DataTypes.STRING, allowNull: false },
      activated: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: true,
      underscored: true,
      tableName: 'activation'
    }
  )

  return activationModel
}

export default activation