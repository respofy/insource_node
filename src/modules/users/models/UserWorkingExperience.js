import { Sequelize, Model } from 'sequelize'

class UserWorkingExperience extends Model {
	static init(sequelize) {
		return super.init(
			{
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE },
				company_name: { type: Sequelize.STRING, allowNull: false },
				company_id: { type: Sequelize.INTEGER, allowNull: true },
				user_id: { type: Sequelize.INTEGER, allowNull: false },
				profession_id: { type: Sequelize.INTEGER, allowNull: false },
				role_id: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				singular: 'UserWorkingExperience',
				plural: 'UserWorkingExperiences',
				tableName: 'user_working_ex'
			}
		)
	}

	static associate(models) {
		// User Relation
		this.belongsTo(models.User)
		// Profession Relation
		this.belongsTo(models.Profession)
		// Role Relation
		this.belongsTo(models.Role)
		// Company Relation
		this.belongsTo(models.Company)
		// Skills Relation
		this.belongsToMany(models.Skill, {
			foreignKey: 'user_working_experience_id',
			through: 'user_working_experience_skills'
		})
	}
}

export default UserWorkingExperience
