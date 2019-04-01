/* eslint-disable no-console */
import express from 'express'
import bodyParser from 'body-parser'
import { } from 'dotenv/config'
// import responseHelper from './helper/responseHelper'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// import module routes
import users from './modules/users/routes/Api'
import company from './modules/company/routes/Api'
app.use('/users', users)
app.use('/company', company)

/*
 * Error handler for Joi validations
 */
// app.use(function(err, req, res, next) {
// 	// Initialize error response array
// 	let errorMessages = []

// 	if (err.isBoom) {
// 		// get data from Error object
// 		let errors = err.data
// 		// iterate over message objects and push into errorMessages array
// 		errors.forEach(error => {
// 			errorMessages.push(error.message)
// 		})

// 		return res.json(responseHelper.error(errorMessages))
// 	}
// })

let port = process.env.APP_PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
