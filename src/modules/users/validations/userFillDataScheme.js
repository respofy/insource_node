import Joi from 'joi'

const userFillDataSchema = {
  body: {
    phone: Joi.string().error(() => 'ტელეფონი არ არის ვალიდური').length(9).required(),
    password: Joi.string().error(() => 'პაროლი არ არის ვალიდური').min(6).required(),
    name: Joi.string().error(() => 'სახელი არ არის ვალიდური').min(2).required(),
    surname: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required(),
    avatar: Joi.string().required(),
    birthday: Joi.date(),
    about_me: Joi.string().max(150),
    active: Joi.number().integer(),
    sleep: Joi.number().integer(),
    activationCode: Joi.string(),
  }
}

export default userFillDataSchema