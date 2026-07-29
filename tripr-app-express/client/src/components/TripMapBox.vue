<template>
  <div>
    <!-- <button @click="save()">
      save
    </button> -->
    <div id="map"></div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { MapService2 } from '../services/MapService2'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'

export default {
  setup() {
    let map = null
    const mapSource = computed(() => AppState.tripMapSource)
    onMounted(() => {
      map = new MapService2()
      loadMap(map, mapSource)
    })

    watchEffect(() => {
      loadMap(map, mapSource)
    })

    function loadMap(map, mapSource) {
      if (map && mapSource.value) {
        console.log('da dta', mapSource.value)
        map.loadMapSource(mapSource.value)
      }
    }

    return {
      mapSource,
      async save() {
        map.saveMap()
      }

    }
  }

}
</script>

<style lang="scss">
#map {
  height: 65vh;
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
