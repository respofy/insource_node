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
    // Generate code
    let code = randomize('0000')
    console.log(phone)

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
      console.log(newActivation)
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
    console.log(activationRecord)

    if (activationRecord !== null) {
      console.log(activationRecord)
      let verifiedRecord = await activationRecord.update({ activated: 1 })
      if (verifiedRecord) {
        console.log("ACTIVATED")
        return true
      }
    } else {
      return false
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
    console.log(activatedRow)
    if (activatedRow !== null && activatedRow.activated == 1) {
      return true
    } else {
      return false
    }
  }
}

export default activationService