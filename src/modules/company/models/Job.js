import { Sequelize, Model } from 'sequelize'

export default class Job extends Model {
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
				tableName: 'jobs'
			}
		)
	}

	static associate(models) {
		// this.hasMany(models.User, {
		// 	foreignKey: "city_id"
		// });
	}
}