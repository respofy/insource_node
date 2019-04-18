import { Sequelize, Model } from 'sequelize'

/**
 *
 */
class University extends Model {
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
				tableName: 'universities',
				modelName: 'university'
			}
		)
	}

	/**
	 *
	 */
	static associate(models) {
		this.hasMany(models.UserEducation, {
			foreignKey: 'university_id'
		})
	}
}

export default University
