import { Sequelize, Model } from 'sequelize'

class UserEducation extends Model {
	static init(sequelize) {
		return super.init(
			{
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE },
				user_id: { type: Sequelize.INTEGER, allowNull: false },
				profession_id: { type: Sequelize.INTEGER, allowNull: false },
				degree_id: { type: Sequelize.INTEGER, allowNull: false },
				university_id: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				singular: 'UserEducation',
				plural: 'UserEducations',
				tableName: 'user_education'
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User)
		this.belongsTo(models.Profession)
		this.belongsTo(models.Degree)
		this.belongsTo(models.University)
	}
}

export default UserEducation
