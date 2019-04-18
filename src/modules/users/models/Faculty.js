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
				tableName: 'faculties',
				modelName: 'faculty'
			}
		)
	}

	/**
	 *
	 */
	static associate(models) {
		this.hasMany(models.UserEducation)
	}
}

export default Faculty
