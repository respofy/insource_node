import { Sequelize, Model } from 'sequelize'

export default class Status extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: {
					type: Sequelize.STRING,
					allowNull: false
				}
			},
			{
				sequelize,
				singular: 'status',
				plural: 'statuses',
				tableName: 'statuses',
				modelName: 'status'
			}
		)
	}

	static associate(models) {
		// User Relation
		this.hasOne(models.User)
	}
}
