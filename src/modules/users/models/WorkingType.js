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
		this.belongsToMany(models.User, {
			through: 'user_working_types',
			foreignKey: 'working_type_id'
		})
	}
}
