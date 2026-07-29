const express = require('express')
const accountRouter = require('../controllers/accountController')
const profileRouter = require('../controllers/profileController')
const tripRouter = require('../controllers/tripController')
const travelerRouter = require('../controllers/travelerController')
const supplyRouter = require('../controllers/supplyController')
const routeDetailRouter = require('../controllers/routeDetailController')
const trackedTripRouter = require('../controllers/trackedTripController')
const valueRouter = require('../controllers/valueController')

const router = express.Router()

/**
 * Central route registration
 * Mounts all API route routers
 */

// Account routes
router.use('/account', accountRouter)

// Profile routes
router.use('/profiles', profileRouter)

// Trip routes
router.use('/trips', tripRouter)

// Traveler routes (nested under trips)
router.use('/trips/:tripId/travelers', travelerRouter)

// Supply routes (nested under trips)
router.use('/trips/:tripId/supplies', supplyRouter)

// Route detail routes (nested under trips)
router.use('/trips/:tripId/routes', routeDetailRouter)

// Tracked trips routes
router.use('/trackedtrips', trackedTripRouter)

// Values routes
router.use('/values', valueRouter)

module.exports = router
