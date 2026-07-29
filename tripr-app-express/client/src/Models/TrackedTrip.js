export class TrackedTrip {
  constructor(trackedTripData) {
    this.id = trackedTripData.id
    this.tripId = trackedTripData.tripId
    this.accountId = trackedTripData.accountId
    this.creator = trackedTripData.creator || {}
    this.trip = trackedTripData.trip || {}
  }
}
