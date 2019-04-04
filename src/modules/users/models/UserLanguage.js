import { Sequelize, Model } from 'sequelize'

export default class UserLanguage extends Model {
	static init(sequelize) {
		return super.init(
			{
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE, allowNull: false },
				user_id: { type: Sequelize.INTEGER, allowNull: false },
				language_id: { type: Sequelize.INTEGER, allowNull: false },
				language_knowledge_id: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				singular: 'UserLanguage',
				plural: 'UserLanguages',
				tableName: 'user_languages'
			}
		)
	}

	static associate(models) {
		//
	}
}
