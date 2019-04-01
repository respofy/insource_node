import randomize from 'randomatic'
import models from 'database/modelBootstrap'
import sequelize from 'sequelize'
import smsService from './SmsService'

const operator = sequelize.Op

class ActivationService {
	/*
	 * Request code for authorization
	 */
	static async requestCode(phone) {
		// Generate code
		let code = randomize('0000')

		//send sms
		let smsStatus = await smsService.send(phone, code)

		// insert activation record
		if (smsStatus == 200) {
			await models.Activation.upsert({
				phone: phone,
				code: code,
				activated: 0
			})
			return true
		} else {
			return false
		}
	}

	static async verify(phone, code) {
		let activationRecord = await models.Activation.findOne({
			where: {
				[operator.and]: {
					phone: phone,
					code: code
				}
			}
		})

		if (activationRecord == null) {
			return false
		}

		let verifiedRecord = await activationRecord.update({ activated: 1 })

		return verifiedRecord ? true : false
	}

	static async validate(phone, code) {
		let activatedRow = await models.Activation.findOne({
			where: {
				[operator.and]: {
					phone: phone,
					code: code
				}
			}
		})
		if (activatedRow !== null && activatedRow.activated == 1) {
			return true
		} else {
			return false
		}
	}
}

export default ActivationService
