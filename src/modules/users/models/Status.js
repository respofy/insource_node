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
				tableName: 'statuses'
			}
		)
	}

	static associate(models) {
		this.belongsToMany(models.User, {
			through: 'user_statuses',
			foreignKey: 'status_id'
		})
	}
}
