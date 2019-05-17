import express from 'express'
import Auth from 'middleware/AuthMiddleware'
import MessageController from '../controllers/MessageController'
import MeetingController from '../controllers/MeetingController'

const routes = express.Router()

// message routes
routes.post('/save', Auth, MessageController.saveMessage)

// meeting routes
routes.post('/meeting/create', Auth, MeetingController.create)
routes.get('/meeting/user/read', Auth, MeetingController.readUserMeetings)

export default routes
