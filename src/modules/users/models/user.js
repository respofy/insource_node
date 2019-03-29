import ka from 'lang/ka'
import companyModels from '../../company/models'

export default (sequelize, DataTypes) => {
	const userModel = sequelize.define(
		'user',
		{
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: ka.uniquePhoneError
				}
			},
			name: { type: DataTypes.STRING, allowNull: false },
			surname: { type: DataTypes.STRING, allowNull: false },
			password: { type: DataTypes.STRING, allowNull: false },
			email: { type: DataTypes.STRING, allowNull: false },
			gender: { type: DataTypes.STRING, allowNull: false },
			avatar: { type: DataTypes.STRING, allowNull: false },
			birthday: { type: DataTypes.DATE },
			about_me: { type: DataTypes.TEXT },
			active: { type: DataTypes.INTEGER, allowNull: false },
			sleep: { type: DataTypes.INTEGER, allowNull: false }
		},
		{
			underscored: true,
			timestamps: true
		}
	)
	userModel.associate = function(models) {
		// console.log("USER MODELS", models)
		// console.log("COMPANY MODELS IN USER", companyModels)
		userModel.belongsToMany(models.industry, {
			through: 'user_industries',
			foreignKey: 'user_id'
		})

		userModel.belongsToMany(companyModels.company, {
			through: 'company_owners',
			foreignKey: 'user_id'
		})
	}
	return userModel
}
