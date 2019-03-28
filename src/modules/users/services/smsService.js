import axios from 'axios'
import randomize from 'randomatic'

class smsService {
  static async send(phone, code = '') {

    //send sms
    let smsSendRequest = await axios.get('http://smsoffice.ge/api/v2/send', {
      params: {
        key: '2bd0655014ea416dbd96bdfe505bf4c5',
        destination: '995593757435',
        sender: 'Insource',
        content: code
      }
    })

    return smsSendRequest.status
  }
}

export default smsService