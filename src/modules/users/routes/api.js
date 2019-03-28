import express from 'express'
import userController from '../controllers/userController'
import validator from '../../../helper/validateHelper'
import userLoginSchema from '../validations/userLoginSchema'
import userRegistrationSchema from '../validations/userRegistrationSchema'
import userFillDataSchema from '../validations/userFillDataScheme'

const routes = express.Router()

routes.post('/authorization', validator(userLoginSchema), userController.authorization)
routes.post('/registration', validator(userRegistrationSchema), userController.registration)

routes.post('/initialize', userController.initialize)
routes.post('/resend', userController.resend)
routes.post('/verify', userController.verify)
routes.post('/fill/data', validator(userFillDataSchema),  userController.fillData)

export default routes
