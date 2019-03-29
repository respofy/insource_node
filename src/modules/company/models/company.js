import userModels from '../../users/models'

export default (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'company', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      industry_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      identification_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      underscored: true,
      timestamps: true,
      freezeTableName: true,
      singular: 'company',
      plural: 'companies',
      tableName: 'companies'
    }
  );

  // Company.associate = function (models) {
  //   Company.belongsToMany(userModels.user, {
  //     through: 'company_owners',
  //     foreignKey: 'company_id'
  //   });
  // }

  return Company;
};
