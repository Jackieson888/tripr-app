<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field v-model="editable.name" label="Name" required />
    <v-text-field v-model="editable.picture" label="Picture URL" required />
    <v-btn type="submit" color="primary"> Update </v-btn>
  </v-form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { accountService } from "../services/AccountService.js";
import Pop from "../utils/Pop.js";

export default {
  emits: ["success"],
  setup(props, { emit }) {
    const editable = ref({});
    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editProfile(editable.value);
          Pop.toast("Profile was edited", "success");
          editable.value = {};
          emit("success");
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>
