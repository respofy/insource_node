import { Sequelize, Model } from 'sequelize'

export default class Industry extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false },
				publish: { type: Sequelize.BOOLEAN, allowNull: false }
			},
			{
				sequelize,
				singular: 'industry',
				plural: 'industries',
				tableName: 'industries',
				modelName: 'industry'
			}
		)
	}

	static associate(models) {
		this.hasMany(models.UserIndustry)

		this.hasMany(models.Company, {
			foreignKey: 'industry_id',
			unique: 'false'
		})
	}
}
