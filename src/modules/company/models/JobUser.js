import { Sequelize, Model } from 'sequelize'

class JobUser extends Model {
	static init(sequelize) {
		return super.init(
			{
				job_id: { type: Sequelize.INTEGER, allowNull: false },
				user_id: { type: Sequelize.INTEGER, allowNull: false },
				percentage: { type: Sequelize.DOUBLE(4, 2), allowNull: false },
				approved_by_user: { type: Sequelize.BOOLEAN, allowNull: false }
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
		this.belongsTo(models.User)
		this.belongsTo(models.Job)
	}
}
// export
export default JobUser
