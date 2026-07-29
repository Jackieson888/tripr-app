<template>
  <div class="container-fluid px-0 m-0 mt-5">
    <div class="login px-0 m-0 mt-5">
      <div v-if="isLoading" class="row p-0 m-0 mt-5">
        <div class="col d-flex flex-column align-items-center m-0 mt-5 my-4 p-0 w-100">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>

      <div v-else class="row p-0 m-0 mt-5">
        <div class="col d-flex flex-column align-items-center m-0 mt-5 my-4 p-0 w-100">
          <img class="logo mt-5" src="../assets/img/circle-logo.png" alt="Tripr Logo">
          <h1>
            tripr
          </h1>
        </div>
      </div>

      <div class="row  m-0 my-2 p-0">
        <div class="col d-flex flex-column align-items-center  m-0 p-0 w-100">
          <button
            v-if="!isAuthenticated"
            class="btn bg-body thread-button mb-4"
            @click="login"
          >
            <h3 class="btn-center bg-light p-0">
              Login
            </h3>
          </button>

          <button
            v-if="!isAuthenticated"
            class="btn bg-body thread-button mb-4"
            @click="signup"
          >
            <h3 class="btn-center bg-light p-0">
              Signup
            </h3>
          </button>

          <button
            v-if="isAuthenticated"
            class="btn bg-body thread-button mb-4"
            @click="handleLogout"
          >
            <h3 class="btn-center bg-light p-0">
              Logout
            </h3>
          </button>

          <button
            class="btn bg-body thread-button"
          >
            <router-link :to="{ name: 'About' }" class=" p-0">
              <h4 class="btn-center bg-light">
                About
              </h4>
            </router-link>
          </button>
        </div>
      </div>
    </div>

    <footer class="m-0 p-0">
      <div class="row m-0 p-0">
        <div class="col p-0">
          <div class="bg-grey text-light text-center p-0">
            <p class="py-1 mb-0">
              Application Created by Nathan, Quinn, Scott, Drew, Jackson 2021
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed, watch, onMounted, ref } from '@vue/runtime-core'
import { useAuth0 } from '@auth0/auth0-vue'
import { AppState } from '../AppState'
import { router } from '../router'
import { tripsService } from '../services/TripsService'
import { accountService } from '../services/AccountService'
import { socketService } from '../services/SocketService'

export default {
  setup() {
    let auth0Data = null
    const authInitialized = ref(false)

    try {
      auth0Data = useAuth0()
    } catch (error) {
      console.error('Failed to initialize Auth0:', error)
    }

    if (!auth0Data) {
      return {
        isLoading: ref(false),
        isAuthenticated: ref(false),
        user: ref(null),
        login: () => console.error('Auth0 not initialized'),
        signup: () => console.error('Auth0 not initialized'),
        handleLogout: () => console.error('Auth0 not initialized')
      }
    }

    const { isLoading, isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently } = auth0Data

    const login = async () => {
      await loginWithRedirect()
    }

    const signup = async () => {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: 'signup'
        }
      })
    }

    const handleLogout = async () => {
      await logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      })
    }

    // Watch for authentication changes
    watch(() => isAuthenticated.value, (auth) => {
      if (auth && user.value) {
        AppState.user = user.value
        getAccessTokenSilently().then((token) => {
          accountService.getAccount()
          socketService.authenticate(token)
          // Navigate to Account page after successful authentication
          router.push({ name: 'Account' })
        }).catch(err => console.error('Error getting token:', err))
      }
    })

    return {
      isLoading,
      isAuthenticated,
      user: computed(() => AppState.user),
      login,
      signup,
      handleLogout
    }
  }
}
</script>

<style scoped lang="scss">
p {
  font-size: .75rem;
}
.logo {
  width: 45vw;
  filter: drop-shadow(2px 0 4px rgba(0, 0, 0, 0.25));
}
h1,h2 {
  font-family: museo-slab,serif;
  font-size: 3.5rem;
  font-weight: 600;
  font-style: normal;
  color: #6d7746;
}
h3 {
  font-family: museo-slab,serif;
  font-size: 2rem;
  font-weight: 300;
  color: #6d7746;
  margin-bottom: 0;
}
h4 {
  font-family: museo-slab,serif;
  font-size: 1.25rem;
  font-weight: 300;
  color: rgba(109, 119, 70, .5);
  margin-bottom: 0;
}
.thread-button {
  width: 40%;
  border: 2px dashed #f2f2f2;
  border-radius: 10px;
  padding: .25rem;
}
.btn-center {
  padding: .25rem .25rem;
  border-radius: 5px;
  box-shadow: inset 3px 3px 5px rgba(0, 0, 0, 0.25);
}
.login{
  margin-top: 20vh;
}
footer{
  position: absolute;
  width: 100vw;
  bottom: 0;
}
</style>
