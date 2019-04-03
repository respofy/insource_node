import models from 'database/modelBootstrap'
import sequelize from 'sequelize'

const operator = sequelize.Op

class ActivationService {
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
