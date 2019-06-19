import { Sequelize, Model } from 'sequelize'

class Meeting extends Model {
	static init(sequelize) {
		return super.init(
			{
				user_id: { type: Sequelize.INTEGER, allowNull: false },
				job_id: { type: Sequelize.INTEGER, allowNull: false },
				date: { type: Sequelize.DATE, allowNull: false },
				address: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				singular: 'meeting',
				plural: 'meetings',
				tableName: 'meetings',
				modelName: 'meeting'
			}
		)
	}

	static associate(models) {
		// User & Job relation
		this.belongsTo(models.User)
		this.belongsTo(models.Job)
	}
}

export default Meeting
