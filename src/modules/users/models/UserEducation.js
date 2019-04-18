import { Sequelize, Model } from 'sequelize'

class UserEducation extends Model {
	static init(sequelize) {
		return super.init(
			{
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE },
				user_id: { type: Sequelize.INTEGER, allowNull: false, unique: 'compositeIndex' },
				faculty_id: { type: Sequelize.INTEGER, allowNull: false, unique: 'compositeIndex' },
				degree_id: { type: Sequelize.INTEGER, allowNull: false, unique: 'compositeIndex' },
				university_id: { type: Sequelize.INTEGER, allowNull: false, unique: 'compositeIndex' }
			},
			{
				sequelize,
				singular: 'UserEducation',
				plural: 'UserEducations',
				tableName: 'user_education',
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User)
		this.belongsTo(models.Degree)
		this.belongsTo(models.Faculty)
		this.belongsTo(models.University)
	}
}

export default UserEducation
