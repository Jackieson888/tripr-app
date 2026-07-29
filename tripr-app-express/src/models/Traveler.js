const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TravelerSchema = new Schema(
  {
    tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TravelerSchema.virtual('creator', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TravelerSchema.virtual('trip', {
  localField: 'tripId',
  foreignField: '_id',
  justOne: true,
  ref: 'Trip'
})

module.exports = {
  TravelerSchema
}
