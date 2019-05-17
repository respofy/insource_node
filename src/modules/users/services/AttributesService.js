import models from 'database/modelBootstrap'

/**
 * General data service
 */
class AttributesService {
	/**
	 * roles
	 */
	static async roles() {
		return await models.Role.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * professions
	 */
	static async professions() {
		return await models.Profession.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * skills
	 */
	static async skillsByProfession(profession_id) {
		//profession_id
		let profession = await models.Profession.findByPk(profession_id)
		// return the skills by profession
		return await profession.getSkills({
			attributes: ['id', 'title']
		})
	}

	/**
	 * Fetch list of industries
	 */
	static async industries() {
		return await models.Industry.findAll()
	}

	/**
	 * cities
	 */
	static async cities() {
		return await models.City.findAll()
	}

	/**
	 * Fetch list of working types
	 */
	static async workingTypes() {
		return await models.WorkingType.findAll()
	}

	/**
	 * get and sort the universities
	 */
	static async universities() {
		return await models.University.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * get and sort the faculties
	 */
	static async faculties() {
		return await models.Faculty.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * get and sort the faculties
	 */
	static async degrees() {
		return await models.Degree.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * get and sort the faculties
	 */
	static async statuses() {
		return await models.Status.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * languages
	 */
	static async languages() {
		// fetch all language
		return await models.Language.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * language knowledges
	 */
	static async languageKnowledges() {
		// get language knowledges
		return await models.LanguageKnowledge.findAll({
			order: [['weight', 'ASC']]
		})
	}

	/**
	 * Qualifications
	 */
	static async qualifications() {
		// get language knowledges
		return await models.Qualification.findAll({
			order: [['title', 'ASC']]
		})
	}
}

export default AttributesService
