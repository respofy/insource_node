import bcrypt from 'bcrypt'
import models from '../models'
import sequelize from 'sequelize'

const operator = sequelize.Op

class passwordResetService {
  /*
  * Reset user password
  */
  static async reset(phone, newPassword, code) {
    // hash new password
    let newHashedPassword = bcrypt.hashSync(newPassword, 10)

    // query user with phone and code
    let activatedUser = await models.activation.findOne({
      where: {
        [operator.and]: { phone: phone, code: code, activated: 1 }
      }
    })

    // check user
    if (!activatedUser) { return false }

    // find user
    let user = await models.user.findOne({ where: { phone: phone } })
    
    // update user password
    let updatedPassword = await user.update({ password: newHashedPassword })

    return updatedPassword ? true : false
  }
}

export default passwordResetService