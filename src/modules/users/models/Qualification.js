import { Sequelize, Model } from 'sequelize'

export default class Qualification extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false },
			},
			{
				sequelize,
				singular: 'qualification',
				plural: 'qualifications',
				tableName: 'qualifications',
				modelName: 'qualification'
			}
		)
	}

	static associate(models) {
		this.hasMany(models.UserQualification, {
			foreignKey: 'qualification_id'
		})
	}
}
