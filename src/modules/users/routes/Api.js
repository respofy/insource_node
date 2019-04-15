import express from 'express'
import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import UserSchemas from '../validations'
import Auth from 'middleware/AuthMiddleware'
import JoiMiddleware from 'middleware/JoiMiddleware'
import WorkingExController from '../controllers/WorkingExController'
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
routes.get('/cv/city/all', Auth, UserController.getCities)
routes.post('/cv/city/set', Auth, JoiMiddleware(UserSchemas.UserCitySchema), UserController.setCity)
routes.get('/cv/status/all', Auth, UserController.getStatuses)
routes.post('/cv/status/set', Auth, JoiMiddleware(UserSchemas.UserStatusSchema), UserController.setStatus)
// User Working Experience
routes.get('/cv/working-ex/companies', Auth, JoiMiddleware(UserSchemas.UserWorkingExCompanies), WorkingExController.companies)
routes.get('/cv/working-ex/roles', Auth, WorkingExController.roles)
routes.get('/cv/working-ex/professions', Auth, WorkingExController.professions)
routes.get('/cv/working-ex/skills/by/professions', Auth, JoiMiddleware(UserSchemas.UserWorkingExSkillsByProfessions), WorkingExController.skillsByProfessions)
routes.post('/cv/working-ex/create', Auth, JoiMiddleware(UserSchemas.UserWorkingExCreateSchema), WorkingExController.create)
routes.post('/cv/working-ex/update', Auth, WorkingExController.update)
routes.post('/cv/working-ex/delete', Auth, WorkingExController.delete)
routes.get('/cv/working-ex/list', Auth, WorkingExController.list)

// routes.get('/cv/working-experience/get/all', Auth, WorkingExController.getAll)
// routes.post('/cv/working-experience/create', Auth, JoiMiddleware(UserSchemas.UserWorkingExCreateSchema), WorkingExController.create)
// routes.post('/cv/working-experience/update/:id', Auth, JoiMiddleware(UserSchemas.UserWorkingExUpdateSchema), WorkingExController.update)
// routes.post('/cv/working-experience/delete/:id', Auth, WorkingExController.delete)
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
// TODO: delete user language
// education
routes.post('/cv/education/universities', Auth, EducationController.universities)
routes.post('/cv/education/faculties', Auth, EducationController.faculties)
routes.post('/cv/education/degrees', Auth, EducationController.degrees)
routes.get('/cv/education/list', Auth, EducationController.list)
routes.post('/cv/education/create', Auth, JoiMiddleware(UserSchemas.UserEducationCreateSchema), EducationController.create)
routes.post('/cv/education/update/:id', Auth, JoiMiddleware(UserSchemas.UserEducationUpdateSchema), EducationController.update)
routes.post('/cv/education/delete/:id', Auth, EducationController.delete)

export default routes
