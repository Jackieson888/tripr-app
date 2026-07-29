const express = require('express')
const { Auth0Provider } = require('@bcwdev/auth0provider')
const { routeDetailsService } = require('../services/RouteDetailsService')

const router = express.Router({ mergeParams: true })

// Apply Auth0 middleware to all routes
router.use(Auth0Provider.getAuthorizedUserInfo)

/**
 * GET /trips/:tripId/routes
 * Get all route details for a trip
 */
router.get('', async (req, res, next) => {
  try {
    const route = await routeDetailsService.getRouteDetails()
    res.send(route)
  } catch (error) {
    next(error)
  }
})

/**
 * GET /trips/:tripId/routes/:id
 * Get single route detail by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const route = await routeDetailsService.getRouteById(req.params.id)
    res.send(route)
  } catch (error) {
    next(error)
  }
})

/**
 * POST /trips/:tripId/routes
 * Create a new route detail
 */
router.post('', async (req, res, next) => {
  try {
    req.body.creatorId = req.userInfo.id
    req.body.tripId = req.params.tripId
    const route = await routeDetailsService.createRouteDeatils(req.body)
    res.send(route)
  } catch (error) {
    next(error)
  }
})

/**
 * PUT /trips/:tripId/routes/:id
 * Update a route detail
 */
router.put('/:id', async (req, res, next) => {
  try {
    const route = await routeDetailsService.editRouteDetails(req.params.id, req.body)
    res.send(route)
  } catch (error) {
    next(error)
  }
})

/**
 * DELETE /trips/:tripId/routes/:id
 * Delete a route detail
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const route = await routeDetailsService.removeRouteDetails(req.params.id)
    res.send(route)
  } catch (error) {
    next(error)
  }
})

module.exports = router
