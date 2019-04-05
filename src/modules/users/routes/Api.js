import express from 'express'
import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import validator from '../../../helper/ValidateHelper'
import UserLoginSchema from '../validations/UserLoginSchema'
import AuthFillDataSchema from '../validations/AuthFillDataSchema'
import AuthInitializeSchema from '../validations/AuthInitializeSchema'
import AuthResendSMSSchema from '../validations/AuthResendSMSSchema'
import UserResetPasswordSchema from '../validations/UserResetPasswordSchema'
import Auth from 'middleware/AuthMiddleware'

const routes = express.Router()

// Auth & Password reset
routes.post('/initialize', validator(AuthInitializeSchema), AuthController.initialize)
routes.post('/resend/sms', validator(AuthResendSMSSchema), AuthController.resendSMS)
routes.post('/verify/code', AuthController.verify)
routes.post('/fill/data', validator(AuthFillDataSchema), AuthController.fillData)
routes.post('/authorization', validator(UserLoginSchema), UserController.authorization)
routes.post('/reset/init', validator(AuthResendSMSSchema), UserController.initializePasswordReset)
routes.post('/reset/password', validator(UserResetPasswordSchema), UserController.resetPassword)

routes.post('/cv/city', Auth, validator(UserCitySchema), UserController.city)

export default routes
