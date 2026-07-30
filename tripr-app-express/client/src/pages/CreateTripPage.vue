<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <v-icon icon="$rv-truck"></v-icon>
        <h1>Create Trip</h1>
        <v-btn icon @click="goToAccountPage">
          <i class="mdi mdi-close"></i>
        </v-btn>
      </v-col>
    </v-row>

    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="editable.title"
        label="Trip Name"
        maxlength="15"
        required
      />

      <MapBox class="map" />

      <v-btn type="submit" color="primary" style="margin-top: 12px">
        Save Trip
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { tripsService } from '../services/TripsService'
import Pop from '../utils/Pop'
import { router } from '../router'
import { AppState } from '../AppState'

export default {
  setup(props) {
    const editable = ref({})

    watchEffect(() => {
      editable.value = { ...props.trip }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          const title = (editable.value.title || '').trim()
          if (title.length < 3) {
            Pop.toast('Trip name must be at least 3 characters', 'error')
            return
          }

          const tripData = {
            title,
            description: editable.value.description,
            geo: AppState.tripMapSource,
            tripImgUrl: AppState.startingImg,
            travelType: editable.value.travelType,
            startDate: editable.value.startDate
          }

          if (editable.value.id) {
            await tripsService.editTrip(editable.value.id, tripData)
            Pop.toast('Trip has been adjusted', 'success')
          } else {
            await tripsService.createTrip(tripData)
            Pop.toast('Trip has been planned', 'success')
            editable.value = {}
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      goToAccountPage() {
        router.push({ name: 'Account' })
      }
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  min-height: 300px;
}
</style>
