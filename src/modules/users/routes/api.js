import express from 'express'
import userController from '../controllers/userController'
import validator from '../../../helper/validateHelper'
import userLoginSchema from '../validations/userLoginSchema'
import userFillDataSchema from '../validations/userFillDataScheme'
import authInitSchema from '../validations/authInitSchema'
import validPhoneSchema from '../validations/validPhoneSchema'
import resetPasswordSchema from '../validations/resetPasswordSchema'

const routes = express.Router()

// Auth & Password reset
routes.post('/authorization', validator(userLoginSchema), userController.authorization)
routes.post('/initialize', validator(authInitSchema), userController.initialize)
routes.post('/send/sms', validator(validPhoneSchema), userController.sendSms)
routes.post('/verify', userController.verify)
routes.post('/fill/data', validator(userFillDataSchema),  userController.fillData)
routes.post('/reset/init', validator(validPhoneSchema), userController.resetInit)
routes.post('/reset/password', validator(resetPasswordSchema), userController.resetPassword)

routes.post('/test', userController.test)

export default routes
