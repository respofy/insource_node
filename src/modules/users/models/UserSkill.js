import { Sequelize, Model } from 'sequelize'

class UserSkill extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
				user_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				skill_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE, allowNull: true },
				active: { type: Sequelize.BOOLEAN, allowNull: false }
			},
			{
				sequelize,
				tableName: 'user_skill',
				modelName: 'userSkill'
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User)
		this.belongsTo(models.Skill)
	}
}

// export
export default UserSkill
