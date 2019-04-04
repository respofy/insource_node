import { Sequelize, Model } from 'sequelize'

export default class City extends Model {
	static init(sequelize) {
		return super.init(
			{
				job_id: { type: Sequelize.INTEGER, allowNull: false },
				user_id: { type: Sequelize.INTEGER, allowNull: false },
				status: { type: Sequelize.BOOLEAN, allowNull: false }
			},
			{
				sequelize,
				singular: 'jobUser',
				plural: 'jobUsers',
				tableName: 'job_users'
			}
		)
	}

	static associate(models) {
		this.hasMany(models.User, {
			foreignKey: 'city_id'
		})
	}
}
