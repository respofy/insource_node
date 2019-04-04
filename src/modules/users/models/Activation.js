import { Sequelize, Model } from 'sequelize'

export default class Activation extends Model {
	static init(sequelize) {
		return super.init(
			{
				phone: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
					primaryKey: true
				},
				code: {
					type: Sequelize.STRING,
					allowNull: false
				},
				activated: {
					type: Sequelize.INTEGER,
					allowNull: false
				}
			},
			{
				sequelize,
				underscored: true,
				timestamps: true,
				tableName: 'activation'
			}
		)
	}
}
