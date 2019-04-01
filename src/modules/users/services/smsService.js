import axios from 'axios'

class smsService {
	static async send(phone, code = '') {
		//send sms
		let smsSendRequest = await axios.get(
			'http://smsoffice.ge/api/v2/send',
			{
				params: {
					key: '2bd0655014ea416dbd96bdfe505bf4c5',
					destination: '995' + phone,
					sender: 'Insource',
					content: code
				}
			}
		)
		console.log(smsSendRequest.status)
		return smsSendRequest.status
	}
}

export default smsService
