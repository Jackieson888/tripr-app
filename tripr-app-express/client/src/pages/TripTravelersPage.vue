<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <h1>Travelers</h1>
        <v-btn @click="toTripPage">
          Back To Trip
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <Traveler v-for="t in travelers" :key="t.id" :traveler="t" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { travelersService } from '../services/TravelersService'
import { useRoute } from 'vue-router'
import { suppliesService } from '../services/SuppliesService'
import Pop from '../utils/Pop'

export default {
  setup() {
    const route = useRoute()

    onMounted(async() => {
      AppState.currentTripId = route.params.tripId
      await travelersService.getAllTravelers(route.params.tripId)
    })

    return {
      travelers: computed(() => AppState.currTravelers),
      async toTripPage() {
        try {
          await suppliesService.gotoTripPage()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>
