import { Sequelize, Model } from 'sequelize'

export default class Profession extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				tableName: 'professions',
				modelName: 'profession'
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
		// Job Relation
		this.hasMany(models.Job)

		this.hasMany(models.UserProfession)
	}
}
