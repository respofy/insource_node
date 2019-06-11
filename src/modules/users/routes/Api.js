import express from 'express'
import multer from 'multer'
import storage from 'helper/UploadHelper'
import UserSchemas from '../validations'
import Auth from 'middleware/AuthMiddleware'
import JoiMiddleware from 'middleware/JoiMiddleware'
import AuthController from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import AttributesController from '../controllers/AttributesController'
import InterestController from '../controllers/InterestController'

const routes = express.Router()
const upload = multer({ storage: storage(`${process.env.PUBLIC_PATH}/${process.env.USER_AVATAR_PATH}`) })

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
routes.get('/attributes/industries', Auth, AttributesController.industries)
routes.get('/attributes/roles', Auth, AttributesController.roles)
routes.get('/attributes/professions', Auth, AttributesController.professions)
routes.get('/attributes/skills/by/profession/:profession_id', Auth, AttributesController.skillsByProfession)
routes.get('/attributes/cities', AttributesController.cities)
routes.get('/attributes/working/types', Auth, AttributesController.workingTypes)
routes.get('/attributes/universities', Auth, AttributesController.universities)
routes.get('/attributes/faculties', Auth, AttributesController.faculties)
routes.get('/attributes/degrees', Auth, AttributesController.degrees)
routes.get('/attributes/statuses', Auth, AttributesController.statuses)
routes.get('/attributes/languages', Auth, AttributesController.languages)
routes.get('/attributes/language/knowledges', Auth, AttributesController.languageKnowledges)
routes.get('/attributes/qualifications', Auth, AttributesController.qualifications)

// working experience
routes.post('/working/experience/create', Auth, JoiMiddleware(UserSchemas.UserWorkingExCreateSchema), UserController.addWorkingExperience)
routes.post('/working/experience/update/:id', Auth, JoiMiddleware(UserSchemas.UserWorkingExUpdateSchema), UserController.updateWorkingExperience)
routes.post('/working/experience/delete/:id', Auth, UserController.deleteWorkingExperience)
routes.get('/working/experience/read', Auth, UserController.listWorkingExperiences)

// languages
routes.post('/language/create', Auth, JoiMiddleware(UserSchemas.UserLanguageCreateSchema), UserController.addLanguage)
routes.post('/language/update/:id', Auth, JoiMiddleware(UserSchemas.UserLanguageUpdateSchema), UserController.updateLanguage)
routes.post('/language/delete/:id', Auth, UserController.deleteLanguage)
routes.get('/language/read', Auth, UserController.readLanguages)

// education
routes.post('/education/create', Auth, JoiMiddleware(UserSchemas.UserEducationCreateSchema), UserController.addEducation)
routes.post('/education/update/:id', Auth, JoiMiddleware(UserSchemas.UserEducationUpdateSchema), UserController.updateEducation)
routes.post('/education/delete/:id', Auth, UserController.deleteEducation)
routes.get('/education/read', Auth, UserController.readEducation)

// certificates
routes.post('/certificate/create', Auth, JoiMiddleware(UserSchemas.UserCertificateCreateSchema), UserController.addCertificate)
routes.post('/certificate/update/:id', Auth, JoiMiddleware(UserSchemas.UserCertificateUpdateSchema), UserController.updateCertificate)
routes.post('/certificate/delete/:id', Auth, UserController.deleteCertificate)
routes.get('/certificate/read', Auth, UserController.readCertificate)

//qualifications
routes.post('/qualification/create', Auth, JoiMiddleware(UserSchemas.UserQualificationCreateSchema), UserController.createQualification)
routes.get('/qualification/read', Auth, UserController.readQualification)
routes.post('/qualification/update/:id', Auth, JoiMiddleware(UserSchemas.UserQualificationUpdateSchema), UserController.updateQualification)
routes.post('/qualification/delete/:id', Auth, UserController.deleteQualification)

// TODO: need to finish
routes.get('/profile/info/get', Auth, UserController.getProfileInfo)
routes.post('/profile/info/set', Auth, upload.single('avatar'), JoiMiddleware(UserSchemas.UserSetProfileInfoSchema), UserController.setProfileInfo)

// routes.post('/cv/favorite/company/search', Auth, JoiMiddleware(UserSchemas.UserWorkingExCompanies), WorkingExController.companies)
routes.post('/cv/favorite/company/add', Auth, JoiMiddleware(UserSchemas.FavoriteCompanyAddSchema), UserController.addCompanyToFavorites)
routes.post('/cv/favorite/company/remove', Auth, JoiMiddleware(UserSchemas.FavoriteCompanyRemoveSchema), UserController.removeCompanyFromFavorites)
routes.get('/cv/favorite/company/all', Auth, UserController.favoriteCompanies)

// interests
routes.post('/cv/interests/set', Auth, InterestController.setInterest)
routes.get('/cv/interests/all', Auth, InterestController.getInterests)

export default routes
