import { Sequelize, Model } from 'sequelize'

/**
 *
 */
class Degree extends Model {
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
				tableName: 'degrees'
			}
		)
	}

	/**
	 *
	 */
	static associate(models) {
		this.hasMany(models.UserEducation, {
			foreignKey: 'degree_id'
		})
	}
}

export default Degree
