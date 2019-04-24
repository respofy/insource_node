import express from 'express'
import multer from 'multer'
import storage from 'helper/uploadStorageHelper'
import CompanySchemas from '../validations'
import CompanyController from '../controllers/CompanyController'
import JoiMiddleware from 'middleware/JoiMiddleware'
import Auth from 'middleware/AuthMiddleware'
import Owner from 'middleware/OwnerMiddleware'
import JobController from '../controllers/JobController'

const routes = express.Router()
const upload = multer({ storage })

// company
// TODO: need review company routes and functionality
routes.post('/registration', Auth, upload.single('logo'), JoiMiddleware(JoiMiddleware.CompanyFillDataSchema), CompanyController.registration)
routes.post('/invite/users', Auth, JoiMiddleware(CompanySchemas.InviteSchema), CompanyController.inviteUsers)

routes.get('/owned/list', Auth, CompanyController.getUserOwnedCompanies)
routes.get('/active', Auth, CompanyController.getActiveCompany)
routes.post('/switch', Auth, JoiMiddleware(CompanySchemas.ActiveCompanySwitchSchema), CompanyController.switchActiveCompany)
routes.post('/search/companies/by/name', Auth, CompanyController.searchCompaniesByName)
// Jobs
routes.get('/:company_id/job/read', Auth, Owner, JobController.read)
routes.post('/job/create', Auth, JoiMiddleware(CompanySchemas.CreateJobSchema), JobController.create)
routes.post('/job/delete/:id', Auth, JobController.delete)

routes.post('/job/set/requirements', Auth, JobController.setJobRequirements)

export default routes
