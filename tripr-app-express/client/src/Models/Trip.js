export class Trip {
  constructor(tripData) {
    this.jkey = tripData.jkey
    this.id = tripData.id
    this.title = tripData.title
    this.creatorId = tripData.creatorId
    this.description = tripData.description
    this.geo = tripData.geo || {}
    this.travelType = tripData.travelType
    this.startDate = tripData.startDate
    this.creator = tripData.creator
    this.travelers = tripData.travelers
    this.tripImgUrl = tripData.tripImgUrl
    this.tripLine = tripData.tripLine
  }
}
