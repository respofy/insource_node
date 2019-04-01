import express from 'express'
import userController from '../controllers/UserController'
import validator from '../../../helper/ValidateHelper'
import userLoginSchema from '../validations/UserLoginSchema'
import userFillDataSchema from '../validations/UserFillDataScheme'
import authInitSchema from '../validations/AuthInitSchema'
import validPhoneSchema from '../validations/ValidPhoneSchema'
import resetPasswordSchema from '../validations/ResetPasswordSchema'

const routes = express.Router()

// Auth & Password reset
routes.post('/authorization', validator(userLoginSchema), userController.authorization)
routes.post('/initialize', validator(authInitSchema), userController.initialize)
routes.post('/send/sms', validator(validPhoneSchema), userController.sendSms)
routes.post('/verify', userController.verify)
routes.post('/fill/data', validator(userFillDataSchema), userController.fillData)
routes.post('/reset/init', validator(validPhoneSchema), userController.resetInit)
routes.post('/reset/password', validator(resetPasswordSchema), userController.resetPassword)

export default routes
