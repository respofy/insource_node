import express from 'express'
import userController from '../controllers/userController'

const routes = express.Router()

console.log(userController.authorization)

routes.get('/authorization', userController.authorization)

export default routes
