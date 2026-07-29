const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TripMapSource = new Schema({
  type: { type: String, default: 'geojson' },
  data: { type: Object },
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip' }
})

module.exports = {
  TripMapSource
}
