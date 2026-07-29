const express = require('express')
const { Auth0Provider } = require('@bcwdev/auth0provider')
const { travelersService } = require('../services/TravelersService')

const router = express.Router({ mergeParams: true })

// Apply Auth0 middleware to all routes
router.use(Auth0Provider.getAuthorizedUserInfo)

/**
 * GET /trips/:tripId/travelers
 * Get all travelers for a trip
 */
router.get('', async (req, res, next) => {
  try {
    const traveler = await travelersService.getTravelers()
    res.send(traveler)
  } catch (error) {
    next(error)
  }
})

/**
 * GET /trips/:tripId/travelers/:id
 * Get single traveler by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const traveler = await travelersService.getTravelerById(req.params.id)
    res.send(traveler)
  } catch (error) {
    next(error)
  }
})

/**
 * POST /trips/:tripId/travelers
 * Add a traveler to a trip
 */
router.post('', async (req, res, next) => {
  try {
    req.body.accountId = req.userInfo.id
    req.body.tripId = req.params.tripId
    const traveler = await travelersService.addTraveler(req.body)
    res.send(traveler)
  } catch (error) {
    next(error)
  }
})

/**
 * DELETE /trips/:tripId/travelers/:id
 * Remove a traveler from a trip
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const traveler = await travelersService.removeTraveler(req.params.id)
    res.send(traveler)
  } catch (error) {
    next(error)
  }
})

module.exports = router
