const mongoose = require('mongoose')
const { AccountSchema, ProfileSchema } = require('./Account')
const { TripSchema } = require('./Trip')
const { TravelerSchema } = require('./Traveler')
const { SuppliesSchema } = require('./Supplies')
const { ValueSchema } = require('./Value')
const { RouteDetailSchema } = require('./RouteDetail')
const { TrackedTripSchema } = require('./TrackedTrip')
const { TripMapSource } = require('./TripMapSource')

/**
 * Central database context for all models
 * Provides singleton instances of all Mongoose models
 */
class DbContext {
  constructor () {
    this.Values = mongoose.model('Value', ValueSchema)
    this.Account = mongoose.model('Account', AccountSchema)
    this.Profiles = mongoose.model('Profile', ProfileSchema, 'accounts')
    this.Traveler = mongoose.model('Traveler', TravelerSchema)
    this.Trip = mongoose.model('Trip', TripSchema)
    this.Supplies = mongoose.model('Supplies', SuppliesSchema)
    this.RouteDetail = mongoose.model('RouteDetail', RouteDetailSchema)
    this.TrackedTrip = mongoose.model('TrackedTrip', TrackedTripSchema)
    this.TripMapSource = mongoose.model('TripMapSource', TripMapSource)
  }
}

// Ensure all models are registered (even if not used immediately)
// This prevents errors when trying to use models that haven't been referenced
function initializeModels () {
  // Models are created in DbContext constructor
  return dbContext
}

// Create and export singleton instance
const dbContext = new DbContext()

module.exports = {
  dbContext,
  DbContext,
  initializeModels,
  // Also export individual schemas for reference
  AccountSchema,
  ProfileSchema,
  TripSchema,
  TravelerSchema,
  SuppliesSchema,
  ValueSchema,
  RouteDetailSchema,
  TrackedTripSchema,
  TripMapSource
}
