import AttributesService from 'modules/users/services/AttributesService'
import response from 'helper/Response'
import ka from 'lang/ka'

/**
 *
 */
class AttributesController {
	/**
	 * all roles from system
	 */
	static async roles(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.roles()))
	}

	/**
	 * professions
	 */
	static async professions(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.professions()))
	}

	/**
	 * skills by profession
	 */
	static async skillsByProfession(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.skillsByProfession(req.params.profession_id)))
	}

	/**
	 * cities
	 */
	static async cities(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.cities()))
	}

	/**
	 * working types
	 */
	static async workingTypes(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.workingTypes()))
	}

	/**
	 * universities
	 */
	static async universities(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.universities()))
	}

	/**
	 * faculties
	 */
	static async faculties(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.professions()))
	}

	/**
	 * degrees
	 */
	static async degrees(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.degrees()))
	}

	/**
	 * statuses
	 */
	static async statuses(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.statuses()))
	}

	/**
	 * languages
	 */
	static async languages(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.languages()))
	}

	/**
	 * language knowledges
	 */
	static async languageKnowledges(req, res) {
		res.json(response.success(ka.request_success, await AttributesService.languageKnowledges()))
	}
}

export default AttributesController
