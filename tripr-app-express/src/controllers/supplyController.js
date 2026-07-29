const express = require('express')
const { Auth0Provider } = require('@bcwdev/auth0provider')
const { suppliesService } = require('../services/SuppliesService')

const router = express.Router({ mergeParams: true })

// Apply Auth0 middleware to all routes
router.use(Auth0Provider.getAuthorizedUserInfo)

/**
 * GET /trips/:tripId/supplies
 * Get all supplies for a trip
 */
router.get('', async (req, res, next) => {
  try {
    const supply = await suppliesService.getSupplies(req.query)
    res.send(supply)
  } catch (error) {
    next(error)
  }
})

/**
 * GET /trips/:tripId/supplies/:suppliesId
 * Get single supply by ID
 */
router.get('/:suppliesId', async (req, res, next) => {
  try {
    const supply = await suppliesService.getSupplyById(req.params.suppliesId)
    res.send(supply)
  } catch (error) {
    next(error)
  }
})

/**
 * POST /trips/:tripId/supplies
 * Create a new supply item
 */
router.post('', async (req, res, next) => {
  try {
    req.body.creatorId = req.userInfo.id
    req.body.tripId = req.params.tripId
    const supply = await suppliesService.createSupplies(req.body)
    res.send(supply)
  } catch (error) {
    next(error)
  }
})

/**
 * PUT /trips/:tripId/supplies/:suppliesId
 * Update a supply item
 */
router.put('/:suppliesId', async (req, res, next) => {
  try {
    // NOTE setting assignedId on server side?
    if (req.body.isBringing) {
      req.body.assignedId = req.userInfo.id
    } else {
      req.body.assignedId = undefined
    }
    const supply = await suppliesService.editSupplies(req.params.suppliesId, req.userInfo.id, req.body)
    res.send(supply)
  } catch (error) {
    next(error)
  }
})

/**
 * DELETE /trips/:tripId/supplies/:suppliesId
 * Delete a supply item
 */
router.delete('/:suppliesId', async (req, res, next) => {
  try {
    const supply = await suppliesService.removeSupplies(req.params.suppliesId, req.userInfo.id)
    res.send(supply)
  } catch (error) {
    next(error)
  }
})

module.exports = router
