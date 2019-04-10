import express from 'express'
import companyController from '../controllers/CompanyController'
import JoiMiddleware from 'middleware/JoiMiddleware'

const routes = express.Router()

routes.post('/fill/data', JoiMiddleware(JoiMiddleware.CompanyFillDataSchema), companyController.fillData)
routes.post('/invite', companyController.invite)

export default routes
