<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <v-btn :to="{ name: 'Account' }"> Account </v-btn>
        <h2>
          {{ trip.title || "Trip" }}
        </h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <img
          v-if="trip.tripImgUrl"
          :src="trip.tripImgUrl"
          alt="trip"
          style="max-width: 100%; max-height: 360px; object-fit: cover"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex" style="gap: 8px; flex-wrap: wrap">
        <v-btn @click="goToTripRoutes"> Route Details </v-btn>
        <v-btn @click="goToSuppliesPage"> Supplies </v-btn>
        <v-btn @click="goToTravelersPage"> Travelers </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p>Join Code: {{ trip.jkey }}</p>
        <v-btn @click="copyText"> Copy Join Code </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { tripsService } from "../services/TripsService";
import Pop from "../utils/Pop";
import { router } from "../router";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    onMounted(async () => {
      await tripsService.setCurrentTrip(route.params.tripId);
    });

    return {
      trip: computed(() => AppState.currentTrip),
      async goToSuppliesPage() {
        try {
          router.push({ name: "Trip.Supplies" });
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
      async goToTravelersPage() {
        try {
          router.push({ name: "Trip.Travelers" });
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
      async goToTripRoutes() {
        try {
          router.push({ name: "Trip.Routes" });
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
      copyText() {
        try {
          tripsService.copyText(route.params.tripId);
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>
