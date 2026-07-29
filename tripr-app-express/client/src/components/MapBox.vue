<template>
  <div>
    <div class="map" id="map"></div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { MapService } from '../services/MapService'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'

export default {
  setup() {
    let map = null
    const mapSource = computed(() => AppState.tripStartSource)
    onMounted(() => {
      map = new MapService()

      setTimeout(() => {
      }, 2000)
      // go load TripMapSourceByTripId
    })

    watchEffect(() => {
      if (mapSource.value.id && map) {
        map.loadMapSource(mapSource.value)
      }
    })

    return {
      async save() {
        map.saveMap()
      }

    }
  }
}
</script>

<style lang="scss">
.map {
  height: 40vh;
}
.mapboxgl-ctrl-attrib-inner {
  display: none;
}
.mapboxgl-ctrl.mapboxgl-ctrl-attrib {
  display: none;
}

.mapboxgl-ctrl-geocoder--input {
}
.mapboxgl-ctrl-geocoder {
  width: 300px !important;
}
</style>
