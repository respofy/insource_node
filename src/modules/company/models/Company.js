import Sequelize from 'sequelize'

export default class Company extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				name: { type: Sequelize.STRING, allowNull: false },
				industry_id: { type: Sequelize.INTEGER, allowNull: false },
				logo: { type: Sequelize.STRING, allowNull: false },
				identification_code: { type: Sequelize.STRING, allowNull: false }
			},
			{ sequelize, underscored: true, timestamps: true }
		)
	}

	static associate(models) {
		this.belongsToMany(models.User, {
			through: 'company_owners',
			foreignKey: 'company_id'
		})

		// this.belongsTo(models.City)

		this.belongsTo(models.Industry)
	}
}
