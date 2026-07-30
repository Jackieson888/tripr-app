<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container>
          <v-col>
            <div v-if="displayPicture">
              <v-avatar size="64" :image="displayPicture" alt="account picture">
              </v-avatar>
            </div>
            <h2>
              {{ displayName || "Account" }}
            </h2>
            <p>Last Trip: {{ lastTripDate }}</p>
            <p>Total Trips: {{ mytrips.length }}</p>
          </v-col>
          <v-col>
            <v-btn @click="onCreateTrip" variant="plain">
              <img src="../assets/img/create-badge.png" alt="Create Trip" />
              CREATE
            </v-btn>
            <v-btn @click="showJoinTrip = true" variant="plain">
              <img src="../assets/img/join-badge.png" alt="Join Trip" />
              JOIN
            </v-btn>
          </v-col>
        </v-container>
      </v-col>
    </v-row>

    <v-dialog v-model="showEditProfile" max-width="520">
      <v-card>
        <v-card-title> Edit Profile </v-card-title>
        <v-card-text>
          <EditProfileForm @success="showEditProfile = false" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showJoinTrip" max-width="520">
      <v-card>
        <v-card-title> Join Trip </v-card-title>
        <v-card-text>
          <JoinTripForm @success="showJoinTrip = false" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
import { tripsService } from "../services/TripsService";
import { router } from "../router";

export default {
  name: "Account",
  setup() {
    const auth0 = useAuth0();
    const showEditProfile = ref(false);
    const showJoinTrip = ref(false);

    onMounted(async () => {
      if (auth0 && auth0.isLoading.value) {
        const waitInterval = setInterval(() => {
          if (!auth0.isLoading.value) {
            clearInterval(waitInterval);
            if (!auth0.isAuthenticated.value) {
              router.push({ name: "Login" });
              return;
            }
            tripsService.getAllTrips();
            tripsService.getAllMyTrackedTrips();
          }
        }, 100);
      } else if (auth0 && !auth0.isAuthenticated.value) {
        router.push({ name: "Login" });
      } else {
        await tripsService.getAllTrips();
        await tripsService.getAllMyTrackedTrips();
      }
    });

    return {
      showEditProfile,
      showJoinTrip,
      mytrips: computed(() => AppState.mytrips),
      displayName: computed(
        () =>
          auth0?.user?.value?.name ||
          auth0?.user?.value?.nickname ||
          AppState.account?.name ||
          "",
      ),
      displayPicture: computed(
        () => auth0?.user?.value?.picture || AppState.account?.picture || "",
      ),
      onCreateTrip() {
        router.push({ name: "CreateTrip" });
      },
      lastTripDate: computed(() => {
        const dateSource =
          AppState.mytrips[AppState.mytrips.length - 1]?.updatedAt ||
          AppState.mytrips[AppState.mytrips.length - 1]?.createdAt;
        if (!dateSource) {
          return "N/A";
        }
        return new Date(dateSource).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }),
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>
