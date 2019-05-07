import express from 'express'
import CompanySchemas from '../validations'
import JoiMiddleware from 'middleware/JoiMiddleware'
import Owner from 'middleware/OwnerMiddleware'
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
routes.post('/:company_id/invite/users', Auth, Owner, JoiMiddleware(CompanySchemas.InviteSchema), CompanyController.inviteUsers)

routes.get('/owned/list', Auth, CompanyController.getUserOwnedCompanies)
routes.post('/search/companies/by/name', Auth, CompanyController.searchCompaniesByName)

// Jobs
routes.get('/:company_id/job/read', Auth, Owner, JobController.read)
routes.post('/:company_id/job/create', Auth, Owner, JoiMiddleware(CompanySchemas.CreateJobSchema), JobController.create)
routes.post('/job/set/requirements', Auth, JobController.setJobRequirements)
routes.post('/job/delete/:id', Auth, JobController.delete)

export default routes
