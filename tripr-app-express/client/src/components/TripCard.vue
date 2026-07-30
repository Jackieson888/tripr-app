<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        {{ trip.trip.title }} -
        {{ new Date(trip.trip.createdAt).toDateString() }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <img
          v-if="trip.trip.tripImgUrl"
          :src="trip.trip.tripImgUrl"
          alt="trip"
          style="max-width: 100%; max-height: 240px; object-fit: cover"
        />
        <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap">
          <v-btn :to="{ name: 'Trip', params: { tripId: trip.trip.id } }">
            Go To Trip
          </v-btn>
          <v-btn
            v-if="account.id === trip.trip.creatorId"
            color="error"
            @click="deleteTrip(trip.id)"
          >
            Delete Trip
          </v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { computed } from '@vue/runtime-core'
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
      async deleteTrip(tripId) {
        try {
          const yes = await Pop.confirm(
            'Are you sure you want to remove this trip?'
          )
          if (!yes) {
            return
          }
          await tripsService.deleteTrip(tripId)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>
