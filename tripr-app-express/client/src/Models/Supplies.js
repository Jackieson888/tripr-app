export class Supplies {
  constructor(supplyData = {}) {
    this.description = supplyData.description
    this.quantity = supplyData.quantity
    this.isBringing = supplyData.isBringing
    this.tripId = supplyData.tripId
    this.assigned = supplyData.assigned
    this.assignedId = supplyData.assignedId
    this.id = supplyData.id
    this.creatorId = supplyData.creatorId
    this.creator = supplyData.creator || {}
  }
}
