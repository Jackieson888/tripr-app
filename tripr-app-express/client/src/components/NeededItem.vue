<template>
  <div class="d-flex justify-content-between align-items-center border-stitch">
    <div class="d-flex align-items-center">
      <input @change="isBringing(supply.id)"
             :checked="editable.isBringing"
             type="checkbox"
             class="btn-check"
             :id="supply.id"
      >
      <label class="ps-2" :for="supply.id"><i v-if="supply.isBringing && supply.assignedId === account.id" class="mdi text-secondary f-28 mdi-check-circle"></i><i v-else class="mdi text-grey f-30 mdi-check-circle-outline"></i></label>
      <h6 class="p-2 mt-2 text-grey darken-15 f-24">
        {{ supply.description }}
      </h6>
    </div>
    <div>
      <h6 class="pe-3 mt-2 f-20 text-grey darken-40">
        {{ supply.quantity || 1 }}
      </h6>
    </div>
    <div class="icon px-2" v-if="account.id == supply.creatorId">
      <i class="mdi mdi-close text-danger f-20 selectable" @click="removeSupply()" title="Remove THIS supply item"></i>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { Supplies } from '../Models/Supplies'
import { useRoute } from 'vue-router'
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { suppliesService } from '../services/SuppliesService'
import Pop from '../utils/Pop'
export default {
  props: {
    supply: {
      type: Supplies,
      default: () => new Supplies(),
      required: true
    }
  },
  setup(props) {
    const editable = ref({})
    const route = useRoute()
    watchEffect(() => {
      editable.value = { ...props.supply }
    })
    return {
      editable,
      account: computed(() => AppState.account),
      async isBringing(supplyId) {
        try {
          editable.value.isBringing = !editable.value.isBringing
          await suppliesService.editSupplies(editable.value, route.params.tripId, supplyId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async removeSupply() {
        try {
          const yes = await Pop.confirm('are you sure <b>you</b> want to remove this <em>Supply Item</em>?')
          if (!yes) { return }
          await suppliesService.removeSupply(props.supply.id, route.params.tripId)
          Pop.toast('Suppy Item has been removed')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }

}
</script>

<style>

</style>
