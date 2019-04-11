import { Sequelize, Model } from 'sequelize'

export default class Skill extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				tableName: 'cities'
			}
		)
	}

	static associate(models) {
		// Profession Relation
		this.belongsToMany(models.Profession, {
			through: 'user_profession',
			foreignKey: 'skill_id'
		})
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
