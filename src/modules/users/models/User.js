import ka from 'lang/ka'
import Sequelize from 'sequelize'

export default class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				phone: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: {
						args: true,
						msg: ka.uniquePhoneError
					}
				},
				name: { type: Sequelize.STRING, allowNull: false },
				surname: { type: Sequelize.STRING, allowNull: false },
				password: { type: Sequelize.STRING, allowNull: false },
				email: { type: Sequelize.STRING, allowNull: false },
				gender: { type: Sequelize.STRING, allowNull: false },
				avatar: { type: Sequelize.STRING, allowNull: false },
				birthday: { type: Sequelize.DATE },
				about_me: { type: Sequelize.TEXT },
				active: { type: Sequelize.INTEGER, allowNull: false },
				sleep: { type: Sequelize.INTEGER, allowNull: false }
			},
			{ sequelize, tableName: 'users' }
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
