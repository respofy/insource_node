import Sequelize from 'sequelize'

export default class Activation extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				phone: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
					primaryKey: true
				},
				code: { type: Sequelize.STRING, allowNull: false },
				activated: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				underscored: true,
				timestamps: true,
				tableName: 'activation'
			}
		)
	}

	static associate(models) {
		// Using additional options like CASCADE etc for demonstration
		// Can also simply do Task.belongsTo(models.User);
		// this.hasMany(models.Post, {
		//   onDelete: "CASCADE",
		//   foreignKey: {
		//     allowNull: false
		//   }
		// });
	}
}
