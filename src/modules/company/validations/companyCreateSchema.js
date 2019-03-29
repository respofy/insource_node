
import Joi from 'joi'

const companyCreateSchema = {
  body: {
    name: Joi.string().min(2).required(),
    industry_id: Joi.number().integer(),
    identification_code: Joi.string().min(2).required(),
    logo: Joi.string().required(),
  }
}

export default companyCreateSchema