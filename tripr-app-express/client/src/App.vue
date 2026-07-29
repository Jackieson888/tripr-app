<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { computed, watch } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { AppState } from "./AppState";
import { AuthService } from "./services/AuthService";
import { accountService } from "./services/AccountService";
import { socketService } from "./services/SocketService";
export default {
  name: "App",
  setup() {
    const auth0 = useAuth0();

    void AuthService.setupTokenInterceptor();

    watch(
      [() => auth0.isAuthenticated.value, () => auth0.user.value],
      async ([isAuthenticated, user]) => {
        if (!isAuthenticated || !user) {
          AuthService.setAuthenticated(false);
          AuthService.clearBearer();
          AppState.user = {};
          return;
        }

        const token = await auth0.getAccessTokenSilently();
        AuthService.setBearer(token);
        AuthService.setAuthenticated(true);
        AppState.user = user;
        await accountService.getAccount();
        socketService.authenticate(token);
      },
      { immediate: true },
    );

    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
