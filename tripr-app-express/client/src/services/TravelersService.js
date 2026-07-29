import { AppState } from '../AppState'
import { Traveler } from '../Models/Traveler'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TravelersService {
  async getAllTravelers(tripId) {
    try {
      const res = await api.get(`api/trips/${tripId}/travelers`)
      AppState.travelers = []
      AppState.travelers = res.data.map(t => new Traveler(t))
      AppState.currTravelers = AppState.travelers.filter(t => t.tripId === tripId)
      logger.log('travelers', AppState.travelers)
      logger.log('curent travelers', AppState.currTravelers)
      logger.log('currId', AppState.currentTripId)
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async getTravelerById(tripId, travelerId) {
    const res = await api.get(`api/trips/${tripId}/travelers/${travelerId}`)
    logger.log('this be the trav data', res)
    return res.data
  }

  async createTraveler(tripId, travelerData) {
    try {
      const res = await api.post(`api/trips/${tripId}/travelers`, travelerData)
      AppState.travelers.push(new Traveler(res.data))
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async removeTraveler(tripId, travelerId) {
    try {
      const res = await api.delete(`api/trips/${tripId}/travelers/${travelerId}`)
      const foundItem = AppState.travelers.find(t => t.id === travelerId)
      if (!foundItem) {
        throw new Error("Can't find Traveler")
      }
      AppState.travelers = AppState.travelers.filter(t => t.id !== travelerId)
      logger.log('what is the deleted res?', res.data)
    } catch (error) {
      logger.log('What Happened?', error)
    }
    this.getAllTravelers(tripId)
  }
}

export const travelersService = new TravelersService()
