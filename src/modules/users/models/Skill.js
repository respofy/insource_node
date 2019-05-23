import { Sequelize, Model } from 'sequelize'

class Skill extends Model {
	/**
	 *
	 */
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				tableName: 'skills',
				modelName: 'skill'
			}
		)
	}

	static associate(models) {
		// Profession Relation
		this.belongsToMany(models.Profession, {
			through: 'profession_skill',
			foreignKey: 'skill_id'
		})
		// WorkingExp Relation
		this.belongsToMany(models.UserWorkingExperience, {
			foreignKey: 'skill_id',
			through: 'user_working_experience_skills'
		})
		// Skills related to job
		this.belongsToMany(models.Job, {
			as: 'jobSkill',
			through: 'jobs_skills',
			foreignKey: 'skill_id'
		})
		
		// Profession Relation
		// this.belongsToMany(models.Profession, {
		// 	through: 'user_profession',
		// 	foreignKey: 'skill_id'
		// })
		// // User Profession Relation
		// this.belongsToMany(models.UserProfession, {
		// 	through: 'user_profession_skills',
		// 	foreignKey: 'skill_id'
		// })
		// // User Working Experience Relation
		// this.belongsToMany(models.UserWorkingExperience, {
		// 	through: 'user_working_experience_skills',
		// 	foreignKey: 'skill_id'
		// })
	}
}

export default Skill
