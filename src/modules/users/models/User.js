import ka from 'lang/ka'
import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

/**
 * User Model
 */
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
				incognito: { type: Sequelize.INTEGER, defaultValue: 0 },
				sleep: { type: Sequelize.INTEGER, allowNull: false },
				last_login: { type: Sequelize.DATE, defaultValue: 1 }
			},
			{
				sequelize,
				tableName: 'users',
				hooks: {
					beforeCreate: User => {
						User.password = bcrypt.hashSync(User.password, 10)
					}
				}
			}
		)
	}

	static associate(models) {
		// relationships
		// this.hasMany(models.UserEducation)
		this.hasMany(models.UserLanguage)
		// this.hasMany(models.UserCertificate)
		// this.hasMany(models.UserWorkingExperience)
		this.belongsToMany(models.Company, {
			through: 'company_owners',
			foreignKey: 'user_id'
		})

		this.belongsToMany(models.Industry, {
			through: 'user_industries',
			unique: 'false'
		})
	}
}

export default User
