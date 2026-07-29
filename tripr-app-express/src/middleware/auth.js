const { Auth0Provider } = require('@bcwdev/auth0provider')
const { accountService } = require('../services/AccountService')

/**
 * Auth middleware to validate and attach account
 * Validates Auth0 bearer token and creates/updates user account
 */
async function authMiddleware (req, res, next) {
  try {
    const bearer = req.headers.Authorization || req.headers.authorization
    if (!bearer) {
      return next()
    }

    const userInfo = await Auth0Provider.getUserInfoFromBearerToken(bearer)
    if (!userInfo.id) {
      throw new Error('[MISSING_AUTH0_RULE] Unable to create account: Missing Extend UserInfo rule in Auth0 account')
    }

    req.account = await accountService.getAccount(userInfo)
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  authMiddleware
}
