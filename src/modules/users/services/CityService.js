import models from 'database/modelBootstrap'
/**
 *
 */
class CityService {
	/**
	 *
	 */
	static async getCities() {
		return await models.Cities.findOne({ where: criteria })
	}
}
export default CityService
