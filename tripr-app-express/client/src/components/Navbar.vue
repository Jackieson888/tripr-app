<template>
  <v-app-bar>
    <v-app-bar-title> Tripr </v-app-bar-title>
    <v-spacer />

    <v-btn :to="{ name: 'About' }">
      About
    </v-btn>

    <v-btn v-if="!user.isAuthenticated" @click="login">
      Login
    </v-btn>

    <v-menu v-else>
      <template #activator="{ props }">
        <v-btn v-bind="props">
          <v-avatar size="28" style="margin-right: 8px">
            <img :src="user.picture" alt="user" />
          </v-avatar>
          {{ user.name }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item :to="{ name: 'Account' }" title="Manage Account" />
        <v-list-item title="Logout" @click="logout" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'

export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>
