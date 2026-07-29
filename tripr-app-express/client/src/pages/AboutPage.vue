<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-space-between align-center">
        <h1>About</h1>
        <v-btn icon @click="goToLoginPage">
          <i class="mdi mdi-close"></i>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-list>
          <v-list-item
            v-for="member in members"
            :key="member.name"
            :title="member.name"
            :subtitle="member.github"
            :href="member.github"
            target="_blank"
          />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { router } from "../router";
import Pop from "../utils/Pop";

export default {
  name: "AboutPage",
  setup() {
    const members = [
      { name: "Scott Fennie", github: "https://github.com/ScottFennie" },
      {
        name: "Nathan Hendricks",
        github: "https://github.com/NathanHendricks",
      },
      { name: "Drew McReynolds", github: "https://github.com/drewmcreynolds" },
      {
        name: "Jackson Schacher",
        github: "https://github.com/JacksonSchacher",
      },
      { name: "Quinn Perri", github: "https://github.com/KranberryKin" },
    ];

    return {
      members,
      goToLoginPage() {
        try {
          router.push({ name: "Login" });
        } catch (error) {
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>
