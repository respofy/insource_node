import { Sequelize, Model } from 'sequelize'

export default class UserCertificate extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false },
				additional_information: { type: Sequelize.STRING, allowNull: false },
				website: { type: Sequelize.STRING, allowNull: false },
				issue_date: { type: Sequelize.DATE, allowNull: false },
				user_id: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				singular: 'UserCertificate',
				plural: 'UserCertificates',
				tableName: 'user_certificates',
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User)
	}
}
