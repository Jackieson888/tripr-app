<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title> Tripr </v-card-title>
          <v-card-text>
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
            />
            <div v-else style="display: flex; gap: 8px; flex-wrap: wrap">
              <v-btn v-if="!isAuthenticated" @click="login"> Login </v-btn>
              <v-btn v-if="!isAuthenticated" @click="signup"> Signup </v-btn>
              <v-btn v-if="isAuthenticated" @click="handleLogout">
                Logout
              </v-btn>
              <v-btn :to="{ name: 'About' }"> About </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { watch, ref } from "@vue/runtime-core";
import { useAuth0 } from "@auth0/auth0-vue";
import { router } from "../router";

export default {
  setup() {
    let auth0Data = null;

    try {
      auth0Data = useAuth0();
    } catch (error) {
      console.error("Failed to initialize Auth0:", error);
    }

    if (!auth0Data) {
      return {
        isLoading: ref(false),
        isAuthenticated: ref(false),
        login: () => console.error("Auth0 not initialized"),
        signup: () => console.error("Auth0 not initialized"),
        handleLogout: () => console.error("Auth0 not initialized"),
      };
    }

    const { isLoading, isAuthenticated, loginWithRedirect, logout } = auth0Data;

    const login = async () => {
      await loginWithRedirect();
    };

    const signup = async () => {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: "signup",
        },
      });
    };

    const handleLogout = async () => {
      await logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };

    watch(
      () => isAuthenticated.value,
      (auth) => {
        if (auth) {
          router.push({ name: "Account" });
        }
      },
    );

    return {
      isLoading,
      isAuthenticated,
      login,
      signup,
      handleLogout,
    };
  },
};
</script>
