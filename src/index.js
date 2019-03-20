import express from 'express'
const app = express()
const port = 3000

// import users routes
import users from './users/routes/api'
app.use('/users', users)

// run the application
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
