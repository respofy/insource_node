import { Sequelize, Model } from 'sequelize'

export default class UserQualification extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
				user_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				qualification_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE }
			},
			{
				sequelize,
				singular: 'UserQualification',
				plural: 'UserQualifications',
				tableName: 'user_qualifications',
				modelName: 'userQualification'
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User)
		this.belongsTo(models.Qualification)
	}
}
