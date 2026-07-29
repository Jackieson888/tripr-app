const { Auth0Provider } = require('@bcwdev/auth0provider')
const { accountService } = require('../services/AccountService')

/**
 * Middleware to validate and create account from Auth0 bearer token
 * Attaches account to req.account if authenticated
 */
async function AccountValidator (req, res, next) {
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
  AccountValidator
}
