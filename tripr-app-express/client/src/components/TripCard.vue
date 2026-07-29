<template>
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button ps-1 bg-primary collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="'#flush-' + trip.id"
              aria-expanded="false"
              :aria-controls="'flush-' + trip.id"
      >
        <div class="col-12 d-flex justify-content-center">
          <div class="trip-card align-items-center">
            <div class="trip-border-2 d-flex justify-content-between">
              <h6 class="d-flex align-items-center">
                {{ trip.trip.title }}
              </h6>
              <div class="d-flex align-items-center">
                <p class="body-color m-0">
                  {{ new Date(trip.trip.createdAt).toDateString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </h2>
    <div :id="'flush-' + trip.id" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body rounded-10">
        <img :src="trip.trip.tripImgUrl" class="map" />
        <div class="d-flex justify-content-between">
          <div class="bg-primary go-to-wrapper text-center shadow-sm py-1 mt-2">
            <router-link :to="{ name: 'Trip', params: { tripId: trip.trip.id } }">
              <button class="btn bordr m-0 text">
                Go to Trip
              </button>
            </router-link>
          </div>
          <div v-if="account.id === trip.trip.creatorId" class="bg-primary go-to-wrapper text-center shadow-sm py-1 mt-2">
            <button class="btn bordr m-0 text" @click="deleteTrip(trip.id)">
              Delete trip
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
// import { router } from '../router'
import { tripsService } from '../services/TripsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    trip: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async gotToPage(tripId) {
        try {
          await tripsService.goToThePage(tripId)
        } catch (error) {
          Pop.toast(error)
        }
      },
      async deleteTrip(TripId) {
        try {
          const yes = await Pop.confirm('are you sure <b>you</b> want to remove this <em>Trip</em>?')
          if (!yes) { return }
          await tripsService.deleteTrip(TripId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }

    }
  }

}
</script>

<style lang="scss" scoped>
.trip-card {
  box-shadow: 3px 3px 5px #A28558;
}
.trip-border-2 {
  border: 2px dashed #e7debe;
  padding: .5vh 5vw;
  border-radius: 10px;
}
.bordr{
  background-color: #cca363;
  border: 3px dashed #e7debe;
  padding: 5px;
  border-radius: 8px;
  // box-shadow: 3px 3px 5px #A28558;
}
.go-to-wrapper{
  width: 25vw;
  border-radius: 10px;
}
h6 {
  font-weight: 600;
}
p {
  font-size: .85rem;
}
.text{
  font-family: Museo Slab;
font-style: normal;
font-weight: normal;
font-size: 16px;
color: #6e5a3c;
}
.map {
  object-fit: cover;
  width: 80vw;
  height: 80vw;
  border-radius: 10px;
}
.rounded-10 {
  border-radius: 10px;
}
</style>
