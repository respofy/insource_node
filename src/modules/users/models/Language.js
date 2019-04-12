import { Sequelize, Model } from 'sequelize'

export default class Language extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				tableName: 'languages'
			}
		)
	}

	static associate(models) {
		this.hasMany(models.UserLanguage)
	}
}
