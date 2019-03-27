import Joi from 'joi'

const userLoginSchema = {
  body: {
    phone: Joi.string().error( () => 'ტელეფონი არ არის სტრინგი').length(9).required(),
    password: Joi.string().error( () => 'პაროლი არ არის სტრინგი').min(6).required(),
  }
}

export default userLoginSchema