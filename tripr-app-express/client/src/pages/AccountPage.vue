<template>
  <ScreenShell>
    <template #header>
      <ProfileSummaryCard
        :image="displayPicture"
        :initials="initials"
        :title="displayName || 'Account'"
        :lines="[
          `Last Trip | ${lastTripDate}`,
          `Total Trips | ${mytrips.length}`,
        ]"
        @avatar-click="showEditProfile = true"
      />
    </template>

    <TripBadgeAction
      :image-src="createBadge"
      image-alt="Create Trip"
      label="CREATE"
      @click="onCreateTrip"
    />

    <TripBadgeAction
      :image-src="joinBadge"
      image-alt="Join Trip"
      label="JOIN"
      @click="showJoinTrip = true"
    />

    <template #footer>
      <FooterActionBar
        left-label="TRIPS"
        :left-to="{ name: 'YourTrips' }"
        right-label="Logout"
        @right-click="logout"
      />
    </template>

    <v-dialog v-model="showEditProfile" max-width="520">
      <v-card>
        <v-card-title> Edit Profile </v-card-title>
        <v-card-text>
          <EditProfileForm @success="showEditProfile = false" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showJoinTrip" max-width="520">
      <v-card>
        <v-card-title> Join Trip </v-card-title>
        <v-card-text>
          <JoinTripForm @success="showJoinTrip = false" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </ScreenShell>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { tripsService } from '../services/TripsService'
import { router } from '../router'
import ProfileSummaryCard from '../components/ProfileSummaryCard.vue'
import TripBadgeAction from '../components/TripBadgeAction.vue'
import ScreenShell from '../components/ScreenShell.vue'
import FooterActionBar from '../components/FooterActionBar.vue'
import createBadge from '../assets/img/create-badge.png'
import joinBadge from '../assets/img/join-badge.png'

export default {
  name: 'Account',
  components: {
    FooterActionBar,
    ProfileSummaryCard,
    ScreenShell,
    TripBadgeAction
  },
  setup() {
    const auth0 = useAuth0()
    const showEditProfile = ref(false)
    const showJoinTrip = ref(false)

    onMounted(async() => {
      if (auth0 && auth0.isLoading.value) {
        const waitInterval = setInterval(() => {
          if (!auth0.isLoading.value) {
            clearInterval(waitInterval)
            if (!auth0.isAuthenticated.value) {
              router.push({ name: 'Login' })
              return
            }
            tripsService.getAllTrips()
            tripsService.getAllMyTrackedTrips()
          }
        }, 100)
      } else if (auth0 && !auth0.isAuthenticated.value) {
        router.push({ name: 'Login' })
      } else {
        await tripsService.getAllTrips()
        await tripsService.getAllMyTrackedTrips()
      }
    })

    return {
      createBadge,
      joinBadge,
      showEditProfile,
      showJoinTrip,
      mytrips: computed(() => AppState.mytrips),
      initials: computed(() => {
        const sourceName =
          auth0?.user?.value?.name ||
          auth0?.user?.value?.nickname ||
          AppState.account?.name ||
          ''
        return (
          sourceName
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join('')
            .toUpperCase() || 'A'
        )
      }),
      displayName: computed(
        () =>
          auth0?.user?.value?.name ||
          auth0?.user?.value?.nickname ||
          AppState.account?.name ||
          ''
      ),
      displayPicture: computed(
        () => auth0?.user?.value?.picture || AppState.account?.picture || ''
      ),
      onCreateTrip() {
        router.push({ name: 'CreateTrip' })
      },
      lastTripDate: computed(() => {
        const dateSource =
          AppState.mytrips[AppState.mytrips.length - 1]?.updatedAt ||
          AppState.mytrips[AppState.mytrips.length - 1]?.createdAt
        if (!dateSource) {
          return 'N/A'
        }
        return new Date(dateSource).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      }),
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>
