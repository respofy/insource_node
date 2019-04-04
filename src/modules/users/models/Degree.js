import { Sequelize, Model } from 'sequelize'

export default class Degree extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false },
				description: { type: Sequelize.TEXT }
			},
			{
				sequelize,
				tableName: 'degrees'
			}
		)
	}

	static associate(models) {
		this.hasMany(models.UserEducation, {
			foreignKey: 'degree_id'
		})
	}
}
