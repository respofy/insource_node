import express from 'express'
import companyController from '../controllers/companyController'
import validator from 'helper/validateHelper'
import companyCreateSchema from '../validations/companyCreateSchema'

const routes = express.Router()

routes.post('/fill/data', validator(companyCreateSchema),  companyController.fillData)
routes.post('/invite', companyController.invite)

export default routes
