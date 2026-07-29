<template>
  <div class="container">
    <div class="row">
      <div class="d-flex mt-3 justify-content-between top-bar overlay">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Account' }">
          <div class="profile">
            <img class="profile-bg" src="../assets/img/user-bg.png" alt="">
            <img class="user-icon" src="../assets/img/user-icon_1.png" @click="goToAccountPage()">
          </div>
        </router-link>
        <div>
          <h2 class="trip-title">
            {{ trip.title }}
          </h2>
          <div @click="goToTripRoutes" class="d-flex justify-content-end" id="slide">
            <h4 class="bg-body p-1 px-2 text-primary rounded">
              Route Details
            </h4>
          </div>
        </div>
      </div>
      <img :src="trip.tripImgUrl" class="map" />
    </div>
    <div class="row">
      <div class="bottom travelers p-0">
        <img class="selectable t-height" src="../assets/img/traveler-bg(updated).png" alt="">
      </div>
      <div class="bottom supplies p-0">
        <img class="s-height" src="../assets/img/supplies-bg(updated).png" style="width:100vw;" alt="">
        <h2 @click="goToSuppliesPage" class="selectable supplies-text">
          Supplies
          <svg style="width:36px;height:36px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M14.3 21.7C13.6 21.9 12.8 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2C13.3 2 14.6 2.3 15.8 2.7L14.2 4.3C13.5 4.1 12.8 4 12 4C7.6 4 4 7.6 4 12S7.6 20 12 20C12.4 20 12.9 20 13.3 19.9C13.5 20.6 13.9 21.2 14.3 21.7M7.9 10.1L6.5 11.5L11 16L21 6L19.6 4.6L11 13.2L7.9 10.1M18 14V17H15V19H18V22H20V19H23V17H20V14H18Z" />
          </svg>
        </h2>
        <div @click="goToTravelersPage" class="selectable ms-3">
          <img class="travelers-bg" src="../assets/img/travelers-bg.png" alt="">
          <i class="mdi mdi-account-multiple travelers-logo"></i>
        </div>
        <div class="join-code">
          <h6 class="mb-0">
            Join Code:
          </h6>
          <h3 @click="copyText" id="join-code" class="trip-code">
            {{ trip.jkey }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { tripsService } from '../services/TripsService'
import Pop from '../utils/Pop'
import { router } from '../router'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await tripsService.setCurrentTrip(route.params.tripId)
    })
    return {
      trip: computed(() => AppState.currentTrip),
      account: computed(() => AppState.account),
      async goToSuppliesPage() {
        try {
          router.push({ name: 'Trip.Supplies' })
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async goToTravelersPage() {
        try {
          router.push({ name: 'Trip.Travelers' })
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async goToAccountPage() {
        try {
          router.push({ name: 'Account' })
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async goToTripRoutes() {
        try {
          router.push({ name: 'Trip.Routes' })
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      copyText() {
        try {
          tripsService.copyText(route.params.tripId)
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.profile-picture {
  border-radius: 50%;
    width: 18vw;
    height: 18vw;
    position: absolute;
    left: 7vw;
    top: 3.5vh;
    object-fit: cover;
}
.map {
  padding: 0;
  z-index: 0;
  object-fit: cover;
  height: 80vh!important;
  width: 100vw;
  position: absolute;
}
.profile-bg {
  width: 25vw;
  filter: drop-shadow(4px 0 4px rgba(0, 0, 0, 0.25));
}
.overlay {
  z-index: 1;
}
.trip-title {
  font-family: museo-slab, serif;
  font-size: 2rem;
  font-weight: 600;
  color: #6d7746;
   -webkit-text-stroke: 1px #4A502F;
}
.supplies {
  width: 100vw;
  z-index: 5;
}
.supplies-shadow {
  z-index: 4;
  content: "";
  background: rgba(0, 0, 0, .25);
  height: 52vh;
  width: 100vw;
  clip-path: polygon(0 80%, 100% 45%, 100% 100%, 0% 100%)
}
.supplies-text {
    position: absolute;
    bottom: 50px;
    right: 45px;
    color: #cca363;
    font-family: 'museo-slab',serif;
    font-size: 2.1rem;
}
.join-code {
  position: absolute;
  bottom: 10px;
  left: 25px;
  font-family: 'museo-slab', serif;
}
h3 {
  font-weight: 600;
  color: #4A502F;
}
h6 {
  color: #A9B37F;
}
.travelers {
  z-index: 3;
  width: 100vw;
}
.t-height {
  height: 35vh;
  width: 100%;
}
.s-height {
  height: 28vh;
  width: 100%;
}
.user-icon {
  width: 20vw;
  position: absolute;
  z-index: 6;
  left: 5.5vw;
  top: 3.75vh;
}
.travelers-shadow {
  z-index: 2;
  content: "";
  background: rgba(0, 0, 0, .25);
  height: 57vh;
  width: 100vw;
  clip-path: polygon(0 45%, 100% 80%, 100% 100%, 0% 100%)
}
.travelers-bg {
  position: absolute;
  bottom: 147px;
  width: 20vw;
  filter: drop-shadow(2px 0 4px rgba(0, 0, 0, 0.25));
  z-index: 10;
}
.travelers-logo {
  z-index: 10;
  position: absolute;
    bottom: 160px;
    left: 19px;
    font-size: 2.3rem;
    color: #e7debe;
    text-shadow: 2px 1px 2px rgba(194, 194, 194, 0.5);
    -webkit-text-stroke: 1px #e7debe;
}
.bottom {
  position: absolute;
  bottom: 0;
}
</style>
