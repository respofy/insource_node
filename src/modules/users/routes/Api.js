import express from 'express'
import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import UserSchemas from '../validations'
import Auth from 'middleware/AuthMiddleware'
import JoiMiddleware from 'middleware/JoiMiddleware'

const routes = express.Router()

// Auth & Password reset
routes.post('/initialize', JoiMiddleware(UserSchemas.AuthInitializeSchema), AuthController.initialize)
routes.post('/resend/sms', JoiMiddleware(UserSchemas.AuthResendSMSSchema), AuthController.resendSMS)
routes.post('/verify/code', AuthController.verify)
routes.post('/fill/data', JoiMiddleware(UserSchemas.AuthFillDataSchema), AuthController.fillData)
routes.post('/authorization', JoiMiddleware(UserSchemas.UserLoginSchema), AuthController.authorization)
routes.post('/reset/init', JoiMiddleware(UserSchemas.AuthResendSMSSchema), UserController.initializePasswordReset)
routes.post('/reset/password', JoiMiddleware(UserSchemas.UserResetPasswordSchema), UserController.resetPassword)

routes.post('/cv/city/set', Auth, JoiMiddleware(UserSchemas.UserCitySchema), UserController.setCity)

export default routes
