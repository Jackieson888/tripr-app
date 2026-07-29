const express = require('express')
const { Auth0Provider } = require('@bcwdev/auth0provider')

const router = express.Router()

/**
 * GET /values
 * Get all values (public endpoint)
 */
router.get('', async (req, res, next) => {
  try {
    return res.send(['value1', 'value2'])
  } catch (error) {
    next(error)
  }
})

// Apply Auth0 middleware to routes beyond this point
router.use(Auth0Provider.getAuthorizedUserInfo)

/**
 * POST /values
 * Create a new value (requires authentication)
 */
router.post('', async (req, res, next) => {
  try {
    // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
    req.body.creatorId = req.userInfo.id
    res.send(req.body)
  } catch (error) {
    next(error)
  }
})

module.exports = router
