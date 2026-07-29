<template>
  <!-- <button @click="createMap">
    Create Map
  </button> -->
  <div id="map">
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
// import { onMounted } from '@vue/runtime-core'
// import { loadModules } from 'esri-loader'

let Map = {}
let MapView = {}
require(['esri/config', 'esri/Map', 'esri/views/MapView'], function(esriConfig, MapSRC, MapViewSRC) {
  esriConfig.apiKey = 'AAPKa4bb649adabd41ecb17f3b4614ec7de7fuFnN6h7T8A3zAcPcAcHaegzQPO-vZsAP6BBQxC3xkINSgaNvUlnI_ZmhHz3yTlU'
  Map = MapSRC
  MapView = MapViewSRC
})

export default {
  // props: {
  //   trip: {
  //     type: Trip,
  //     required: true
  //   }
  // },
  setup() {
    onMounted(async() => {
      // createMap() {
      const map = new Map({
        basemap: 'arcgis-topographic' // Basemap layer service
      })

      const view = new MapView({
        map: map,
        center: [-111.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: 'map' // Div element
      })
      // }
    })
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  #map {
    padding: 0;
    min-height: 50vh;
    min-width: 50vw;
  }
</style>
