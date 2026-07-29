const { dbContext } = require('../models')
const { BadRequest } = require('../utils/errors')

class TravelersService {
  async getTravelerById (id) {
    const res = await dbContext.Traveler.findById(id)
    return res
  }

  async getTravelers () {
    const res = await dbContext.Traveler.find().populate('creator').populate('trip')
    if (!res) {
      throw new BadRequest('No travelers')
    }
    return res
  }

  async addTraveler (body) {
    const res = await dbContext.Traveler.create(body)
    await res.populate('creator')
    await res.populate('trip')
    return res
  }

  async removeTraveler (id) {
    const res = await dbContext.Traveler.findByIdAndDelete(id)
    if (!res) {
      throw new BadRequest('No Traveler by that Id')
    }
    return res
  }
}

const travelersService = new TravelersService()

module.exports = {
  travelersService,
  TravelersService
}
