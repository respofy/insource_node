import express from 'express'
import companyController from '../controllers/CompanyController'
import validator from 'helper/ValidateHelper'
import companyCreateSchema from '../validations/CompanyCreateSchema'

const routes = express.Router()

routes.post('/fill/data', validator(companyCreateSchema), companyController.fillData)
routes.post('/invite', companyController.invite)

export default routes
