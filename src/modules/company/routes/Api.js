import express from 'express'
import multer from 'multer'
import storage from 'helper/uploadStorageHelper'
import CompanySchemas from '../validations'
import CompanyController from '../controllers/CompanyController'
import JoiMiddleware from 'middleware/JoiMiddleware'
import Auth from 'middleware/AuthMiddleware'

const routes = express.Router()
const upload = multer({ storage })

// create
routes.post('/job/create', Auth, JoiMiddleware(JoiMiddleware.createJob), CompanyController.fillData)

// company
// TODO: need review company routes and functionality
routes.post('/fill/data', Auth, upload.single('logo'), JoiMiddleware(JoiMiddleware.CompanyFillDataSchema), CompanyController.fillData)
routes.post('/invite', Auth, CompanyController.invite)
routes.get('/owned/list', Auth, CompanyController.getUserOwnedCompanies)
routes.get('/active', Auth, CompanyController.getActiveCompany)
routes.post('/switch', Auth, JoiMiddleware(CompanySchemas.ActiveCompanySwitchSchema), CompanyController.switchActiveCompany)
routes.post('/search/companies/by/name', Auth, CompanyController.searchCompaniesByName)

export default routes
