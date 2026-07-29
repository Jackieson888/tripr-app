const express = require('express')
const { Auth0Provider } = require('@bcwdev/auth0provider')
const { trackedTripService } = require('../services/TrackedTripService')

const router = express.Router()

// Apply Auth0 middleware to all routes
router.use(Auth0Provider.getAuthorizedUserInfo)

/**
 * POST /trackedtrips
 * Create a new tracked trip (user joins a trip)
 */
router.post('', async (req, res, next) => {
  try {
    const trackedtrip = await trackedTripService.createTrackedTrip(req.body.jkey, req.userInfo.id)
    res.send(trackedtrip)
  } catch (error) {
    next(error)
  }
})

module.exports = router
