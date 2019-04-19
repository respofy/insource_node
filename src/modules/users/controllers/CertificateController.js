import ka from 'lang/ka'
import response from 'helper/Response'
import CertificateService from '../services/CertificateService'

class CertificateController {
	/**
	 * Get list of user certificates
	 */
	static async list(req, res) {
		try {
			// fetch list from service
			let userCertificates = await CertificateService.getAll(req.user.id)
			// response
			res.json(response.success(ka.request_success, userCertificates))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 * Create user certificate
	 */
	static async create(req, res) {
		try {
			// create service from certificate service
			let newCertificate = await CertificateService.create(req.user.id, req.body)
			// return created certificate
			res.json(response.success(ka.cv.certificate_created, newCertificate))
		} catch (error) {
			res.json(response.error(ka.cv.certificate_create_error))
		}
	}

	/**
	 * Update user certificate
	 */
	static async update(req, res) {
		try {
			// update education from education service
			let updatedCertificate = await CertificateService.update(req.query.id, req.user.id, req.body)
			// return response
			res.json(response.success(ka.cv.certificate_updated, updatedCertificate))
		} catch (error) {
			res.json(response.error(ka.cv.certificate_update_error))
		}
	}

	/**
	 * Delete user certificate
	 */
	static async delete(req, res) {
		try {
			// delete user education from service
			await CertificateService.delete(req.query.id, req.user.id)
			// response
			res.json(response.success(ka.cv.certificate_deleted))
		} catch (error) {
			res.json(response.error(ka.cv.certificate_delete_error))
		}
	}
}

export default CertificateController
