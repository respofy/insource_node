import { Sequelize, Model } from "sequelize";

export default class LanguageKnowledge extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false },
				weight: { type: Sequelize.INTEGER, allowNull: false }
			},
			{
				sequelize,
				singular: "languageKnowledge",
				plural: "languageKnowledges",
				tableName: "language_knowledge"
			}
		);
	}

	static associate(models) {
		this.hasMany(models.UserLanguage, {
			foreignKey: "language_knowledge_id"
		});
	}
}
