<template>
  <form @submit.prevent="handleSubmit()">
    <div class="form-group">
      <label for="descrtipion" class="sr-only">Item Needed: </label>
      <input type="text"
             class="form-control bg-primary"
             name="description"
             placeholder="Item Needed"
             v-model="editable.description"
      >
      <label for="quantity" class="sr-only">Amount of Items Needed: </label>
      <input type="number"
             class="form-control bg-primary"
             name="quantity"
             placeholder="1"
             min="1"
             v-model="editable.quantity"
             required
      >
    </div>
    <div class="button-group">
      <button title="Add Supplies" class="btn p-0 pe-2 mt-3 mb-3 text" data-bs-toggle="modal" data-bs-target="#supply-modal">
        <i class="p-0"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M14.3 21.7C13.6 21.9 12.8 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2C13.3 2 14.6 2.3 15.8 2.7L14.2 4.3C13.5 4.1 12.8 4 12 4C7.6 4 4 7.6 4 12S7.6 20 12 20C12.4 20 12.9 20 13.3 19.9C13.5 20.6 13.9 21.2 14.3 21.7M7.9 10.1L6.5 11.5L11 16L21 6L19.6 4.6L11 13.2L7.9 10.1M18 14V17H15V19H18V22H20V19H23V17H20V14H18Z" />
        </svg></i>
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { suppliesService } from '../services/SuppliesService'
import { useRoute } from 'vue-router'
// import { watchEffect } from '@vue/runtime-core'
export default {
//   props: {
//     supplies: { type: Supplies }
//   },
  setup() {
    const route = useRoute()
    const editable = ref({})
    // watchEffect(() => {
    //   editable.value = { ...props.supplies }
    // })
    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await suppliesService.editSupplies(editable.value, route.params.tripId)
            Pop.toast('item has been edited', 'success')
          } else {
            await suppliesService.createSupplies(editable.value, route.params.tripId)
            editable.value = {}
            Pop.toast('Supply item Added', 'success')
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
.text{
  color: #cca363;
}
</style>
