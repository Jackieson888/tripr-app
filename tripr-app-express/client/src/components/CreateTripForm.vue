<template>
  <form @submit.prevent="handleSubmit()">
    <div class="form-group">
      <label for="title" class="sr-only">Trip Name:</label>
      <input type="text"
             class="form-control bg-primary"
             name="title"
             id="title"
             placeholder="Max: 15"
             maxlength="15"
             v-model="editable.title"
             required
      >
      <!-- <label for="description" class="sr-only">Trip Description:</label>
      <input type="text"
             class="form-control bg-primary"
             name="description"
             id="descrition"
             placeholder="For Da Boi's"
             v-model="editable.description"
      > -->
      <label for="location" class="sr-only">Where are you starting:</label>
      <input type="number"
             class="form-control bg-primary"
             name="location"
             id="location"
             placeholder="For Da Boi's"
             v-model="editable.location"
      >
      <!-- <label for="startDate" class="sr-only">How long is the Trip:</label>
      <input type="date"
             class="form-control bg-primary"
             name="startDate"
             id="startDate"
             placeholder="Start Today"
             v-model="editable.startDate"
      > -->
    </div>
    <div class="button-group">
      <button type="submit" class="btn" title="Create a Trip" data-bs-dismiss="modal" aria-label="Close">
        <i class="mdi mdi-plus f-16" title="Create a Trip"></i>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { tripsService } from '../services/TripsService'
import Pop from '../utils/Pop'
export default {
//   props: {
//     trip: { type: Trip }
//   },
  setup(props) {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...props.trip }
    })
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await tripsService.editTrip(editable.value)
            Pop.toast('Trip has been adjusted', 'success')
          } else {
            await tripsService.createTrip(editable.value)
            Pop.toast('Trip has been Planned', 'success')
            editable.value = {}
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
