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
		// User Role Pivot Relation
		this.hasMany(models.UserRole)
		// User Profession Pivot Relation
		this.hasMany(models.UserProfession)
		// User Industry Pivot Relation
		this.hasMany(models.UserIndustry)
		// Salary Relation
		this.hasMany(models.Salary)
		// Certificate Relation
		this.hasMany(models.UserCertificate)
		// Working Type pivot relation
		this.hasMany(models.UserWorkingType)
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
	}
}

export default User
