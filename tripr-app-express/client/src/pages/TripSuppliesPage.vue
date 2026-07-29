<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <h1>Supplies</h1>
        <v-btn @click="toTripPage"> Back To Trip </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-form @submit.prevent="addSupplyItem">
          <v-text-field
            v-model="editable.description"
            label="Add Supply Item"
            required
          />
          <v-btn type="submit" color="primary"> Add </v-btn>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <h2>Need</h2>
        <NeededItem v-for="s in currentSupplies" :key="s.id" :supply="s" />
      </v-col>
      <v-col cols="12" md="6">
        <h2>Assigned</h2>
        <v-list>
          <v-list-item
            v-for="a in assignedSupplies"
            :key="a.id"
            :title="a.description"
            :subtitle="a.assigned ? a.assigned.name : ''"
          >
            <template #append>
              {{ a.quantity || 1 }}
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { suppliesService } from "../services/SuppliesService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();

    onMounted(async () => {
      try {
        await suppliesService.getSupplies(route.params.tripId);
      } catch (error) {
        Pop.toast(error.message, "error");
      }
    });

    return {
      editable,
      currentSupplies: computed(() =>
        AppState.currentSupplies.filter(
          (s) => s.isBringing === false || s.assignedId === AppState.account.id,
        ),
      ),
      assignedSupplies: computed(() =>
        AppState.currentSupplies.filter((s) => s.isBringing === true),
      ),
      async addSupplyItem() {
        try {
          await suppliesService.createSupplies(
            editable.value,
            route.params.tripId,
          );
          editable.value = {};
          Pop.toast("Supply item added", "success");
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
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
