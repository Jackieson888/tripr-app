<template>
  <form @submit.prevent="joinTrip()">
    <div class="row d-flex px-2">
      <div class="form-group bord">
        <label for="tripCode"></label>
        <input class="bg-primary w-100 p-4 fs-2 font" placeholder="Trip Code.." name="tripCode" type="text" v-model="editable.jkey">
      </div>
      <div class="row d-flex justify-content-center align-content-center">
        <button class="bg-primary joinbord p-3 w-50 mt-3 fs-2 font text-secondary">
          Join
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { tripsService } from '../services/TripsService'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async joinTrip() {
        try {
          await tripsService.checkIfTrip(editable.value.jkey)
          const modal = Modal.getInstance(document.getElementById('join-modal'))
          modal.hide()
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-shadow {
  border-radius: 3px;
  padding: .15rem 1rem;
  border: 3px dashed rgba(255,255,255,0.5);
  color: #A28558;
  text-shadow: 0px 2px 2px rgba(255,255,255,0.5);
}

.bord{
  border-color: rgb(44, 44, 44, 0.25);
  border-style: dashed;
  border-radius: 10px;
  padding: .3rem;}

  .joinbord{
  border-color: #d3d1c8;
  border-style: dashed;
  border-radius: 10px;
  border-width: 3px;
  }

  .font{
    font-family: Museo Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 43px;
  text-align: center;
  }
</style>
