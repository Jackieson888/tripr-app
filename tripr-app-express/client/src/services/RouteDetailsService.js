import { AppState } from '../AppState'
import { RouteDetail } from '../Models/RouteDetail'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class RouteDetailsService {
  async getAllRouteDeatils(tripId) {
    try {
      const res = await api.get(`api/trips/${tripId}/routes`)
      AppState.routeDetails = []
      AppState.routeDetails = res.data.map(r => new RouteDetail(r))
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async getRouteById(tripId, routeId) {
    try {
      const res = await api.get(`api/trips/${tripId}/routes/${routeId}`)
      AppState.routeDetails.find({ routeId })
      logger.log('whats the foundId res', res)
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async editRouteDeatils(tripId, routeId, routeData) {
    try {
      const res = await api.put(`api/trips/${tripId}/routes/${routeId}`, routeData)
      const routeIndex = AppState.routeDetails.findIndex({ routeId })
      AppState.routeDetails[routeIndex] = new RouteDetail(res.data)
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async createRouteDeatils(tripId, routeData) {
    try {
      const res = await api.post(`api/trips/${tripId}/routes`, routeData)
      AppState.routeDetails.push(new RouteDetail(res.data))
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }

  async removeRouteDetails(tripId, routeId) {
    try {
      const res = await api.delete(`api/trips/${tripId}/routes/${routeId}`)
      const foundIndex = AppState.routeDetails.findIndex({ routeId })
      AppState.routeDetails.splice(foundIndex, 1)
      logger.log('whats the deleted res?', res)
    } catch (error) {
      logger.log('What Happened?', error)
    }
  }
}

export const routeDetailsService = new RouteDetailsService()
