import Sequelize from 'sequelize'

export default class Post extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				title: {
					type: Sequelize.STRING,
					allowNull: false
				},
				publish: {
					type: Sequelize.BOOLEAN,
					allowNull: false
				}
			},
			{
				sequelize,
				singular: 'industry',
				plural: 'industries',
				tableName: 'industries'
			}
		)
	}

	static associate(models) {
		// Using additional options like CASCADE etc for demonstration
		// Can also simply do Task.belongsTo(models.Post);
		this.belongsToMany(models.User, {
			through: 'user_industries',
			foreignKey: 'industry_id'
		})

		this.hasMany(models.Company, {
			foreignKey: 'industry_id'
		})
	}
}
