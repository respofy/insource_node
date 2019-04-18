import Sequelize from 'sequelize'

class UserLanguage extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				user_id: { type: Sequelize.INTEGER, allowNull: false, unique: 'compositeIndex' },
				language_id: { type: Sequelize.INTEGER, allowNull: false, unique: 'compositeIndex' },
				language_knowledge_id: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				singular: 'UserLanguage',
				plural: 'UserLanguages',
				tableName: 'user_languages',
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User)
		this.belongsTo(models.Language)
		this.belongsTo(models.LanguageKnowledge)
	}
}

export default UserLanguage
