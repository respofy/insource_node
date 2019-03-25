import bcrypt from 'bcrypt'

let user = (sequelize, DataTypes) => {
	const test = sequelize.define(
		'user',
		{
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: 'go from here'
				},
				validate: {
					// isEmail: {
					// 	args: true,
					// 	msg: 'not hte email!'
					// },
					// isUrl: {
					// 	args: true,
					// 	msg: 'not hte url!'
					// }
				}
			},
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
			timestamps: false
		}
	)
	test.associate = function(models) {
		// associations can be defined here
	}
	return test
}

export default user
