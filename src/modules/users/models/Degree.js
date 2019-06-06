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
				title: { type: Sequelize.STRING, allowNull: false },
				parent_id: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
				depth: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
				lft: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
				rgt: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 }
			},
			{
				sequelize,
				tableName: 'degrees',
				modelName: 'degree'
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
		// Job Relation
		this.hasMany(models.Job)
	}
}

export default Degree
