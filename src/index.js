import express from 'express'
import bodyParser from 'body-parser'
import responseHelper from './helper/responseHelper'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3000

// import users routes
import users from './modules/users/routes/api'
app.use('/users', users)

/*
* Error handler for Joi validations
*/
app.use(function (err, req, res, next) {
  // Initialize error response array
  let errorMessages = []

  if (err.isBoom) {
    // get data from Error object
    let errors = err.data
    // iterate over message objects and push into errorMessages array
    errors.forEach(error => {
      errorMessages.push(error.message)
    });

    return res.json(responseHelper.error(errorMessages))
  }
});

/**
 * error handling
 *
 */

// app.use(function(err, req, res, next) {
// 	console.error(123)
// 	res.status(500).send('Something broke!')
// })

// run the application
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
