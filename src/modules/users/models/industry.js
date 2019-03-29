import companyModels from '../../company/models'

export default (sequelize, DataTypes) => {
  const Industry = sequelize.define(
    'industry', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      publish: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    }, {
      underscored: true,
      timestamps: true,
      freezeTableName: true,
      singular: 'industry',
      plural: 'industries',
      tableName: 'industries'
    }
  );

  Industry.associate = function (models) {
    Industry.belongsToMany(models.user, {
      through: 'user_industries',
      foreignKey: 'industry_id'
    });

    Industry.hasMany(companyModels.company, {
      foreignKey: 'industry_id'
    });
  }

  return Industry;
};