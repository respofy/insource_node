import express from 'express'
import Auth from 'middleware/AuthMiddleware'
import CompanyReportController from '../controllers/CompanyReportController'
import UserReportController from '../controllers/UserReportController'

const routes = express.Router()

// company
routes.post('/company/most_wanted_positions', Auth, CompanyReportController.mostWantedPositions)
routes.post('/company/most_wanted_professions', Auth, CompanyReportController.mostWantedProfessions)
routes.post('/company/active_industries', Auth, CompanyReportController.activeIndustries)
routes.post('/company/top_companies', Auth, CompanyReportController.topCompanies)
routes.post('/company/most_wanted_education', Auth, CompanyReportController.mostWantedEducation)
routes.post('/company/most_wanted_language', Auth, CompanyReportController.mostWantedLanguage)

// user
routes.post('/user/most_wanted_positions', Auth, UserReportController.mostWantedPositions)
routes.post('/user/most_wanted_professions', Auth, UserReportController.mostWantedProfessions)

export default routes
