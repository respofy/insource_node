import randomize from 'randomatic'
import models from '../models'
import sequelize from 'sequelize'
import smsService from '../services/smsService'

const operator = sequelize.Op

class activationService {
  /*
  * Request code for authorization
  */
  static async requestCode(phone) {
    // check if phone exists in users
    let userRecord = await models.user.findOne({ where: { phone: phone } })
    if (!userRecord) { return false }

    // Generate code
    let code = randomize('0000')

    //send sms
    let smsStatus = await smsService.send(phone, code)

    // insert activation record
    if (smsStatus == 200) {
      let newActivation = await models.activation.upsert(
        {
          phone: phone,
          code: code,
          activated: 0
        }
      )
      return true
    } else {
      return false
    }
  }

  static async verify(phone, code) {
    let activationRecord = await models.activation.findOne({
      where: {
        [operator.and]: {
          phone: phone,
          code: code
        }
      }
    })

    if (activationRecord !== null) {
      let verifiedRecord = await activationRecord.update({ activated: 1 })

      return verifiedRecord
        ? true
        : false
    }
  }

  static async validate(phone, code) {
    let activatedRow = await models.activation.findOne({
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

export default activationService