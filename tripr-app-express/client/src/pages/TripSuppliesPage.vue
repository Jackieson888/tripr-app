<template>
  <div class="supplies container-fluid">
    <div class="header row">
      <div class="col-12 d-flex justify-content-between mb-3">
        <div>
          <img @click="toTripPage" class="logo selectable mt-3" title="Go Back to Trip Page" src="../assets/img/circle-logo.png" alt="Tripr Logo">
        </div>
        <div class="title">
          <h1 class="mt-3 me-5 mb-0">
            Supplies
          </h1>
          <!-- TODO add assigned supplies done amount -->
          <p class="d-flex justify-content-end stats">
            {{ assignedSupplies.length }}/{{ currentSupplies.length }}
          </p>
          <svg style="width:36px;height:36px" viewBox="0 0 24 24">
            <path fill="#cca363" d="M14.3 21.7C13.6 21.9 12.8 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2C13.3 2 14.6 2.3 15.8 2.7L14.2 4.3C13.5 4.1 12.8 4 12 4C7.6 4 4 7.6 4 12S7.6 20 12 20C12.4 20 12.9 20 13.3 19.9C13.5 20.6 13.9 21.2 14.3 21.7M7.9 10.1L6.5 11.5L11 16L21 6L19.6 4.6L11 13.2L7.9 10.1M18 14V17H15V19H18V22H20V19H23V17H20V14H18Z" />
          </svg>
        </div>
      </div>
      <div class="input-group mb-3 justify-content-center">
        <div class="bg-body input-outline p-1 w-100">
          <div class="border-stitch d-flex">
            <input type="text"
                   v-model="editable.description"
                   class="form-control supply-input bg-body px-3"
                   placeholder="Add Supply Item.."
                   aria-label="Supply Item"
                   aria-describedby="button-addon2"
                   required
                   minlength="1"
            >
            <button @click="addSupplyItem" class="bg-primary mdi mdi-plus add" type="button" id="button-addon2">
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="need row justify-content-center">
      <div class="col-12 text-center mt-3">
        <h2>Need</h2>
      </div>
      <div class="col-11 bg-body item px-1 mb-4" v-for="s in currentSupplies" :key="s.id">
        <NeededItem :supply="s" />
      </div>
    </div>
    <div class="assigned row justify-content-center">
      <div class="col-12 text-center mt-3">
        <h2>Assigned</h2>
      </div>
      <div class="col-11 bg-body item px-1 mb-4" v-for="a in assignedSupplies" :key="a.id">
        <div class="border-stitch d-flex justify-content-between align-items-center text-secondary">
          <h6 class="ps-2 mt-1 text-grey darken-30">
            {{ a.assigned.name }}
          </h6>
          <p class="mt-3 f-20">
            {{ a.description }}
          </p>
          <h6 class="pe-3 mt-2 text-grey darken-15">
            {{ a.quantity || 1 }}
          </h6>
        </div>
      </div>
    </div>
  </div>

  <!-- TODO take a look during hack-a-ton to determine a final choice -->
  <!-- <header>
    <div class="border-top top"></div>
  </header>
  <div class="supplies container-fluid px-0">
    <div class="row">
      <div class="col-4 p-0 ps-3">
        <img class="logo selectable m-2" src="../assets/img/circle-logo.png" alt="Tripr Logo" @click="toTripPage()">
      </div>
      <div class="col-8 p-0 pe-3 d-flex align-items-start justify-content-end text-center mt-2">
        <h1>
          Supplies
        </h1>
        <button title="Add Supplies" class="btn text p-0 px-1 mt-3 " data-bs-toggle="modal" data-bs-target="#supply-modal">
          <i><svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M14.3 21.7C13.6 21.9 12.8 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2C13.3 2 14.6 2.3 15.8 2.7L14.2 4.3C13.5 4.1 12.8 4 12 4C7.6 4 4 7.6 4 12S7.6 20 12 20C12.4 20 12.9 20 13.3 19.9C13.5 20.6 13.9 21.2 14.3 21.7M7.9 10.1L6.5 11.5L11 16L21 6L19.6 4.6L11 13.2L7.9 10.1M18 14V17H15V19H18V22H20V19H23V17H20V14H18Z" />
          </svg></i>
        </button>
      </div>
    </div>
    <div>
      <h1 class="text-center border-top m-0">
        Need
      </h1>
      <div v-for="s in currentSupplies" :key="s.id" :supply="s" class="row px-2">
        <SuppliesList v-if="!s.isBringing" :key="s.id" :supply="s" />
      </div>
      <h1 class="mt-3 text-center border-top">
        Assigned
      </h1>
      <div v-for="s in currentSupplies" :key="s.id" :supply="s" class="row px-2">
        <SuppliesList v-if="s.isBringing" :key="s.id" :supply="s" />
      </div>
    </div>
  </div>
  <footer>
    <div class="border-bottom"></div>
  </footer>

  <Modal id="supply-modal">
    <template #modal-title>
      <h3>Supplies</h3>
    </template>
    <template #modal-body>
      <SuppliesForm />
    </template>
  </Modal> -->
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { suppliesService } from '../services/SuppliesService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { Supplies } from '../Models/Supplies'
export default {
  props: {
    supply: {
      type: Supplies,
      default: () => new Supplies()
      // required: true
    }
  },
  setup() {
    const editable = ref({})
    const route = useRoute()
    onMounted(async() => {
      try {
        await suppliesService.getSupplies(route.params.tripId)
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      editable,
      currentSupplies: computed(() => AppState.currentSupplies.filter(s => s.isBringing === false || s.assignedId === AppState.account.id)),
      assignedSupplies: computed(() => AppState.currentSupplies.filter(s => s.isBringing === true)),
      account: computed(() => AppState.account),
      async addSupplyItem() {
        try {
          await suppliesService.createSupplies(editable.value, route.params.tripId)
          editable.value = {}
          Pop.toast('Supply Item Added', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async toTripPage() {
        try {
          await suppliesService.gotoTripPage()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async addToAssigned() {
        try {
          await suppliesService.editSupplies()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-family: museo-slab,serif;
}
svg {
  position: absolute;
  top: 50px;
  right: 35px;
}
h1 {
  font-size: 2.5rem;
}
h2 {
  font-family: museo-slab;
  font-size: 2rem;
}
h6 {
  font-weight: bold;
}
.supply-input {
  border-radius: 10px;
}
.logo {
  width: 20vw;
  filter: drop-shadow(2px 0 4px rgba(0, 0, 0, 0.25));
}
.stats {
  margin-top: -1vh;
  margin-right: 16vw;
  color: #a9b37f;
  font-weight: bold;
}
.item {
  border-radius: 10px;
  font-family: museo-slab,serif;
}
.row {
  border-bottom: 3px solid #e7d3b3;
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.5);
}
.text{
  font-family: Museo Slab;
  font-style: normal;
  font-weight: normal;
  color: #cca363;
}
.border-stitch {
  border: 2px dashed #b5af98;
  border-radius: 10px;
  margin: 3px 0;
}
.text-center{
  font-family: Museo Slab;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
}
.assigned {
  max-height: 30vh;
  overflow-y: scroll;
}
.need {
  max-height: 45vh;
  overflow-y: scroll;
}
.supplies{
  background-color: #6d7746;
  height: 100vh;
  color: #cca363;
}

.border-top{
  border-color: #b5af98;
  width: vw100;
}
.add {
  color: #e7d3b3;
  font-size: 2rem;
  border-radius: 10px 10px 10px 0;
  border: none;
  margin: .25rem;
}
.top{
  border-color: #e7d3b3;
  height: 10px;
}
.input-outline {
  border-radius: 10px;
}
.border-bottom{
  border-color: #e7d3b3;
  height: 10px;
}
</style>
