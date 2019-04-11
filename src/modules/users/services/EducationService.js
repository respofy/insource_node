import models from 'database/modelBootstrap'

/**
 *
 */
class EducationService {
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
	 * cerate record for user and education
	 */
	static async create() {}
}
export default EducationService
