import models from 'database/modelBootstrap'
/**
 *
 */
class CityService {
	/**
	 *
	 */
	static async getCities() {
		return await models.Cities.findAll()
	}
}
export default CityService
