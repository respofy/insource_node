import { Sequelize, Model } from 'sequelize'

export default class Salary extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
				salary_amount: { type: Sequelize.DOUBLE, allowNull: false },
				user_id: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				singular: 'salary',
				plural: 'salaries',
				tableName: 'user_salaries'
			}
		)
	}

	static associate(models) {
		this.hasMany(models.User, {
			foreignKey: 'user_id',
			target: 'id'
		})
	}
}
