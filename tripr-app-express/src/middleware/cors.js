const cors = require('cors')

/**
 * CORS configuration
 * Handles cross-origin requests based on environment
 */
function configureCors () {
  const corsOptions = {
    origin (origin, callback) {
      // In dev mode, allow all origins
      if (process.env.NODE_ENV === 'dev') {
        return callback(null, true)
      }

      // In production, restrict to allowed domains
      const allowedDomains = [
        process.env.CLIENT_URL || 'http://localhost:8080'
      ]

      const originIsWhitelisted = allowedDomains.includes(origin)
      callback(null, originIsWhitelisted)
    },
    credentials: true
  }

  return cors(corsOptions)
}

module.exports = {
  configureCors
}
