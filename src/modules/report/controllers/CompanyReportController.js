import response from 'helper/Response'
import ka from 'lang/ka'
import companyReportService from '../services/CompanyReportService'
/**
 * Report Controller
 */
class CompanyReportController {
	/**
	 *
	 */
	static async mostWantedPositions(req, res) {
		try {
			let mostWantedPositions = await companyReportService.mostWantedPositions(req.body.industry_id, req.body.date_from, req.body.date_to)
			// response
			res.json(response.success(ka.request_success, mostWantedPositions))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 *
	 */
	static async mostWantedProfessions(req, res) {
		try {
			let mostWantedPositions = await companyReportService.mostWantedProfessions(req.body.industry_id, req.body.date_from, req.body.date_to)
			// response
			res.json(response.success(ka.request_success, mostWantedPositions))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 *
	 */
	static async activeIndustries(req, res) {
		try {
			let mostWantedPositions = await companyReportService.activeIndustries(req.body.date_from, req.body.date_to)
			// response
			res.json(response.success(ka.request_success, mostWantedPositions))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 *
	 */
	static async topCompanies(req, res) {
		try {
			let mostWantedPositions = await companyReportService.topCompanies(req.body.industry_id)
			// response
			res.json(response.success(ka.request_success, mostWantedPositions))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 *
	 */
	static async mostWantedEducation(req, res) {
		try {
			let mostWantedPositions = await companyReportService.mostWantedEducation(
				req.body.industry_id,
				req.body.date_from,
				req.body.date_to,
				req.body.profession_id,
				req.body.position_id
			)
			// response
			res.json(response.success(ka.request_success, mostWantedPositions))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 *
	 */
	static async mostWantedLanguage(req, res) {
		try {
			let mostWantedPositions = await companyReportService.mostWantedLanguage(
				req.body.industry_id,
				req.body.date_from,
				req.body.date_to,
				req.body.profession_id,
				req.body.position_id
			)
			// response
			res.json(response.success(ka.request_success, mostWantedPositions))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}
}

export default CompanyReportController
