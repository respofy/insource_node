import express from 'express'
import CompanySchemas from '../validations'
import JoiMiddleware from 'middleware/JoiMiddleware'
import multer from 'multer'
import storage from 'helper/UploadHelper'
import CompanyController from '../controllers/CompanyController'
import Auth from 'middleware/AuthMiddleware'
import JobController from '../controllers/JobController'
import {} from 'dotenv/config'

const routes = express.Router()
const upload = multer({ storage: storage(`${process.env.PUBLIC_PATH}/${process.env.COMPANY_LOGO_PATH}`) })

// company
// TODO: need review company routes and functionality
routes.post('/registration', Auth, upload.single('logo'), JoiMiddleware(CompanySchemas.CompanyFillDataSchema), CompanyController.registration)
routes.post('/invite/users', Auth, JoiMiddleware(CompanySchemas.InviteSchema), CompanyController.inviteUsers)

routes.get('/owned/list', Auth, CompanyController.getUserOwnedCompanies)
routes.get('/active', Auth, CompanyController.getActiveCompany)
routes.post('/switch', Auth, JoiMiddleware(CompanySchemas.ActiveCompanySwitchSchema), CompanyController.switchActiveCompany)
routes.post('/search/companies/by/name', Auth, CompanyController.searchCompaniesByName)

// Jobs
routes.post('/job/create', Auth, JoiMiddleware(CompanySchemas.CreateJobSchema), JobController.create)
routes.post('/job/set/requirements', Auth, JobController.setJobRequirements)
routes.post('/job/delete/:id', Auth, JobController.delete)

export default routes
