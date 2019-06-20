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
routes.post('/invite/users', Auth, Owner, JoiMiddleware(CompanySchemas.InviteSchema), CompanyController.inviteUsers)

routes.post('/join/check', CompanyController.checkInviteHash)
routes.post('/join/init', Invite, JoiMiddleware(CompanySchemas.JoinInitSchema), CompanyController.initCompanyJoin)
routes.post('/join/verify', Invite, JoiMiddleware(CompanySchemas.JoinVerifySchema), CompanyController.verifyCompanyJoin)
routes.post('/join/new/user', upload.single('avatar'), Invite, JoiMiddleware(CompanySchemas.CreateAndInviteSchema), CompanyController.createUserInCompany)

routes.get('/owned/list', Auth, CompanyController.getUserOwnedCompanies)
routes.post('/search/companies/by/name', Auth, JoiMiddleware(CompanySchemas.SearchCompanySchema), CompanyController.searchCompaniesByName)

// match algorithm and jobs
routes.post('/job/create', Auth, JoiMiddleware(CompanySchemas.JobCreateSchema), MatchController.matchAndCreate)
routes.post('/job/list', Auth, Owner, JobController.list)
routes.post('/job/detail', Auth, Owner, JobController.detail)
routes.post('/job/detail/users', Auth, Owner, JobController.detailUsers)
routes.post('/job/archived/read', Auth, Owner, JobController.readArchived)
routes.post('/job/archive/:id', Auth, JobController.archive)

// company left stats
routes.post('/left/stats', Auth, Owner, CompanyController.leftStats)

export default routes
