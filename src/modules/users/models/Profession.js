import { Sequelize, Model } from 'sequelize'

export default class Profession extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				tableName: 'professions'
			}
		)
	}

	static associate(models) {
		// Skill Relation
		this.belongsToMany(models.Skill, {
			through: 'profession_skill',
			foreignKey: 'profession_id'
		})

		// User Working Experience Relation
		this.hasMany(models.UserWorkingExperience, {
			foreignKey: 'profession_id'
		})

		// // User Education Relation
		// this.hasMany(models.UserEducation, {
		// 	foreignKey: 'profession_id'
		// })
		// this.belongsToMany(models.User, {
		// 	through: 'user_profession',
		// 	foreignKey: 'profession_id'
		// })
	}
}
