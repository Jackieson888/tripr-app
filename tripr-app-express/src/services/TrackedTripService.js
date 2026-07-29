const { dbContext } = require('../models')
const { BadRequest, Forbidden } = require('../utils/errors')

class TrackedTripService {
  async getTripByJkey (jkey) {
    const trip = await dbContext.Trip.findOne({ jkey: jkey })
    if (!trip) {
      throw new BadRequest('invalid trip')
    }
    return trip
  }

  async deleteTrackedTrip (tripId, userId) {
    const trip = await dbContext.TrackedTrip.findById(tripId)
    if (userId !== trip.accountId.toString()) {
      throw new Forbidden('you cant do that, idk why')
    }
    await trip.deleteOne()
    return trip
  }

  async createTrackedTrip (jkey, userId) {
    const trip = await this.getTripByJkey(jkey)
    // TODO can anyone just join???
    // TODO check if the user is already going on the trip
    const found = await dbContext.TrackedTrip.findOne({ accountId: userId, tripId: trip.id })
    if (found) {
      throw new BadRequest('you tracked this trip already')
    }
    const trackedtrip = await dbContext.TrackedTrip.create({ accountId: userId, tripId: trip.id })
    // await this.getTripById(trackedtrip.id)
    await trackedtrip.populate('traveler')
    await trackedtrip.populate('trip')
    return trackedtrip
  }

  async getMyTrackedTrips (accountId) {
    const trips = await dbContext.TrackedTrip.find({ accountId: accountId }).populate('trip')
    return trips
  }
}

const trackedTripService = new TrackedTripService()

module.exports = {
  trackedTripService,
  TrackedTripService
}
