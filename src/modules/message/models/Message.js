import { Sequelize, Model } from 'sequelize'

class Message extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				sender_id: { type: Sequelize.INTEGER, allowNull: false },
				receiver_id: { type: Sequelize.INTEGER, allowNull: false },
				company_id: { type: Sequelize.INTEGER, allowNull: false },
				job_id: { type: Sequelize.INTEGER, allowNull: false },
				content: { type: Sequelize.STRING, allowNull: false },
				is_read: { type: Sequelize.BOOLEAN, allowNull: false }
			},
			{
				sequelize,
				singular: 'message',
				plural: 'messages',
				tableName: 'messages',
				modelName: 'message'
			}
		)
	}

	static associate(models) {
		// User Relation as Sender & Receiver
		this.belongsTo(models.User, { as: 'sender' })
		this.belongsTo(models.User, { as: 'receiver' })
		this.belongsTo(models.Company)
		this.belongsTo(models.Job)
	}
}

export default Message
