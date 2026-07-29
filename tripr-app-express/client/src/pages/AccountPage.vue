<template>
  <div class="container-fluid bg-secondary account">
    <div class="row account-info-wrapper justify-content-center">
      <div class="m-0 mt-4 mb-0 account-info bg-body">
        <div class="d-flex justify-content-between align-content-center">
          <h4 class="mt-2 font-m" v-if="account">
            {{ account.name }}
          </h4>
        </div>
        <p>
          last road trip: <span>{{ lasttrip?.name || "N/A" }}</span>
        </p>
        <p>
          total trips: <span>{{ mytrips.length }}</span>
        </p>
        <img
          v-if="account"
          :src="account.picture"
          alt="account picture"
          class="accountPicture rounded-circle"
          data-bs-toggle="modal"
          data-bs-target="#editprofile-modal"
        />
      </div>
    </div>
    <div class="row justify-content-center m-0 p-0">
      <button type="button" class="m-0 p-0 btn w-100">
        <router-link :to="{ name: 'CreateTrip' }" class="">
          <h2 class="m-0 p-0">
            <img
              class="cool-button patch mb-5"
              src="../assets/img/create.png"
              alt="Create Trip"
            />
          </h2>
        </router-link>
        <img
          class="cool-button patch m-0 mb-4"
          src="../assets/img/join.png"
          alt="Join Trip"
          data-bs-toggle="modal"
          data-bs-target="#join-modal"
        />
      </button>
    </div>
    <div class="mt-1 row align-items-end justify-content-between">
      <div class="col-6">
        <button type="button" class="ms-2 bg-primary btn w-100">
          <router-link :to="{ name: 'YourTrips' }" class="">
            <h2 class="text-shadow">Trips</h2>
          </router-link>
        </button>
      </div>
      <div class="d-flex col-6 pe-4 justify-content-end">
        <div class="text-primary" @click="logout">
          <i class="mdi mdi-logout-variant f-30"></i>
        </div>
      </div>
    </div>
  </div>
  <Modal id="editprofile-modal">
    <template #modal-title>
      <h5>Edit Profile</h5>
    </template>
    <template #modal-body>
      <EditProfileForm />
    </template>
  </Modal>
  <Modal id="join-modal">
    <template #modal-title>
      <h5 class="join-modal-text text-center">Join Trip</h5>
    </template>
    <template #modal-body>
      <JoinTripForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
import { tripsService } from "../services/TripsService";
import { router } from "../router";

export default {
  name: "Account",
  setup() {
    const auth0 = useAuth0();

    // Redirect to login if not authenticated
    onMounted(async () => {
      // Wait for Auth0 to load
      if (auth0 && auth0.isLoading.value) {
        const waitInterval = setInterval(() => {
          if (!auth0.isLoading.value) {
            clearInterval(waitInterval);
            if (!auth0.isAuthenticated.value) {
              router.push({ name: "Login" });
              return;
            }
            // Proceed with data loading
            tripsService.getAllTrips();
            tripsService.getAllMyTrackedTrips();
          }
        }, 100);
      } else if (auth0 && !auth0.isAuthenticated.value) {
        router.push({ name: "Login" });
        return;
      } else {
        await tripsService.getAllTrips();
        await tripsService.getAllMyTrackedTrips();
      }
    });

    return {
      account: computed(() => AppState.account),
      mytrips: computed(() => AppState.mytrips),
      lasttrip: computed(() => AppState.mytrips[AppState.mytrips.length - 1]),
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style scoped lang="scss">
.btn {
  border-radius: 10px;
  padding: 0.1rem;
}
h2 {
  font-family: museo-slab, serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0;
}
.font-m {
  font-family: museo-slab, serif;
  font-weight: 600;
}
.account {
  height: 100vh;
}
.account-info-wrapper {
  filter: drop-shadow(0px 5px 5px rgba(20, 19, 20, 0.25));
}
.account-info {
  border-radius: 10px;
  clip-path: polygon(0 0, 100% 0%, 100% 45%, 0 73%);
  width: 90vw;
  height: 35vh;
  margin-bottom: -60px;
  //  -moz-box-shadow:    inset 0 0 10px #000000;
  //    -webkit-box-shadow: inset 0 0 10px #000000;
  //    box-shadow:         inset 0 0 10px #000000;
}
.patch {
  width: 55vw;
  height: auto;
  margin: -50px;
}
.text-shadow {
  border-radius: 10px;
  padding: 0.5rem 1rem;
  border: 3px dashed rgba(255, 255, 255, 0.5);
  color: #a28558;
  text-shadow: 0px 2px 2px rgba(255, 255, 255, 0.5);
}
.cool-button {
}
.cool-button:hover {
  cursor: pointer;
  transform: scale(1.03);
}

.accountPicture {
  height: 48px;
  width: 48px;
  object-fit: cover;
}
.inset {
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
.pin {
  height: 32px;
  width: 42px;
}

.join-modal-text {
  color: #a28558;
  font-family: museo-slab, serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0;
}
</style>
