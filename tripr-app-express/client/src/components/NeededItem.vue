<template>
  <v-list-item>
    <template #prepend>
      <v-checkbox-btn
        :model-value="editable.isBringing"
        @update:model-value="isBringing(supply.id)"
      />
    </template>

    <v-list-item-title>
      {{ supply.description }}
    </v-list-item-title>

    <template #append>
      <span style="margin-right: 8px">{{ supply.quantity || 1 }}</span>
      <v-btn
        v-if="account.id === supply.creatorId"
        icon
        color="error"
        @click="removeSupply"
      >
        <i class="mdi mdi-close"></i>
      </v-btn>
    </template>
  </v-list-item>
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
          await suppliesService.editSupplies(
            editable.value,
            route.params.tripId,
            supplyId
          )
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async removeSupply() {
        try {
          const yes = await Pop.confirm(
            'Are you sure you want to remove this supply item?'
          )
          if (!yes) {
            return
          }
          await suppliesService.removeSupply(
            props.supply.id,
            route.params.tripId
          )
          Pop.toast('Supply item has been removed')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>
