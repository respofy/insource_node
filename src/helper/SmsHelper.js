import axios from 'axios'
import {} from 'dotenv/config'

/**
 * send sms useing smsoffice
 */

class SmsHelper {
	/**
	 *
	 */
	static async send(phone, content) {
		// send sms
		let smsSendRequest = await axios.get('http://smsoffice.ge/api/v2/send', {
			params: {
				key: process.env.SMS_KEY,
				sender: process.env.SMS_SENDER,
				destination: phone,
				content: content
			}
		})
		return smsSendRequest.status
	}
}

export default SmsHelper
