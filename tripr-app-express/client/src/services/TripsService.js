import { AppState } from '../AppState'
import { TrackedTrip } from '../Models/TrackedTrip'
import { Trip } from '../Models/Trip'
import { router } from '../router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { api } from './AxiosService'
import { travelersService } from './TravelersService'

class TripsService {
  async editTrip(tripId, tripData) {
    const res = await api.put(`api/trips/${tripId}`, tripData)
    // AppState.trips = new Trip(res.data)
    this.setCurrentTrip(tripId)
    logger.log('this is the edited trip', res)
  }

  async createTrip(newTrip) {
    const res = await api.post('api/trips', newTrip)
    logger.log('new trip', res.data)
    AppState.trips.push(new Trip(res.data))
    AppState.currentTripId = res.data.id.toString()
    router.push({ name: 'Trip', params: { tripId: res.data.id } })
    this.checkIfTrip(res.data.jkey)
  }

  async checkIfTrip(jkey) {
    const res = await api.get('api/trips?jkey=' + jkey.toUpperCase())
    // not a client side concern
    if (!res.data) {
      return Pop.toast('not a valid trip')
    }
    // we have a trip
    const trip = res.data
    if (trip) {
      const res = await api.post('api/trackedtrips', { jkey })
      AppState.trackedtrips.push(new TrackedTrip(res.data))
      const travData = {}
      travelersService.createTraveler(res.data.tripId, travData)
      logger.log('new trackedtrip', res)
      Pop.toast('You joined a trip!', 'success')
    } else {
      Pop.toast('Sorry no trip found', 'error')
    }
  }

  async setCurrentTrip(tripID) {
    const res = await api.get('api/trips/' + tripID)
    AppState.currentTrip = new Trip(res.data)
    AppState.tripMapSource = res.data.geo
  }

  async getAllTrips() {
    const res = await api.get('api/trips')
    AppState.trips = res.data.map(t => new Trip(t))
    logger.log('all trips', AppState.trips)
  }

  async getAllMyTrackedTrips() {
    const res = await api.get('account/trackedtrips')
    AppState.mytrips = res.data.map(t => new TrackedTrip(t))
    logger.log(AppState.mytrips)
  }

  async copyText(tripID) {
    try {
      const found = AppState.trips.find(t => t.id === tripID)
      // adds a value to the clipboard
      navigator.clipboard.writeText(found.jkey)
      Pop.toast('Code Copied', 'success')
    } catch (error) {
      Pop.toast('Cannot Copy', 'error')
    }
  }

  async deleteTrip(tripId) {
    await api.delete(`account/trackedtrips/${tripId}`)
    const newlist = AppState.mytrips.filter(t => t.id !== tripId)
    AppState.mytrips = newlist
    logger.log('heres the new appstate', AppState.mytrips)
  }

  async updateScreenShot(tripId, tripData) {
    const res = await api.put(`api/trips/${tripId}`, tripData)
    this.getAllTrips()
    this.getAllMyTrackedTrips()
    AppState.currentTrip = new Trip(res.data)
    logger.log('Updated ScreenShot ', res)
  }
}
export const tripsService = new TripsService()
