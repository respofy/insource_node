/* eslint-disable no-console */
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import {} from 'dotenv/config'
import cors from 'cors'
import response from 'helper/Response'

// import VerifyJwtHelper from 'helper/VerifyJwtHelper'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// TODO filter /api
// app.use('/api/', VerifyJwtHelper)

// import module routes
import users from './modules/users/routes/Api'
import company from './modules/company/routes/Api'
import message from './modules/message/routes/Api'

app.use('/users', users)
app.use('/company', company)
app.use('/message', message)

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
// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Example app listening on port ${port}!`))
