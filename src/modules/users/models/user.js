'use strict'
export default (sequelize, DataTypes) => {
	const test = sequelize.define(
		'user',
		{
			phone: { type: DataTypes.STRING, allowNull: false },
			name: { type: DataTypes.STRING, allowNull: false },
			surname: { type: DataTypes.STRING, allowNull: false },
			password: { type: DataTypes.STRING, allowNull: false }
			// avatar: { type: DataTypes.STRING, allowNull: false },
			// birthday: { type: DataTypes.DATE },
			// about_me: { type: DataTypes.TEXT },
			// active: { type: DataTypes.INTEGER, allowNull: false },
			// sleep: { type: DataTypes.INTEGER, allowNull: false },
			// email: { type: DataTypes.STRING, allowNull: false }
		},
		{
			timestamps: true
		}
	)
	test.associate = function(models) {
		// associations can be defined here
	}
	return test
}
