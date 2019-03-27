let activation =  (sequelize, DataTypes) => {
  const activationModel = sequelize.define(
    'activation', 
    {
      phone: { type: DataTypes.STRING, allowNull: false },
      code: { type: DataTypes.STRING, allowNull: false },
      activated: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false
    }
  )

  return activation
}

export default activation