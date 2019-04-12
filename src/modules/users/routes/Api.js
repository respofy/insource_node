import express from 'express'
import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import UserSchemas from '../validations'
import Auth from 'middleware/AuthMiddleware'
import JoiMiddleware from 'middleware/JoiMiddleware'
import WorkingExperienceController from '../controllers/WorkingExperienceController'
import InterestController from '../controllers/InterestController'
import EducationController from '../controllers/EducationController'
import LanguageController from '../controllers/LanguageController'

const routes = express.Router()

// Auth & Password reset
routes.post('/initialize', JoiMiddleware(UserSchemas.AuthInitializeSchema), AuthController.initialize)
routes.post('/resend/sms', JoiMiddleware(UserSchemas.AuthResendSMSSchema), AuthController.resendSMS)
routes.post('/verify/code', AuthController.verify)
routes.post('/fill/data', JoiMiddleware(UserSchemas.AuthFillDataSchema), AuthController.fillData)
routes.post('/authorization', JoiMiddleware(UserSchemas.UserLoginSchema), AuthController.authorization)
routes.post('/reset/init', JoiMiddleware(UserSchemas.AuthResendSMSSchema), UserController.initializePasswordReset)
routes.post('/reset/password', JoiMiddleware(UserSchemas.UserResetPasswordSchema), UserController.resetPassword)
routes.post('/auth', Auth, AuthController.getAuthUser)

// CV
routes.post('/cv/city/set', Auth, JoiMiddleware(UserSchemas.UserCitySchema), UserController.setCity)
routes.post('/cv/status/set', Auth, JoiMiddleware(UserSchemas.UserStatusSchema), UserController.setStatus)
// User Working Experience
routes.get('/cv/working-experience/get/all', Auth, WorkingExperienceController.getAll)
routes.post('/cv/working-experience/create', Auth, JoiMiddleware(UserSchemas.UserWorkingExpCreateSchema), WorkingExperienceController.create)
routes.post('/cv/working-experience/update/:id', Auth, JoiMiddleware(UserSchemas.UserWorkingExpUpdateSchema), WorkingExperienceController.update)
routes.post('/cv/working-experience/delete/:id', Auth, WorkingExperienceController.delete)
// interests
routes.get('/cv/interests/role/all', Auth, InterestController.getRoles)
routes.post('/cv/interests/role/set', Auth, InterestController.setRole)
// universities
routes.post('/cv/universities', Auth, EducationController.universities)
routes.post('/cv/faculties', Auth, EducationController.faculties)
routes.post('/cv/degrees', Auth, EducationController.degrees)
// languages
routes.post('/cv/languages/all', Auth, LanguageController.getLanguages)
routes.post('/cv/language-knowledge/all', Auth, LanguageController.getLanguageLevels)
routes.post('/cv/user-languages/all', Auth, LanguageController.getUserLanguages)
routes.post('/cv/user-language/create', Auth, JoiMiddleware(UserSchemas.UserLanguageCreateSchema), LanguageController.createUserLanguage)
routes.post('/cv/user-language/update/:id', Auth, JoiMiddleware(UserSchemas.UserLanguageUpdateSchema), LanguageController.updateUserLanguage)

routes.post('/cv/education/universities', Auth, EducationController.universities)
routes.post('/cv/education/faculties', Auth, EducationController.faculties)
routes.post('/cv/education/degrees', Auth, EducationController.degrees)
routes.post('/cv/education/create', Auth, JoiMiddleware(UserSchemas.UserEducationCreateSchema), EducationController.degrees)

export default routes
