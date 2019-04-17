import express from 'express'
import CompanySchemas from '../validations'
import CompanyController from '../controllers/CompanyController'
import JoiMiddleware from 'middleware/JoiMiddleware'
import Auth from 'middleware/AuthMiddleware'

const routes = express.Router()

routes.post('/fill/data', JoiMiddleware(JoiMiddleware.CompanyFillDataSchema), CompanyController.fillData)
routes.post('/invite', CompanyController.invite)

routes.get('/owned/list', Auth, CompanyController.getUserOwnedCompanies)
routes.get('/active', Auth,  CompanyController.getActiveCompany)
routes.post('/switch', Auth, JoiMiddleware(CompanySchemas.ActiveCompanySwitchSchema), CompanyController.switchActiveCompany)

export default routes
