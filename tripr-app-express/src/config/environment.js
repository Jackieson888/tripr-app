/**
 * Environment variables configuration and validation
 */

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'CONNECTION_STRING',
  'AUTH_DOMAIN',
  'AUTH_CLIENT_ID',
  'AUTH_AUDIENCE'
]

/**
 * Validate that all required environment variables are set
 * @throws {Error} If any required environment variables are missing
 */
function validateEnvironment () {
  const missing = requiredEnvVars.filter(varName => !process.env[varName])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

/**
 * Get environment-specific configuration
 * @returns {Object} Environment configuration object
 */
function getConfig () {
  return {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    isDev: process.env.NODE_ENV === 'dev',
    isProduction: process.env.NODE_ENV === 'production',
    database: {
      connectionString: process.env.CONNECTION_STRING
    },
    auth: {
      domain: process.env.AUTH_DOMAIN,
      clientId: process.env.AUTH_CLIENT_ID,
      audience: process.env.AUTH_AUDIENCE
    }
  }
}

module.exports = {
  validateEnvironment,
  getConfig
}
