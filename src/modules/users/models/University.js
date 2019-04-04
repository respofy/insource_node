import { Sequelize, Model } from 'sequelize'

export default class University extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: { type: Sequelize.STRING, allowNull: false },
				description: { type: Sequelize.TEXT }
			},
			{
				sequelize,
				tableName: 'universities'
			}
		)
	}

	static associate(models) {
		this.hasMany(models.UserEducation, {
			foreignKey: 'university_id'
		})
	}
}
