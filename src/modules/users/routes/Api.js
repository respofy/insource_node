import express from 'express'
import AuthController from '../controllers/AuthController'

import userController from '../controllers/UserController'
import validator from '../../../helper/ValidateHelper'

import userLoginSchema from '../validations/UserLoginSchema'
import AuthFillDataSchema from '../validations/AuthFillDataSchema'
import AuthInitializeSchema from '../validations/AuthInitializeSchema'
import AuthResendSMSSchema from '../validations/AuthResendSMSSchema'
import resetPasswordSchema from '../validations/ResetPasswordSchema'

const routes = express.Router()

// Auth & Password reset
routes.post('/initialize', validator(AuthInitializeSchema), AuthController.initialize)
routes.post('/resend/sms', validator(AuthResendSMSSchema), AuthController.resendSMS)
routes.post('/verify/code', AuthController.verify)
routes.post('/fill/data', validator(AuthFillDataSchema), AuthController.fillData)

routes.post('/authorization', validator(userLoginSchema), userController.authorization)
routes.post('/reset/init', validator(AuthResendSMSSchema), userController.resetInit)
routes.post('/reset/password', validator(resetPasswordSchema), userController.resetPassword)

export default routes
