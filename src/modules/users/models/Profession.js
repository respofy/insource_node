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
		this.belongsToMany(models.Skill, {
			through: 'profession_skill',
			foreignKey: 'profession_id'
		})
		this.hasMany(models.UserWorkingExperience, {
			foreignKey: 'profession_id'
		})
		this.hasMany(models.Job)
		this.hasMany(models.UserProfession)
	}
}
