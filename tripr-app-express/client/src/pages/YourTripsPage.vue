<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <h1>Trips</h1>
        <v-btn icon :to="{ name: 'Account' }">
          <i class="mdi mdi-close"></i>
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="trips.length === 0">
      <v-col>
        <p>You have no trips yet.</p>
        <v-btn :to="{ name: 'CreateTrip' }"> Create Trip </v-btn>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <TripCard v-for="t in trips" :key="t.id" :trip="t" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { tripsService } from "../services/TripsService";

export default {
  setup() {
    onMounted(async () => {
      await tripsService.getAllMyTrackedTrips();
    });

    return {
      trips: computed(() => AppState.mytrips),
    };
  },
};
</script>
