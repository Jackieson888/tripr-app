<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card text rounded shadow p-0 mt-2 mb-0 Supplies">
          <div class="card-body p-2">
            <span class="d-flex justify-content-between text-center p-0 m-0">
              <label for="isBringing" class="sr-only card-text">Who wants to bring:</label>
              <input type="checkbox"
                     name="isBringing"
                     id="isBringing"
                     class="mt-2"
                     :checked="editable.isBringing"
                     @change="isBringing(supply.id)"
              >
              <p class="card-text m-0">
                {{ supply.description }}
              </p>
              <p class="card-text m-0">
                QTY: {{ supply.quantity }}
              </p>
              <div class="icon d-flex justify-content-end align-content-start p-0" v-if="account.id == supply.creatorId">
                <i class="mdi mdi-close text-danger f-20 selectable" @click="removeSupply()" title="Remove THIS supply item"></i>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { Supplies } from '../Models/Supplies'
import { suppliesService } from '../services/SuppliesService.js'
import { useRoute } from 'vue-router'
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
      currentSupplies: computed(() => AppState.currentSupplies),
      account: computed(() => AppState.account),
      async isBringing(supplyId) {
        try {
          editable.value.isBringing = !editable.value.isBringing
          // NOTE setting assignedId in client side?
          // if (editable.value.isBringing) {
          //   editable.value.assignedId = this.account.id
          // } else { editable.value.assignedId = '' }
          await suppliesService.editSupplies(editable.value, route.params.tripId, supplyId)
          // Pop.toast('item has been assigned', 'success')
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

<style lang="scss" scoped>
.Supplies{
  background-color: #e7debe;
  border: 3px dashed #C5C5C5;
  box-shadow: inset 4px 4px 4px rgba(108, 108, 108, 0.25);
  border-radius: 10px;
}
.text{
  color: #353a22;
}

.card-text{
  font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 16px;
}
</style>
