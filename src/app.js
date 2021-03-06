const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { transports } = require('./logger')
const expressWinston = require('express-winston')

const usersRouter = require('./routes/users')

const errorHandler = require('./error-handler')
const app = express()

app.use(expressWinston.logger({
  transports,
  level: (req, res) => {
    if (res.statusCode < 400) {
      return 'info'
    }
    return 'error'
  }
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use(errorHandler)

module.exports = app
