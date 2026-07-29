const { dbContext } = require('../models')
const { BadRequest, Forbidden } = require('../utils/errors')

class TripsService {
  async updateGeo (tripId, body) {
    const trip = await this.getTripById(tripId)
    trip.geo = body.geo || trip.geo
    await trip.save()
    return trip
  }

  updatePins (body) {
    throw new Error('Method not implemented.')
  }

  async getTrips (query) {
    const trips = await dbContext.Trip.find(query).select('-geo').populate('creator')
    return trips
  }

  async getTripByJKey (jkey) {
    const trip = await dbContext.Trip.find({ jkey }).populate('creator')
    if (!trip) {
      throw new BadRequest('Invalid Trip Id')
    }
    return trip
  }

  async getTripById (id) {
    const trip = await dbContext.Trip.findById(id).populate('creator')
    if (!trip) {
      throw new BadRequest('Invalid Trip Id')
    }
    return trip
  }

  async createTrip (tripData) {
    const trip = await dbContext.Trip.create(tripData)
    await trip.populate('creator')
    return trip
  }

  async editTrip (tripId, userId, tripData) {
    const trip = await this.getTripById(tripId)
    trip.title = tripData.title || trip.title
    trip.description = tripData.description || trip.description
    trip.geo = tripData.data || trip.geo
    trip.tripImgUrl = tripData.tripImgUrl || trip.tripImgUrl
    trip.travelType = tripData.travelType || trip.travelType
    trip.travelerId = tripData.travelerId || trip.travelerId
    trip.creatorId = tripData.creatorId || trip.creatorId
    await trip.save()
    return trip
  }

  async removeTrip (tripId, userId) {
    const trip = await this.getTripById(tripId)
    if (userId !== trip.creatorId.toString()) {
      throw new Forbidden('you cant do that')
    }
    await trip.delete()
    return trip
  }
}

const tripsService = new TripsService()

module.exports = {
  tripsService,
  TripsService
}
