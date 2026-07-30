import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { AppState } from '../AppState'
import { mapboxToken } from '../env'
import { logger } from '../utils/Logger'
import { tripsService } from './TripsService'

let long = -116.286
let lat = 43.606

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    long = -116.286
    lat = 43.606
  }
}

function showPosition(position) {
  long = position.coords.longitude
  lat = position.coords.latitude
}

export class MapService {
  constructor(
    container,
    config = { style: 'mapbox://styles/mapbox/light-v10' }
  ) {
    mapboxgl.accessToken = mapboxToken
    getLocation()
    const map = new mapboxgl.Map({
      container: 'map',
      center: [long, lat],
      zoom: 7,
      preserveDrawingBuffer: true,
      ...config
    })

    // after map is "mounted" load the plugins
    map.on('load', () => {
      // adds geocoder plugin to map
      try {
        // eslint-disable-next-line no-undef
        const geocoder = new MapboxGeocoder({
          // Initialize the geocoder
          accessToken: mapboxgl.accessToken, // Set the access token
          mapboxgl: mapboxgl, // Set the mapbox-gl instance
          marker: false, // Do not use the default marker style
          placeholder: 'Search for a starting point' // Placeholder text for the search bar
        })
        map.addControl(geocoder, 'top-left')
        // Listen for the `result` event from the Geocoder
        // `result` event is triggered when a user makes a selection
        //  Add a marker at the result's coordinates
        geocoder.on('result', ({ result }) => {
          logger.log('the result', result)

          const source = map.getSource('my-data').serialize()
          // TODO pair down the result object to keep only the data you need... ie name geo
          if (source.data.features.length === 0) {
            source.data.features.push({
              id: result.id,
              type: result.type,
              text: result.text,
              geometry: result.geometry
            })
            setTimeout(() => {
              const img = map.getCanvas().toDataURL()
              AppState.startingImg = img
            }, 3000)
            AppState.tripMapSource = source
            tripsService.editTrip(AppState.currentTrip.id, source)
            logger.log('added trip', AppState.tripMapSource)
          }
          map.getSource('my-data').setData(source.data)
        })
      } catch (e) {
        logger.error('[GEOCODER_ERROR]', e)
      }
      // setup layers
      try {
        map.loadImage(
          'https://i.postimg.cc/1tR57gb3/centered-pin-large.png',
          (error, image) => {
            if (error) throw error
            map.addImage('custom-marker', image)
            // Add a GeoJSON source with 2 points
            // map.addSource('points', {
            //   type: 'geojson',
            //   data: {
            //     type: 'FeatureCollection',
            //     features: [
            //       {
            //         // feature for Mapbox DC
            //         type: 'Feature',
            //         geometry: {
            //           type: 'Point',
            //           coordinates: [
            //             -77.03238901390978, 38.913188059745586
            //           ]
            //         },
            //         properties: {
            //           title: 'Mapbox DC'
            //         }
            //       },
            //       {
            //         // feature for Mapbox SF
            //         type: 'Feature',
            //         geometry: {
            //           type: 'Point',
            //           coordinates: [-122.414, 37.776]
            //         },
            //         properties: {
            //           title: 'Tripr SF'
            //         }
            //       }
            //     ]
            //   }
            // })
            map.addSource('my-data', {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: []
              }
            })
            map.addLayer({
              id: 'point',
              type: 'symbol',
              source: 'my-data',
              layout: {
                'icon-image': 'custom-marker',
                // get the title name from the source's "title" property
                'text-field': ['get', 'title'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 1.25],
                'text-anchor': 'top'
              }
            })
          }
        )
      } catch (error) {
        logger.error('[Layers Error]', error)
      }

      try {
        // loadPlugins(map)
      } catch (error) {
        logger.error('error loading plugin', error)
      }
    })
    this.map = map
    this.source = map.getSource('my-data')
  }

  addPin(pinData) {
    // TODO
  }

  saveMap() {
    const data = this.map.getSource('my-data').serialize()
    logger.log('saving', data)
  }

  loadMapSource(dataSource) {
    const source = this.map.getSource('my-data')
    if (!source) {
      return setTimeout(() => this.loadMapSource(dataSource), 100)
    }
    source.data = dataSource
    this.map.getSource('my-data').setData(source.data)
  }

  /**
   * Properly cleanup map instance to prevent memory leaks
   * CRITICAL: Call this in component unmounted/destroy hooks
   */
  remove() {
    if (this.map) {
      this.map.remove()
    }
  }
}

// export const mapService = new MapService()

// function loadPlugins(map) {
//   const s = document.createElement('script')
//   s.src = 'https://bl.ocks.org/danswick/raw/36796153bd86ce982a59043cbe0ac8f7/mapbox-gl-draw.js'
//   document.body.appendChild(s)
//   s.onload = () => {
//     try {
//       tryLoadDraw(map)
//     } catch (error) {
//       logger.error('unable to add control draw', error)
//     }
//   }
// }

// function tryLoadDraw(map) {
//   setTimeout(() => {
//     if (!mapboxgl.Draw) {
//       return tryLoadDraw(map)
//     }
//     logger.log('there must be abetter way for plugins', 'draw loaded')
//     map.addControl(mapboxgl.Draw())
//   }, 1000)
// }
