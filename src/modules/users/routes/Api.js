import express from 'express'
import multer from 'multer'
import storage from 'helper/uploadStorageHelper'
import UserSchemas from '../validations'
import Auth from 'middleware/AuthMiddleware'
import JoiMiddleware from 'middleware/JoiMiddleware'

import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import AttributesController from '../controllers/AttributesController'

import InterestController from '../controllers/InterestController'
import EducationController from '../controllers/EducationController'
import LanguageController from '../controllers/LanguageController'

const routes = express.Router()
const upload = multer({ storage })

// auth requests
routes.post('/initialize', JoiMiddleware(UserSchemas.AuthInitializeSchema), AuthController.initialize)
routes.post('/resend/sms', JoiMiddleware(UserSchemas.AuthResendSMSSchema), AuthController.resendSMS)
routes.post('/verify/code', AuthController.verify)
routes.post('/fill/data', upload.single('avatar'), JoiMiddleware(UserSchemas.AuthFillDataSchema), AuthController.fillData)
routes.post('/authorization', JoiMiddleware(UserSchemas.UserLoginSchema), AuthController.authorization)
routes.post('/reset/init', JoiMiddleware(UserSchemas.AuthResendSMSSchema), AuthController.initializePasswordReset)
routes.post('/reset/password', JoiMiddleware(UserSchemas.UserResetPasswordSchema), AuthController.resetPassword)
routes.post('/auth', Auth, AuthController.getAuthUser)

// attributes
routes.get('/attributes/roles', Auth, AttributesController.roles)
routes.get('/attributes/professions', Auth, AttributesController.professions)
routes.get('/attributes/skills/by/profession/:profession_id', Auth, AttributesController.skillsByProfession)
routes.get('/attributes/cities', Auth, AttributesController.cities)
routes.get('/attributes/working/types', Auth, AttributesController.workingTypes)
routes.get('/attributes/universities', Auth, AttributesController.universities)
routes.get('/attributes/faculties', Auth, AttributesController.faculties)
routes.get('/attributes/degrees', Auth, AttributesController.degrees)
routes.get('/attributes/statuses', Auth, AttributesController.statuses)
routes.get('/attributes/languages', Auth, AttributesController.languages)
routes.get('/attributes/language/knowledges', Auth, AttributesController.languageKnowledges)

// working experience
routes.post('/working/experience/create', Auth, JoiMiddleware(UserSchemas.UserWorkingExCreateSchema), UserController.addWorkingExperience)
routes.post('/working/experience/update', Auth, UserController.updateWorkingExperience)
routes.post('/working/experience/delete/:id', Auth, UserController.deleteWorkingExperience)
routes.get('/working/experience/read', Auth, UserController.listWorkingExperiences)

// routes.post('/add/working-experience', Auth, JoiMiddleware(UserSchemas.UserWorkingExCompanies), WorkingExController.companies)

// routes.post('/cv/working-ex/companies', Auth, JoiMiddleware(UserSchemas.UserWorkingExCompanies), WorkingExController.companies)

// routes.post('/cv/working-ex/skills/by/professions', Auth, JoiMiddleware(UserSchemas.UserWorkingExSkillsByProfessions), WorkingExController.skillsByProfessions)
// routes.post('/cv/working-ex/skills/by/experience', Auth, WorkingExController.skillsByWorkingExperience)

// CV
// routes.get('/cv/city/all', Auth, UserController.getCities)
routes.post('/cv/city/set', Auth, JoiMiddleware(UserSchemas.UserCitySchema), UserController.setCity)
// routes.get('/cv/status/all', Auth, UserController.getStatuses)
routes.post('/cv/status/set', Auth, JoiMiddleware(UserSchemas.UserStatusSchema), UserController.setStatus)

// universities
routes.post('/cv/universities', Auth, EducationController.universities)
routes.post('/cv/faculties', Auth, EducationController.faculties)
routes.post('/cv/degrees', Auth, EducationController.degrees)
// languages
routes.get('/cv/languages/all', Auth, LanguageController.getLanguages)
routes.get('/cv/language-knowledge/all', Auth, LanguageController.getLanguageLevels)
routes.get('/cv/user-languages/all', Auth, LanguageController.getUserLanguages)
routes.post('/cv/user-language/create', Auth, JoiMiddleware(UserSchemas.UserLanguageCreateSchema), LanguageController.createUserLanguage)
routes.post('/cv/user-language/update', Auth, JoiMiddleware(UserSchemas.UserLanguageUpdateSchema), LanguageController.updateUserLanguage)
routes.post('/cv/user-language/delete', Auth, LanguageController.deleteUserLanguage)

// education
routes.post('/cv/education/universities', Auth, EducationController.universities)
routes.post('/cv/education/faculties', Auth, EducationController.faculties)
routes.post('/cv/education/degrees', Auth, EducationController.degrees)
routes.get('/cv/education/list', Auth, EducationController.list)
routes.post('/cv/education/create', Auth, JoiMiddleware(UserSchemas.UserEducationCreateSchema), EducationController.create)
routes.post('/cv/education/update', Auth, JoiMiddleware(UserSchemas.UserEducationUpdateSchema), EducationController.update)
routes.post('/cv/education/delete', Auth, EducationController.delete)

// routes.post('/cv/favorite/company/search', Auth, JoiMiddleware(UserSchemas.UserWorkingExCompanies), WorkingExController.companies)
routes.post('/cv/favorite/company/add', Auth, JoiMiddleware(UserSchemas.FavoriteCompanyAddSchema), UserController.addCompanyToFavorites)
routes.post('/cv/favorite/company/remove', Auth, JoiMiddleware(UserSchemas.FavoriteCompanyRemoveSchema), UserController.removeCompanyFromFavorites)
routes.get('/cv/favorite/company/all', Auth, UserController.favoriteCompanies)

// interests
routes.get('/cv/interests/all', Auth, InterestController.getInterests)
routes.get('/cv/interests/role/all', Auth, InterestController.getRoles)
routes.post('/cv/interests/role/set', Auth, JoiMiddleware(UserSchemas.InterestRoleSetSchema), InterestController.setRole)
routes.get('/cv/interests/working-type/all', Auth, InterestController.getWorkingTypes)
routes.post('/cv/interests/working-type/set', Auth, JoiMiddleware(UserSchemas.InterestWorkingTypeSetSchema), InterestController.setWorkingType)
routes.get('/cv/interests/industry/all', Auth, InterestController.getIndustries)
routes.post('/cv/interests/industry/set', Auth, JoiMiddleware(UserSchemas.InterestIndustrySetSchema), InterestController.setIndustry)
routes.get('/cv/interests/profession/all', Auth, InterestController.getProfessions)
routes.post('/cv/interests/profession/set', Auth, JoiMiddleware(UserSchemas.InterestProfessionSetSchema), InterestController.setProfession)
routes.post('/cv/interests/salary/set', Auth, JoiMiddleware(UserSchemas.InterestSalarySetSchema), InterestController.setSalary)

export default routes
