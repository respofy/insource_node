import { Sequelize, Model } from 'sequelize'

class JobRequirement extends Model {
	static init(sequelize) {
		return super.init(
			{
				job_id: { type: Sequelize.INTEGER, unique: true },
				city: { type: Sequelize.BOOLEAN, allowNull: false },
				working_type: { type: Sequelize.BOOLEAN, allowNull: false },
				role: { type: Sequelize.BOOLEAN, allowNull: false },
				profession: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
				skills: { type: Sequelize.BOOLEAN, allowNull: false },
				salary: { type: Sequelize.BOOLEAN, allowNull: false },
				degree: { type: Sequelize.BOOLEAN, allowNull: false },
				experience: { type: Sequelize.BOOLEAN, allowNull: false },
				languages: { type: Sequelize.BOOLEAN, allowNull: false },
				qualification: { type: Sequelize.BOOLEAN, allowNull: false }
			},
			{
				sequelize,
				singular: 'JobRequirement',
				plural: 'JobRequirements',
				tableName: 'job_requirements',
				modelName: 'jobRequirement'
			}
		)
	}

	// static associate(models) {}
}

export default JobRequirement
