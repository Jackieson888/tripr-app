export class RouteDetail {
  constructor(routeData) {
    this.description = routeData.description
    this.location = routeData.location
    this.tripId = routeData.tripId
    this.creatorId = routeData.creatorId
    this.creator = routeData.creator
  }
}
