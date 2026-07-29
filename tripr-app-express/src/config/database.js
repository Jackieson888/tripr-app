const mongoose = require('mongoose')
const { logger } = require('../utils/logger')

/**
 * MongoDB connection configuration and setup
 */
class DbConnection {
  /**
   * Connect to MongoDB using Mongoose
   * @param {string} connectionstring - MongoDB connection string
   * @returns {Promise<boolean>} True if connection successful, false otherwise
   */
  static async connect (connectionstring = process.env.CONNECTION_STRING || '') {
    try {
      if (!connectionstring) {
        throw new Error('No CONNECTION_STRING provided in environment variables')
      }

      await mongoose.connect(connectionstring)
      logger.log('[CONNECTION TO DB SUCCESSFUL]')
      return true
    } catch (e) {
      logger.error('[MONGOOSE CONNECTION ERROR]:', e.message)
      return false
    }
  }

  /**
   * Disconnect from MongoDB
   */
  static async disconnect () {
    try {
      await mongoose.disconnect()
      logger.log('[DISCONNECTED FROM DB]')
      return true
    } catch (e) {
      logger.error('[MONGOOSE DISCONNECT ERROR]:', e.message)
      return false
    }
  }
}

// Setup connection event listeners
mongoose.connection.on('error', err => {
  logger.error('[DATABASE ERROR]:', err)
})

mongoose.connection.on('connected', () => {
  logger.log('[DATABASE CONNECTED]')
})

mongoose.connection.on('disconnected', () => {
  logger.log('[DATABASE DISCONNECTED]')
})

module.exports = {
  DbConnection
}
