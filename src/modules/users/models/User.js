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
				city_id: { type: Sequelize.INTEGER, allowNull: true },
				status_id: { type: Sequelize.INTEGER, allowNull: true },
				about_me: { type: Sequelize.TEXT },
				// action attributes
				incognito: {
					type: Sequelize.INTEGER,
					defaultValue: 0
				},
				active_company_id: { type: Sequelize.INTEGER, allowNull: true, defaultValue: null },
				sleep: {
					type: Sequelize.INTEGER,
					defaultValue: 0
				},
				last_login: {
					type: Sequelize.DATE
				}
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
		// Active Company Relation
		this.belongsTo(models.Company, { as: 'activeCompany' })
		// City Relation
		this.belongsTo(models.City)
		// Status Relation
		this.belongsTo(models.Status)
		// Language Relation
		this.hasMany(models.UserLanguage)
		// Education Relation
		this.hasMany(models.UserEducation)
		// Working Experience Relation
		this.hasMany(models.UserWorkingExperience)
		// User Profession Relation
		this.hasMany(models.UserProfession)
		// Salary Relation
		this.hasMany(models.Salary)
		// Certificate Relation
		this.hasMany(models.UserCertificate)
		// Company Relation
		this.belongsToMany(models.Company, {
			through: 'company_owners',
			foreignKey: 'user_id',
			as: 'OwnedCompanies'
		})
		// Favorite Company Relation
		this.belongsToMany(models.Company, {
			through: 'user_companies',
			foreignKey: 'user_id',
			as: 'FavoriteCompanies'
		})
		// Role Relation
		this.belongsToMany(models.Role, {
			through: 'user_role',
			foreignKey: 'user_id'
		})
		// Industry Relation
		this.belongsToMany(models.Industry, {
			through: 'user_industries',
			unique: 'false'
		})
		// Working Type
		this.belongsToMany(models.WorkingType, {
			through: 'user_working_types',
			foreignKey: 'user_id'
		})
		// Profession Relation
		this.belongsToMany(models.Profession, {
			through: 'user_profession',
			foreignKey: 'user_id'
		})
	}
}

export default User
