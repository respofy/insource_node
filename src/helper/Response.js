/**
 *
 */
class ResponseHelper {
	/**
	 *
	 */
	static success(message = [], responseData = {}) {
		return {
			status: true,
			message: [message],
			responseData
		}
	}
	/**
	 *
	 */
	static error(message = [], responseData = {}) {
		return {
			status: false,
			message: [message],
			responseData
		}
	}
}

export default ResponseHelper
