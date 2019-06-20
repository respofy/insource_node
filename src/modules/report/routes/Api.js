import express from 'express'
import Auth from 'middleware/AuthMiddleware'
import ReportController from '../controllers/ReportController'

const routes = express.Router()

// most wanted positions
routes.post('/most_wanted_positions', Auth, ReportController.mostWantedPositions)

export default routes
