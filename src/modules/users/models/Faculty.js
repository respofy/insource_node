import { Sequelize, Model } from 'sequelize'

/**
 *
 */
class Faculty extends Model {
	/**
	 *
	 */
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				tableName: 'faculties'
			}
		)
	}

	/**
	 *
	 */
	static associate(/* models */) {
		// this.hasMany(models.User, {
		// 	foreignKey: "city_id"
		// });
	}
}

export default Faculty
