import express from 'express'
import companyController from '../controllers/CompanyController'
import validator from 'helper/ValidateHelper'
import companyFillDataSchema from '../validations/CompanyFillDataSchema'

const routes = express.Router()

routes.post('/fill/data', validator(companyFillDataSchema), companyController.fillData)
routes.post('/invite', companyController.invite)

export default routes
