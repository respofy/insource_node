/* eslint-disable no-console */
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import {} from 'dotenv/config'
import cors from 'cors'
import response from 'helper/Response'

// import io from 'socket.io'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// import module routes
import users from './modules/users/routes/Api'
import company from './modules/company/routes/Api'
import message from './modules/message/routes/Api'
import report from './modules/report/routes/Api'

app.use('/users', users)
app.use('/company', company)
app.use('/message', message)
app.use('/report', report)

app.use(express.static('public'))

/*
 * Error handler for Joi validations
 */
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
	// Initialize error response array
	let errorMessages = []
	if (err.isBoom) {
		// get data from Error object
		let errors = err.data

		// iterate over message objects and push into errorMessages array
		errors.forEach(error => {
			errorMessages.push(error.message)
		})

		// remove duplicated error messages created by joi
		let filteredMessages = [...new Set(errorMessages)]

		return res.json(response.error(filteredMessages))
	}
})

let port = process.env.APP_PORT
var server = http.createServer(app)

// ---------------------------------------------------------------------
// socket block
var io = require('socket.io')(server)

let endUsers = []

io.on('connection', function(socket) {
	// socket on connect
	socket.on('connection', function(data) {
		// save end user data
		endUsers.push({
			id: socket.id,
			user_id: data.user_id
		})
		// eslint-disable-next-line no-unused-vars
		let len = endUsers.length
		len--
		console.log(endUsers)
	})

	// disconetc from event
	socket.on('disconnect', () => {
		for (let i = 0; i < endUsers.length; i++) {
			if (endUsers[i].id === socket.id) {
				endUsers.splice(i, 1)
			}
		}
	})

	// socket chat message
	socket.on('chat message', function(data) {
		let receiver_id = null

		endUsers.forEach(value => {
			console.log(value)
			if (value.user_id == data.receiver_id) {
				receiver_id = value.id
			}
		})

		io.to(receiver_id).emit('chat message', data)
	})
})

app.get('/test_html_socker', function(req, res) {
	res.sendFile(__dirname + '/view/test_html_socker.html')
})

// socket block
// ---------------------------------------------------------------------

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Example app listening on port ${port}!`))
