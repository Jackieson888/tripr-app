const express = require('express')
const { Auth0Provider } = require('@bcwdev/auth0provider')
const { tripsService } = require('../services/TripsService')

const router = express.Router()

// Apply Auth0 middleware to all routes
router.use(Auth0Provider.getAuthorizedUserInfo)

/**
 * GET /trips
 * Get all trips with optional filters
 */
router.get('', async (req, res, next) => {
  try {
    const trips = await tripsService.getTrips(req.query)
    res.send(trips)
  } catch (error) {
    next(error)
  }
})

/**
 * POST /trips
 * Create a new trip
 */
router.post('', async (req, res, next) => {
  const jkey = Math.random().toString(36).slice(-5)
  try {
    req.body.jkey = jkey.toUpperCase()
    req.body.creatorId = req.userInfo.id
    const trip = await tripsService.createTrip(req.body)
    res.send(trip)
  } catch (error) {
    next(error)
  }
})

/**
 * GET /trips/:tripId
 * Get single trip by ID
 */
router.get('/:tripId', async (req, res, next) => {
  try {
    const trip = await tripsService.getTripById(req.params.tripId)
    res.send(trip)
  } catch (error) {
    next(error)
  }
})

/**
 * PUT /trips/:tripId
 * Update a trip
 */
router.put('/:tripId', async (req, res, next) => {
  try {
    const trip = await tripsService.editTrip(req.params.tripId, req.userInfo.id, req.body)
    res.send(trip)
  } catch (error) {
    next(error)
  }
})

/**
 * DELETE /trips/:tripId
 * Delete a trip
 */
router.delete('/:tripId', async (req, res, next) => {
  try {
    const trip = await tripsService.removeTrip(req.params.tripId, req.userInfo.id)
    res.send(trip)
  } catch (error) {
    next(error)
  }
})

module.exports = router
