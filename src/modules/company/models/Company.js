import Sequelize from 'sequelize'
import ka from 'lang/ka'

class Company extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				name: { type: Sequelize.STRING, allowNull: false },
				industry_id: { type: Sequelize.INTEGER, allowNull: false },
				logo: { type: Sequelize.STRING, allowNull: true },
				identification_code: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: { args: true, msg: ka.model.company.identification_code_unique_error }
				}
			},
			{ sequelize, modelName: 'company', underscored: true, timestamps: true }
		)
	}

	static associate(models) {
		// User Relation
		this.belongsToMany(models.User, {
			through: 'company_owners',
			foreignKey: 'company_id',
			as: 'Owners'
		})
		// Favorite Company Relation
		this.belongsToMany(models.User, {
			through: 'user_companies',
			foreignKey: 'company_id',
			as: 'FavouredByUsers'
		})
		// Job Relation
		this.hasMany(models.Job)
		// this.belongsTo(models.City)
		this.belongsTo(models.Industry)
		this.hasMany(models.UserWorkingExperience)
	}
}

export default Company
