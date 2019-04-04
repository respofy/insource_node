import { Sequelize, Model } from 'sequelize'

export default class Profession extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				tableName: 'professions'
			}
		)
	}

	static associate(models) {
		this.belongsToMany(models.User, {
			through: 'user_profession',
			foreignKey: 'profession_id'
		})

		this.hasMany(models.UserEducation, {
			foreignKey: 'city_id'
		})
	}
}
