import { AppState } from '../AppState'
import { Supplies } from '../Models/Supplies'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SuppliesService {
  async getSupplies(tripId) {
    AppState.currentSupplies = []
    const res = await api.get(`api/trips/${tripId}/supplies`)
    AppState.supplies = res.data.map(s => new Supplies(s))
    // You shouldn't need to get all of the data then filter it on the client - build a server route that handles this if you havev't already. Why do we need the below code?
    AppState.currentSupplies = AppState.supplies.filter(s => s.tripId === tripId)
    logger.log('current supplies', AppState.currentSupplies)
  }

  async gotoTripPage() {
    await router.push({ name: 'Trip' })
  }

  async createSupplies(newSupply, tripId) {
    const res = await api.post(`api/trips/${tripId}/supplies`, newSupply)
    logger.log('created supply', res)
    AppState.supplies.push(new Supplies(res.data))
    this.getSupplies(tripId)
  }

  async editSupplies(supplyData, tripId, suppliesId) {
    const res = await api.put(`api/trips/${tripId}/supplies/${suppliesId}`, supplyData)
    logger.log('edit supply', res.data)
    this.getSupplies(tripId)
  }

  async removeSupply(supplyId, tripId) {
    const res = await api.delete(`api/trips/${tripId}/supplies/` + supplyId)
    logger.log('remove supply item', res.data)
    AppState.supplies = AppState.supplies.filter(s => s.id !== supplyId)
    AppState.currentSupplies = AppState.currentSupplies.filter(cs => cs.id !== supplyId)
  }
}

export const suppliesService = new SuppliesService()
