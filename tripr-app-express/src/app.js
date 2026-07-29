const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const path = require('path')
const { configureCors } = require('./middleware/cors')
const { authMiddleware } = require('./middleware/auth')
const { errorHandler } = require('./middleware/errorHandler')
const { configureAuth0 } = require('./config/auth')
const routes = require('./routes')

/**
 * Express application configuration
 * Sets up middleware, routes, and error handling
 */
function createApp () {
  const app = express()

  // Configure Auth0
  configureAuth0()

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false
  }))

  // CORS middleware
  app.use(configureCors())

  // Body parsing middleware
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

  // Account validation middleware
  app.use(authMiddleware)

  // API routes
  app.use('/api', routes)

  // Static file serving (client)
  const clientPath = path.join(__dirname, '../client/dist')
  app.use(express.static(clientPath))

  // 404 handlers for API routes
  app.use('/api', (req, res, next) => {
    res.status(404).send({
      status: 404,
      message: 'Not Found',
      url: req.url
    })
  })

  // Client fallback for 404
  app.use('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'))
  })

  // Global error handler (must be last)
  app.use(errorHandler)

  return app
}

module.exports = {
  createApp
}
