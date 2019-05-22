import { Sequelize, Model } from 'sequelize'

class Salary extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
				salary_amount: { type: Sequelize.DOUBLE, allowNull: false },
				user_id: { type: Sequelize.INTEGER, allowNull: false },
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE, allowNull: true },
				active: { type: Sequelize.BOOLEAN, allowNull: false }
			},
			{
				sequelize,
				singular: 'salary',
				plural: 'salaries',
				tableName: 'user_salaries',
				modelName: 'salary'
			}
		)
	}

	static associate(models) {
		// User Relation
		this.belongsTo(models.User)
	}
}

// export
export default Salary
