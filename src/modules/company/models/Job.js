import Sequelize from 'sequelize'

class Job extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				company_id: { type: Sequelize.INTEGER, allowNull: false },
				working_type_id: { type: Sequelize.INTEGER, allowNull: false },
				city_id: { type: Sequelize.INTEGER, allowNull: false },
				role_id: { type: Sequelize.INTEGER, allowNull: false },
				profession_id: { type: Sequelize.INTEGER, allowNull: false },
				degree_id: { type: Sequelize.INTEGER, allowNull: false },
				language_id: { type: Sequelize.INTEGER, allowNull: false },
				language_knowledge_id: { type: Sequelize.INTEGER, allowNull: false },
				title: { type: Sequelize.STRING, allowNull: false },
				salary_from: { type: Sequelize.DOUBLE, allowNull: false },
				salary_to: { type: Sequelize.DOUBLE, allowNull: false },
				experience_from: { type: Sequelize.INTEGER, allowNull: false },
				experience_to: { type: Sequelize.INTEGER, allowNull: false },
				description: { type: Sequelize.TEXT, allowNull: false }
			},
			{
				sequelize,
				modelName: 'job',
				tableName: 'jobs'
			}
		)
	}

	// eslint-disable-next-line no-unused-vars
	static associate(models) {
		// Attributes Relation
		this.belongsTo(models.Company)
		this.belongsTo(models.WorkingType)
		this.belongsTo(models.City)
		this.belongsTo(models.Role)
		this.belongsTo(models.Profession)
		this.belongsTo(models.Degree)
		this.belongsTo(models.Language)
		this.belongsTo(models.LanguageKnowledge)
		// User Relation
		this.belongsToMany(models.User, {
			foreignKey: 'job_id',
			through: 'job_users'
		})
	}
}

export default Job
