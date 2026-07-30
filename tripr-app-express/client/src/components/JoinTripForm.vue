<template>
  <v-form @submit.prevent="joinTrip">
    <v-text-field v-model="editable.jkey" label="Trip Code" required />
    <v-btn type="submit" color="primary">
      Join
    </v-btn>
  </v-form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { tripsService } from '../services/TripsService'

export default {
  emits: ['success'],
  setup(props, { emit }) {
    const editable = ref({})
    return {
      editable,
      async joinTrip() {
        try {
          await tripsService.checkIfTrip(editable.value.jkey)
          emit('success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>
