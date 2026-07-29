// Load environment variables
require('dotenv').config()

const { validateEnvironment, getConfig } = require('./config/environment')
const { DbConnection } = require('./config/database')
const { startServer } = require('./server')
const { logger } = require('./utils/logger')

/**
 * Application entry point
 * Validates environment, connects to database, and starts server
 */
async function main () {
  try {
    // Validate environment variables
    validateEnvironment()
    const config = getConfig()

    logger.log(`[STARTING APP] Environment: ${config.env}`)

    // Connect to MongoDB
    logger.log('[CONNECTING TO DATABASE]')
    const dbConnected = await DbConnection.connect(config.database.connectionString)
    if (!dbConnected) {
      throw new Error('Failed to connect to database')
    }

    // Start HTTP server
    const port = config.port
    const server = startServer(port)

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.log('[SHUTTING DOWN] Received SIGTERM signal')
      server.close(async () => {
        await DbConnection.disconnect()
        logger.log('[SHUTDOWN COMPLETE]')
        process.exit(0)
      })
    })

    process.on('SIGINT', async () => {
      logger.log('[SHUTTING DOWN] Received SIGINT signal')
      server.close(async () => {
        await DbConnection.disconnect()
        logger.log('[SHUTDOWN COMPLETE]')
        process.exit(0)
      })
    })
  } catch (error) {
    logger.error('[FATAL ERROR]', error.message)
    process.exit(1)
  }
}

// Start the application
main()
