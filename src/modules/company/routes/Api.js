import express from 'express'
import CompanySchemas from '../validations'
import JoiMiddleware from 'middleware/JoiMiddleware'
import Invite from 'middleware/InviteMiddleware'
import Owner from 'middleware/OwnerMiddleware'
import multer from 'multer'
import storage from 'helper/UploadHelper'
import CompanyController from '../controllers/CompanyController'
import Auth from 'middleware/AuthMiddleware'
import JobController from '../controllers/JobController'
import MatchController from '../controllers/MatchController'
import {} from 'dotenv/config'

const routes = express.Router()
const upload = multer({ storage: storage(`${process.env.PUBLIC_PATH}/${process.env.COMPANY_LOGO_PATH}`) })

// company
// TODO: need review company routes and functionality
routes.post('/registration', Auth, upload.single('logo'), JoiMiddleware(CompanySchemas.CompanyFillDataSchema), CompanyController.registration)
routes.post('/:company_id/invite/users', Auth, Owner, JoiMiddleware(CompanySchemas.InviteSchema), CompanyController.inviteUsers)

routes.post('/join/check', CompanyController.checkInviteHash)
routes.post('/join/init', Invite, JoiMiddleware(CompanySchemas.JoinInitSchema), CompanyController.initCompanyJoin)
routes.post('/join/verify', Invite, JoiMiddleware(CompanySchemas.JoinVerifySchema), CompanyController.verifyCompanyJoin)
routes.post('/join/new/user', upload.single('avatar'), Invite, JoiMiddleware(CompanySchemas.CreateAndInviteSchema), CompanyController.createUserInCompany)

routes.get('/owned/list', Auth, CompanyController.getUserOwnedCompanies)
routes.post('/search/companies/by/name', Auth, JoiMiddleware(CompanySchemas.SearchCompanySchema), CompanyController.searchCompaniesByName)

// Jobs
routes.get('/:company_id/job/read', Auth, Owner, JobController.read)
routes.get('/:company_id/job/archived/read', Auth, Owner, JobController.readArchived)
routes.post('/:company_id/job/create', Auth, Owner, JoiMiddleware(CompanySchemas.CreateJobSchema), JobController.create)
routes.post('/job/set/requirements', Auth, JoiMiddleware(CompanySchemas.JobRequirementSchema), JobController.setJobRequirements)
routes.post('/job/delete/:id', Auth, JobController.delete)
routes.post('/job/archive/:id', Auth, JobController.archive)

routes.post('/job/match', Auth, MatchController.match)

export default routes
