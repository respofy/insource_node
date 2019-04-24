import { Sequelize, Model } from 'sequelize'

class JobRequirement extends Model {
	static init(sequelize) {
		return super.init(
			{
				job_id: { type: Sequelize.INTEGER, allowNull: false },
				skills: { type: Sequelize.BOOLEAN, allowNull: false },
				salary: { type: Sequelize.BOOLEAN, allowNull: false },
				experience: { type: Sequelize.BOOLEAN, allowNull: false },
				education: { type: Sequelize.BOOLEAN, allowNull: false },
				languages: { type: Sequelize.BOOLEAN, allowNull: false }
			},
			{
				sequelize,
				singular: 'JobRequirement',
				plural: 'JobRequirements',
				tableName: 'job_requirements'
			}
		)
	}

	// eslint-disable-next-line no-unused-vars
	static associate(models) {
		// this.hasMany(models.User, {
		// 	foreignKey: "city_id"
		// });
	}
}

export default JobRequirement
