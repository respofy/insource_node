import express from 'express'
import Sequelize from 'sequelize'

const app = express()
const port = 3000

// import users routes
import users from './modules/users/routes/api'
app.use('/users', users)

// run the application
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
