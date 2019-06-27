import express from 'express'
import Auth from 'middleware/AuthMiddleware'
import MessageController from '../controllers/MessageController'
import MeetingController from '../controllers/MeetingController'
import Owner from 'middleware/OwnerMiddleware'

const routes = express.Router()

// message routes
routes.post('/company/job/list', Auth, Owner, MessageController.companyJobList)
routes.post('/company/job/users', Auth, Owner, MessageController.companyJobUsers)
routes.post('/company/history', Auth, Owner, MessageController.companyMessageHistory)
routes.post('/user/history', Auth, MessageController.userMessageHistory)
routes.post('/user/job/list', Auth, MessageController.userJobList)
// new message
routes.post('/save', Auth, MessageController.saveMessage)

// meeting routes
routes.post('/meeting/create', Auth, Owner, MeetingController.create)
// user meetings
routes.post('/meeting/user/read', Auth, MeetingController.readUserMeetings)
routes.post('/meeting/user/update', Auth, MeetingController.userMeetingsUpdate)
routes.post('/meeting/company/read', Owner, Auth, MeetingController.readCompanyMeetings)
routes.post('/meeting/company/read/list', Owner, Auth, MeetingController.readCompanyMeetingsList)

export default routes
