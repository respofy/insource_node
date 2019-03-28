import express from 'express'
import userController from '../controllers/userController'
import validator from '../../../helper/validateHelper'
import userLoginSchema from '../validations/userLoginSchema'
import userRegistrationSchema from '../validations/userRegistrationSchema'
import userFillDataSchema from '../validations/userFillDataScheme'

const routes = express.Router()

routes.post('/authorization', validator(userLoginSchema), userController.authorization)

routes.post('/initialize', userController.initialize)
routes.post('/send/sms', userController.sendSms)
routes.post('/verify', userController.verify)
routes.post('/fill/data', validator(userFillDataSchema),  userController.fillData)
routes.post('/reset/password', userController.resetPassword)

export default routes
