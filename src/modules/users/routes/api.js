import express from 'express'
import userController from '../controllers/userController'
import validator from '../../../helper/validateHelper'
import userLoginSchema from '../validations/userLoginSchema'
import userRegistrationSchema from '../validations/userRegistrationSchema'
import userFillDataSchema from '../validations/userFillDataScheme'

const routes = express.Router()
const joiOptions = { abortEarly: false }

routes.post('/authorization', validator(userLoginSchema), userController.authorization)
routes.post('/registration', validator(userRegistrationSchema), userController.registration)
routes.post('/fill/data', validator(userFillDataSchema),  userController.fillData)

export default routes
