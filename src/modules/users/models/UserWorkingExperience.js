import { Sequelize, Model } from "sequelize";

export default class UserWorkingExperience extends Model {
	static init(sequelize) {
		return super.init(
			{
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE },
				company_name: { type: Sequelize.STRING, allowNull: false },
				company_id: { type: Sequelize.INTEGER, allowNull: false },
				user_id: { type: Sequelize.INTEGER, allowNull: false },
				profession_id: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				singular: "UserWorkingExperience",
				plural: "UserWorkingExperiences",
				tableName: "user_working_ex"
			}
		);
	}

	static associate(models) {
		this.belongsTo(models.User);
	}
}
