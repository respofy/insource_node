import express from 'express'
import Auth from 'middleware/AuthMiddleware'
import MessageController from '../controllers/MessageController'
import MeetingController from '../controllers/MeetingController'
import Owner from 'middleware/OwnerMiddleware'

const routes = express.Router()

// message routes
routes.post('/save', Auth, MessageController.saveMessage)

// meeting routes
routes.post('/company/job/list', Auth, Owner, MessageController.companyJobList)
routes.post('/company/job/users', Auth, Owner, MessageController.companyJobUsers)
routes.post('/meeting/create', Auth, Owner, MeetingController.create)
routes.get('/meeting/user/read', Auth, Owner, MeetingController.readUserMeetings)

export default routes
