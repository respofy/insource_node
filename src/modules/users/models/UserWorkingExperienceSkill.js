import { Sequelize, Model } from 'sequelize'

export default class UserWorkingExperienceSkill extends Model {
	static init(sequelize) {
		return super.init(
			{
				user_working_ex_id: { type: Sequelize.INTEGER, allowNull: false },
				skill_id: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				singular: 'UserWorkingExperienceSkill',
				plural: 'UserWorkingExperienceSkills',
				tableName: 'user_working_experience_skills'
			}
		)
	}

	static associate(models) {
		this.hasMany(models.User, {
			foreignKey: 'city_id'
		})
	}
}
