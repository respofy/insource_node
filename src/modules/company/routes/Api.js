import express from 'express'
import companyController from '../controllers/CompanyController'
import validator from 'helper/ValidateHelper'
import CompanySchemas from '../validations'

const routes = express.Router()

routes.post('/fill/data', validator(CompanySchemas.CompanyFillDataSchema), companyController.fillData)
routes.post('/invite', companyController.invite)

export default routes
