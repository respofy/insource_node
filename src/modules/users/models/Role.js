import { Sequelize, Model } from 'sequelize'

export default class Role extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false }
			},
			{ sequelize, tableName: 'roles', modelName: 'role' }
		)
	}

	static associate(models) {
		// Job Relation
		this.hasMany(models.Job)
		// Working Experience Relation
		this.hasMany(models.UserWorkingExperience)
		// User Relation
		this.belongsToMany(models.User, {
			through: 'user_role',
			foreignKey: 'role_id'
		})
	}
}
