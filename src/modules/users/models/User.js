import ka from 'lang/ka'
import Sequelize from 'sequelize'

class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				// data attributes
				phone: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: { args: true, msg: ka.model.unique_phone_error }
				},
				name: { type: Sequelize.STRING, allowNull: false },
				surname: { type: Sequelize.STRING, allowNull: false },
				password: { type: Sequelize.STRING, allowNull: false },
				gender: { type: Sequelize.STRING, allowNull: false },
				avatar: { type: Sequelize.STRING, allowNull: false },
				birthday: { type: Sequelize.DATE },
				about_me: { type: Sequelize.TEXT },
				// action attributes
				incognito: {
					type: Sequelize.INTEGER,
					defaultValue: 0
				},
				sleep: { type: Sequelize.INTEGER, allowNull: false },
				last_login: {
					type: Sequelize.DATE,
					defaultValue: 1
				}
			},
			{
				sequelize,
				tableName: 'users'
			}
		)
	}

	static associate(models) {
		// Using additional options like CASCADE etc for demonstration
		// Can also simply do Task.belongsTo(models.User);
		this.belongsToMany(models.Company, {
			through: 'company_owners',
			foreignKey: 'user_id'
		})
	}
}

export default User
