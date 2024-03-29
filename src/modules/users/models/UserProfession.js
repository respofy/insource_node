import { Sequelize, Model } from 'sequelize'

class UserProfession extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
				user_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				profession_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE, allowNull: true },
				active: { type: Sequelize.BOOLEAN, allowNull: false }
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

export default UserProfession
