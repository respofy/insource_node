import Sequelize from 'sequelize'

class City extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				name: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				tableName: 'cities',
				modelName: 'city'
			}
		)
	}

	static associate(models) {
		this.hasMany(models.Job, {
			foreignKey: 'city_id'
		})
		// User Relation
		this.hasOne(models.User)
	}
}

export default City
