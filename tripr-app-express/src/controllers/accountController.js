const express = require('express')
const { Auth0Provider } = require('@bcwdev/auth0provider')
const { accountService } = require('../services/AccountService')
const { trackedTripService } = require('../services/TrackedTripService')

const router = express.Router()

// Apply Auth0 middleware to all routes
router.use(Auth0Provider.getAuthorizedUserInfo)

/**
 * GET /account
 * Get authenticated user account
 */
router.get('', async (req, res, next) => {
  try {
    const account = await accountService.getAccount(req.userInfo)
    res.send(account)
  } catch (error) {
    next(error)
  }
})

/**
 * GET /account/trackedtrips
 * Get all tracked trips for authenticated user
 */
router.get('/trackedtrips', async (req, res, next) => {
  try {
    const trips = await trackedTripService.getMyTrackedTrips(req.userInfo.id)
    res.send(trips)
  } catch (error) {
    next(error)
  }
})

/**
 * DELETE /account/trackedtrips/:trackedTripID
 * Delete a tracked trip
 */
router.delete('/trackedtrips/:trackedTripID', async (req, res, next) => {
  try {
    const trip = await trackedTripService.deleteTrackedTrip(req.params.trackedTripID, req.userInfo.id)
    res.send(trip)
  } catch (error) {
    next(error)
  }
})

/**
 * PUT /account
 * Update authenticated user profile
 */
router.put('', async (req, res, next) => {
  try {
    const profile = await accountService.editProfile(req.userInfo.id, req.body)
    res.send(profile)
  } catch (error) {
    next(error)
  }
})

module.exports = router
