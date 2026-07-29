const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrackedTripSchema = new Schema({
  tripId: { type: Schema.Types.ObjectId, required: true, ref: 'Trip' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

TrackedTripSchema.virtual('trip', {
  localField: 'tripId',
  foreignField: '_id',
  justOne: true,
  ref: 'Trip'
})

TrackedTripSchema.virtual('traveler', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

module.exports = {
  TrackedTripSchema
}
