<template>
  <v-card style="margin-bottom: 8px">
    <v-card-text class="d-flex justify-space-between align-center">
      <div class="d-flex align-center" style="gap: 8px">
        <v-avatar size="48">
          <img :src="traveler.creator.picture" alt="traveler" />
        </v-avatar>
        <div>
          <p>
            {{ traveler.creator.name }}
          </p>
          <p>Supplies: {{ travSupp }}</p>
        </div>
      </div>

      <v-btn
        v-if="
          account.id === traveler.accountId ||
            account.id === traveler.trip.creatorId
        "
        color="error"
        @click="removeTraveler(traveler.id)"
      >
        Remove
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { Traveler } from '../Models/Traveler'
import { travelersService } from '../services/TravelersService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
import { router } from '../router'
import { logger } from '../utils/Logger'

export default {
  props: {
    traveler: {
      type: Traveler,
      required: true
    }
  },
  setup(props) {
    return {
      travSupp: computed(
        () =>
          AppState.currentSupplies.filter(
            (s) => s.assignedId === props.traveler.accountId
          ).length
      ),
      account: computed(() => AppState.account),
      async removeTraveler(travelerId) {
        try {
          const yes = await Pop.confirm(
            'Are you sure you want to remove this traveler?'
          )
          if (!yes) {
            return
          }
          const traveler = await AppState.travelers.find(
            (t) => t.id === travelerId
          )
          logger.log('traveler', traveler)
          const trackedTrip = await AppState.trackedtrips.find(
            (f) =>
              f.tripId === traveler.trip.id &&
              f.accountId === traveler.creator.id
          )
          logger.log('trackedTrip', trackedTrip)
          await this.removeBoth(traveler, trackedTrip)
          router.push({ name: 'YourTrips' })
          Pop.toast('Traveler has been removed, and tracker removed')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      removeBoth(traveler, trackedTrip) {
        api.delete(`account/trackedtrips/${trackedTrip.id}`)
        travelersService.removeTraveler(traveler.trip.id, traveler.id)
      }
    }
  }
}
</script>
