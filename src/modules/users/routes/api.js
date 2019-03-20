import express from 'express'
import userController from '../controllers/userController'

const routes = express.Router()

routes.get('/authorization', userController.authorization)
routes.get('/registration', userController.registration)

export default routes
