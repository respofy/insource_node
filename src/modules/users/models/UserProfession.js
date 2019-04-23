import { Sequelize, Model } from 'sequelize'

export default class UserProfession extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
				user_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				profession_id: { type: Sequelize.STRING, allowNull: false, unique: false }
			},
			{
				sequelize,
				singular: 'UserProfession',
				plural: 'UserProfessions',
				tableName: 'user_profession',
				modelName: 'userProfession'
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User)
		this.belongsTo(models.Profession)
		// this.hasMany(models.UserProfessionSkill)
	}
}
