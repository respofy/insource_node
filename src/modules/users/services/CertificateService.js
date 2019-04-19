import models from 'database/modelBootstrap'

class CertificateService {
	/**
	 * Get list of user certificates
	 */
	static async getAll(user_id) {
		// get user instance
		let user = await models.User.findByPk(user_id)
		// return result
		return await user.getUserCertificates()
	}

	/**
	 * Create user certificate
	 */
	static async create(user_id, data) {
		// attach user to data
		data.user_id = user_id
		// create new certificate and attach to user
		return await models.UserCertificate.create(data)
	}

	/**
	 * Update user certificate
	 */
	static async update(id, user_id, data) {
		// get working experience by id
		let userCertificate = await models.UserCertificate.findOne({ where: { id, user_id } })
		// update working experience
		let updatedUserCertificate = await userCertificate.update(data)
		// throw error on negative result
		if (updatedUserCertificate === null) {
			throw new Error()
		}
		// return updated record
		return updatedUserCertificate
	}

	static async delete(id, user_id) {
		// get instance by id
		let userCertificate = await models.UserCertificate.findOne({ where: { id, user_id } })
		// check result
		if (userCertificate === null) {
			throw new Error()
		}
		// destroy record
		return await userCertificate.destroy()
	}
}

export default CertificateService
