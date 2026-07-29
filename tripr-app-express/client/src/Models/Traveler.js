export class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id
    this.tripId = travelerData.tripId
    this.accountId = travelerData.accountId
    this.creator = travelerData.creator
    this.trip = travelerData.trip
  }
}
