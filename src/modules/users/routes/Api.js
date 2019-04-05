import express from 'express'
import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import validator from '../../../helper/ValidateHelper'
import UserSchemas from '../validations'
import Auth from 'middleware/AuthMiddleware'


const routes = express.Router()

// Auth & Password reset
routes.post('/initialize', validator(UserSchemas.AuthInitializeSchema), AuthController.initialize)
routes.post('/resend/sms', validator(UserSchemas.AuthResendSMSSchema), AuthController.resendSMS)
routes.post('/verify/code', AuthController.verify)
routes.post('/fill/data', validator(UserSchemas.AuthFillDataSchema), AuthController.fillData)
routes.post('/authorization', validator(UserSchemas.UserLoginSchema), UserController.authorization)
routes.post('/reset/init', validator(UserSchemas.AuthResendSMSSchema), UserController.initializePasswordReset)
routes.post('/reset/password', validator(UserSchemas.UserResetPasswordSchema), UserController.resetPassword)

routes.post('/cv/city', Auth, validator(UserSchemas.UserCitySchema), UserController.city)

export default routes
