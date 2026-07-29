const { Auth0Provider } = require('@bcwdev/auth0provider')

/**
 * Auth0 configuration setup
 */
function configureAuth0 () {
  Auth0Provider.configure({
    domain: process.env.AUTH_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    audience: process.env.AUTH_AUDIENCE
  })
}

module.exports = {
  configureAuth0
}
