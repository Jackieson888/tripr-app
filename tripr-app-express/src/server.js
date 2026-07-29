const { createServer } = require('http')
const { createApp } = require('./app')
const { socketProvider } = require('./socket/socketManager')
const { logger } = require('./utils/logger')

/**
 * Create and configure HTTP server with Socket.IO
 * @returns {http.Server} HTTP server instance
 */
function createHttpServer () {
  const app = createApp()
  const httpServer = createServer(app)

  // Initialize Socket.IO
  socketProvider.initialize(httpServer)

  return httpServer
}

/**
 * Start the server
 * @param {number} port - Port to listen on
 * @returns {http.Server} Running server instance
 */
function startServer (port) {
  const httpServer = createHttpServer()

  httpServer.listen(port, () => {
    logger.log(`[SERVER STARTED] Listening on port ${port}`)
  })

  return httpServer
}

module.exports = {
  createHttpServer,
  startServer
}
