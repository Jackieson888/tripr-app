const { logger } = require('../utils/logger')

/**
 * Global error handler middleware
 * Catches all errors and sends appropriate response
 */
function errorHandler (error, req, res, next) {
  // Ensure error has a status code
  if (!error.status) {
    error.status = 400
  }

  // Log server errors
  if (error.status === 500) {
    logger.error('[ERROR]:', error)
  }

  // Send error response
  res.status(error.status).send({
    error: {
      message: error.message || error.toString(),
      status: error.status
    },
    url: req.url
  })
}

module.exports = {
  errorHandler
}
