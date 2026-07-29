<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <h1>Routes</h1>
        <v-btn @click="toTripPage"> Back To Trip </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <TripMapBox class="map" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-list v-if="trip.geo">
          <v-list-item
            v-for="(l, i) in trip.geo.features"
            :key="l.id"
            :title="`${i + 1}. ${l.text}`"
          />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { suppliesService } from "../services/SuppliesService";
import Pop from "../utils/Pop";
import { tripsService } from "../services/TripsService";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    onMounted(async () => {
      await tripsService.setCurrentTrip(route.params.tripId);
    });

    return {
      trip: computed(() => AppState.currentTrip),
      async toTripPage() {
        try {
          await suppliesService.gotoTripPage();
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style scoped>
.map {
  min-height: 320px;
  width: 100%;
}
</style>
