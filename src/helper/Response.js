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
	static error(message = [], responseData = {}, system_message = []) {
		return {
			status: false,
			message: [message],
			responseData,
			system_message: [system_message]
		}
	}
}

export default ResponseHelper
