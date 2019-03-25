import express from 'express'
import userController from '../controllers/userController'

const routes = express.Router()

routes.post('/authorization', userController.authorization)
routes.post('/registration', userController.registration)

export default routes
