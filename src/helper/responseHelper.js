/**
 *
 */
class responseHelper {
	/**
	 *
	 */
	static success(message = '', responseData = {}) {
		return {
			status: true,
			message,
			responseData
		}
	}
	/**
	 *
	 */
	static error(message = '', responseData = {}) {
		return {
			status: false,
			message,
			responseData
		}
	}
}

export default responseHelper
