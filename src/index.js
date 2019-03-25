import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3000

// import users routes
import users from './modules/users/routes/api'
app.use('/users', users)

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
