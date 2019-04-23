import { Sequelize, Model } from 'sequelize'

export default class WorkingType extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false },
				publish: { type: Sequelize.BOOLEAN, allowNull: false }
			},
			{
				sequelize,
				singular: 'WorkingType',
				plural: 'WorkingTypes',
				tableName: 'working_types',
				modelName: 'workingType'
			}
		)
	}

	static associate(models) {
		// Connect working type to User via UserWorkingType pivot
		this.hasMany(models.UserWorkingType, {
			foreignKey: 'working_type_id'
		})
		// Job Relation
		this.hasMany(models.Job)
	}
}
