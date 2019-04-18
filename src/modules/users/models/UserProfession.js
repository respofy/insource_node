import { Sequelize, Model } from 'sequelize'

export default class UserProfession extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false },
				profession_id: { type: Sequelize.INTEGER, allowNull: false },
				user_id: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				singular: 'UserProfession',
				plural: 'UserProfessions',
				tableName: 'user_profession',
			}
		)
	}

	static associate(models) {
		// this.belongsToMany(models.Skill, {
		// 	through: 'user_profession_skills',
		// 	foreignKey: 'user_profession_id'
		// })

		this.belongsTo(models.User)
		// this.hasMany(models.UserProfessionSkill)
	}
}
