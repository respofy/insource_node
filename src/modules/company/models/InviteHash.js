import { Sequelize, Model } from 'sequelize'

export default class InviteHash extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
				company_id: { type: Sequelize.INTEGER, allowNull: false },
				hash: { type: Sequelize.STRING, allowNull: false, unique: true }
			},
			{
				sequelize,
				singular: 'inviteHash',
				plural: 'inviteHashes',
				tableName: 'invite_hash'
			}
		)
	}
}
