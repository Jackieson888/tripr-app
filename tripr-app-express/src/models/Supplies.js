const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SuppliesSchema = new Schema({
  description: { type: String, required: true },
  isBringing: { type: Boolean, default: false },
  quantity: { type: Number, min: 1 },
  tripId: { type: Schema.Types.ObjectId, required: true, ref: 'Trip' },
  assignedId: { type: Schema.Types.ObjectId, ref: 'Account' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  travlerId: { type: Schema.Types.ObjectId, ref: 'Traveler' }
}, { timestamps: true, toJSON: { virtuals: true } })

SuppliesSchema.virtual('trip', {
  localField: 'tripId',
  foreignField: '_id',
  ref: 'Trip',
  justOne: true
})

SuppliesSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

SuppliesSchema.virtual('traveler', {
  localField: 'travelerId',
  foreignField: '_id',
  ref: 'Traveler',
  justOne: true
})

SuppliesSchema.virtual('assigned', {
  localField: 'assignedId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

module.exports = {
  SuppliesSchema
}
