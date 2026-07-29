const express = require('express')
const { profileService } = require('../services/ProfileService')

const router = express.Router()

/**
 * GET /profiles
 * Get profiles by name search
 */
router.get('', async (req, res, next) => {
  try {
    const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
    res.send(profiles)
  } catch (error) {
    next(error)
  }
})

/**
 * GET /profiles/:id
 * Get single profile by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const profile = await profileService.getProfileById(req.params.id)
    res.send(profile)
  } catch (error) {
    next(error)
  }
})

module.exports = router
