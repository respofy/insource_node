import Joi from 'joi'

const validPhoneSchema = {
  body: {
    phone: Joi.string().length(9).required(),
  }
}

export default validPhoneSchema