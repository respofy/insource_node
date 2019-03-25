/**
 *
 */
class responseHelper {
	/**
	 *
	 */
	static success(message = '', data = '') {
		return {
			status: true,
			message,
			data
		}
	}
	/**
	 *
	 */
	static error(message = '', data = '') {
		return {
			status: false,
			message,
			data
		}
	}
}

export default responseHelper
