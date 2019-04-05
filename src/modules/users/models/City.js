import { Sequelize, Model } from 'sequelize'

export default class City extends Model {
	static init(sequelize) {
		return super.init(
			{
				name: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				tableName: 'cities'
			}
		)
	}

	static associate(models) {
		this.hasMany(models.Job, {
			foreignKey: 'city_id'
		})
	}
}
