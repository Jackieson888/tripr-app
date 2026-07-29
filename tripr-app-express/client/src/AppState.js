import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  currentTrip: {},
  trips: [],
  currenttrip: [],
  currentTripId: null,
  assignSupplies: [],
  currentSupplies: [],
  supplies: [],
  supply: null,
  routeDetails: [],
  travelers: [],
  currTravelers: [],
  trackedtrips: [],
  profile: null,
  mytrips: [],
  tripMapSource: {},
  tripStartSource: {},
  startingLocation: null,
  startingImg: ''

})
