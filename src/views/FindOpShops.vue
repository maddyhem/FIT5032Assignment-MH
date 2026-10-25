<template>
  <div
    class="container-fluid mt-1 d-flex justify-content-center align-items-center p-3"
    style="min-height: calc(100vh - 58px)"
  >
    <div
      class="card p-4 shadow-lg border-0 d-flex flex-column justify-content-between"
      style="
        width: 98%;
        min-height: calc(100vh - 100px);
        background-color: #e2ead0;
        backdrop-filter: blur(10px);
      "
    >
      <div class="row align-items-center mb-4 g-3">
        <div class="col-12 col-lg-5">
          <h2 class="fw-bold m-0" style="color: #384232">Op Shops Near You</h2>
          <p class="text-secondary m-0 mt-1 small" style="color: #384232 !important; opacity: 0.85">
            Find your nearest op shop to keep the cycle going!
          </p>
        </div>

        <div
          class="col-12 col-lg-7 d-flex flex-wrap gap-2 justify-content-lg-end align-items-center"
        >
          <!-- Mapbox Search Input Hook -->
          <div ref="geocoderContainer" class="search-box-wrapper shadow-sm"></div>

          <button
            @click="findMyLocation"
            class="btn fw-semibold px-4 py-2 text-white border-0 shadow-sm"
            style="background-color: #aaa46e"
            :disabled="isLoadingLocation"
          >
            {{ isLoadingLocation ? 'Locating...' : '📍 Near Me' }}
          </button>
        </div>
      </div>

      <div class="row g-3 grow" style="min-height: 0">
        <!-- Left Sidebar (Op Shops List) -->
        <div
          class="col-12 col-md-4 col-lg-3 d-flex flex-column h-100"
          style="max-height: calc(100vh - 260px)"
        >
          <p
            class="small fw-bold text-uppercase tracking-wider mb-2"
            style="color: #384232; opacity: 0.7"
          >
            {{ userLocation ? 'Nearest Stores to You' : 'Available Collections' }}
          </p>

          <div class="d-flex flex-column gap-2 overflow-y-auto pe-1 grow">
            <div
              v-for="shop in sortedOpShops"
              :key="shop.id"
              @click="selectShop(shop)"
              class="card p-3 list-card border shadow-sm transition-all"
              :class="{ 'active-card': selectedOpShop?.id === shop.id }"
            >
              <div class="d-flex justify-content-between align-items-start gap-1">
                <h6 class="fw-bold m-0 shop-title shadow-none">{{ shop.name }}</h6>
                <span
                  v-if="shop.distance"
                  class="badge text-white px-2 py-1 small border-0"
                  style="background-color: #aaa46e; font-size: 0.75rem"
                >
                  {{ shop.distance }} km
                </span>
              </div>
              <p class="text-muted my-1 small mb-2 text-truncate-custom">{{ shop.address }}</p>

              <div
                class="d-flex justify-content-between align-items-center text-muted border-top pt-2 mt-1"
                style="font-size: 0.8rem; color: #384232 !important; opacity: 0.75"
              >
                <span>🕒 {{ shop.hours }}</span>
                <span>📞 {{ shop.phone }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar (Mapbox) -->
        <div
          class="col-12 col-md-8 col-lg-9 d-flex flex-column"
          style="height: calc(100vh - 260px); min-height: 450px"
        >
          <div
            class="w-100 h-100 rounded-3 shadow-sm border overflow-hidden position-relative bg-white"
            style="border-color: rgba(56, 66, 50, 0.15) !important"
          >
            <div ref="mapContainer" class="w-100 h-100 position-absolute top-0 start-0"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

const mapContainer = ref(null)
const geocoderContainer = ref(null)
const userLocation = ref(null)
const selectedOpShop = ref(null)
const isLoadingLocation = ref(false)

let map = null
let activeMarkers = []

// Static DB with Op shop locations
const opShops = ref([
  {
    id: 1,
    name: 'Sacred Heart Mission Op Shop',
    address: '87A Grey St, St Kilda VIC 3182',
    coordinates: [144.9796, -37.8614],
    phone: '(03) 9537 1161',
    hours: '10am - 5pm',
  },
  {
    id: 2,
    name: 'Brotherhood of St Laurence',
    address: '109 Brunswick St, Fitzroy VIC 3065',
    coordinates: [144.9785, -37.8016],
    phone: '(03) 9419 2244',
    hours: '9:30am - 5pm',
  },
  {
    id: 3,
    name: 'Red Cross Shop',
    address: '192 Hanover St, Fitzroy VIC 3065',
    coordinates: [144.9749, -37.8005],
    phone: '(03) 9417 3254',
    hours: '10am - 6pm',
  },
  {
    id: 4,
    name: 'Salvos Stores Richmond',
    address: '222 Bridge Rd, Richmond VIC 3121',
    coordinates: [144.9965, -37.8188],
    phone: '(03) 9429 2381',
    hours: '9am - 5:30pm',
  },
  {
    id: 5,
    name: 'Vinnies Hawthorn',
    address: '254 Burwood Rd, Hawthorn VIC 3122',
    coordinates: [145.0345, -37.8221],
    phone: '(03) 9819 9621',
    hours: '9am - 5pm',
  },
  {
    id: 6,
    name: 'Doncaster Salvos Stores',
    address: '841 Doncaster Rd, Doncaster VIC 3108',
    coordinates: [145.1241, -37.7876],
    phone: '(03) 9848 1234',
    hours: '9am - 5pm',
  },
  {
    id: 7,
    name: 'Vinnies Port Melbourne',
    address: '276 Bay St, Port Melbourne VIC 3207',
    coordinates: [144.9415, -37.8385],
    phone: '(03) 9681 9022',
    hours: '9am - 5pm',
  },
  {
    id: 8,
    name: 'Toorak Opportunity Shop',
    address: '1A Carters Ave, Toorak VIC 3142',
    coordinates: [145.0135, -37.8421],
    phone: '(03) 9827 3172',
    hours: '9:30am - 4:30pm',
  },
  {
    id: 9,
    name: 'Salvos Stores Abbotsford',
    address: '81 Victoria Cres, Abbotsford VIC 3067',
    coordinates: [144.9991, -37.8052],
    phone: '(03) 9419 5566',
    hours: '9am - 5:30pm',
  },
  {
    id: 10,
    name: 'Sacred Heart Mission Fitzroy',
    address: '433 Brunswick St, Fitzroy VIC 3065',
    coordinates: [144.9791, -37.7968],
    phone: '(03) 9416 1146',
    hours: '10am - 5:30pm',
  },
  {
    id: 11,
    name: 'Savers Moorabbin Superstore',
    address: '430 Warrigal Rd, Heatherton VIC 3202',
    coordinates: [145.0825, -37.9405],
    phone: '(03) 9551 8622',
    hours: '9am - 9pm',
  },
  {
    id: 12,
    name: 'Brotherhood of St Laurence Brunswick',
    address: '145 Lygon St, Brunswick VIC 3056',
    coordinates: [144.9691, -37.7735],
    phone: '(03) 9387 7100',
    hours: '9:30am - 5pm',
  },
  {
    id: 13,
    name: 'Storehouse Thrift Chapel St',
    address: '41 Chapel St, Windsor VIC 3181',
    coordinates: [144.9928, -37.8572],
    phone: '(03) 9510 6511',
    hours: '10am - 5pm',
  },
  {
    id: 14,
    name: 'RetroStar Vintage Clothing',
    address: '37 Swanston St, Melbourne CBD VIC 3000',
    coordinates: [144.9652, -37.8155],
    phone: '(03) 9663 1223',
    hours: '10am - 6pm',
  },
  {
    id: 15,
    name: 'Save the Children Op Shop Malvern',
    address: '211 Glenferrie Rd, Malvern VIC 3144',
    coordinates: [145.0282, -37.8631],
    phone: '(03) 9509 0044',
    hours: '9:30am - 5pm',
  },
  {
    id: 16,
    name: 'Helping Hands Mission Airport West',
    address: '49 Matthews Ave, Airport West VIC 3042',
    coordinates: [144.8872, -37.7245],
    phone: '(03) 9338 1100',
    hours: '9am - 5pm',
  },
  {
    id: 17,
    name: 'RSPCA Op Shop Bayswater',
    address: '716 Mountain Hwy, Bayswater VIC 3153',
    coordinates: [145.2642, -37.8421],
    phone: '(03) 9720 4422',
    hours: '9am - 5pm',
  },
  {
    id: 18,
    name: 'Vinnies Bentleigh',
    address: '421 Centre Rd, Bentleigh VIC 3204',
    coordinates: [145.0381, -37.9168],
    phone: '(03) 9557 3254',
    hours: '9am - 5pm',
  },
  {
    id: 19,
    name: 'Red Cross Shop Williamstown',
    address: '32 Douglas Pde, Williamstown VIC 3016',
    coordinates: [144.8988, -37.8592],
    phone: '(03) 9397 7752',
    hours: '10am - 5pm',
  },
  {
    id: 20,
    name: 'Salvos Stores Coburg',
    address: '81 Waterfield St, Coburg VIC 3058',
    coordinates: [144.9622, -37.7441],
    phone: '(03) 9350 4411',
    hours: '9am - 5:30pm',
  },
  {
    id: 21,
    name: 'Mutual Muse Thornbury',
    address: '687 High St, Thornbury VIC 3071',
    coordinates: [144.9982, -37.7511],
    phone: '(03) 9484 2201',
    hours: '10am - 6pm',
  },
  {
    id: 22,
    name: 'Green Collect Braybrook',
    address: '75A Ashley St, Braybrook VIC 3019',
    coordinates: [144.8722, -37.7915],
    phone: '(03) 9663 8843',
    hours: '9am - 5pm',
  },
  {
    id: 23,
    name: 'Epilepsy Foundation Beaumaris',
    address: '341 Balcombe Rd, Beaumaris VIC 3193',
    coordinates: [145.0298, -37.9892],
    phone: '(03) 9589 4433',
    hours: '9:30am - 4:30pm',
  },
  {
    id: 24,
    name: 'Uniting Op Shop Albert Park',
    address: '123 Bridport St, Albert Park VIC 3206',
    coordinates: [144.9542, -37.8449],
    phone: '(03) 9696 2200',
    hours: '10am - 4pm',
  },
  {
    id: 25,
    name: 'Salvos Stores Ashburton',
    address: '235 High St, Ashburton VIC 3147',
    coordinates: [145.0792, -37.8665],
    phone: '(03) 9885 3311',
    hours: '9am - 5pm',
  },
  {
    id: 26,
    name: 'Vinnies Brunswick',
    address: '112 Sydney Rd, Brunswick VIC 3056',
    coordinates: [144.9615, -37.7712],
    phone: '(03) 9388 0211',
    hours: '9am - 5pm',
  },
  {
    id: 27,
    name: 'Sacred Heart Mission Elsternwick',
    address: '80 Glen Huntly Rd, Elsternwick VIC 3185',
    coordinates: [144.9995, -37.8842],
    phone: '(03) 9523 0055',
    hours: '10am - 5pm',
  },
  {
    id: 28,
    name: 'BASSCARE Op Shop Maling Rd',
    address: '143 Maling Rd, Canterbury VIC 3126',
    coordinates: [145.0815, -37.8252],
    phone: '(03) 9836 2644',
    hours: '10am - 4pm',
  },
  {
    id: 29,
    name: 'Hunter Gatherer Vintage',
    address: '28 Royal Arcade, Melbourne CBD VIC 3000',
    coordinates: [144.9639, -37.8142],
    phone: '(03) 9650 3244',
    hours: '10am - 5pm',
  },
  {
    id: 30,
    name: 'GoodByes Camberwell',
    address: '840 Burke Rd, Camberwell VIC 3124',
    coordinates: [145.0592, -37.8285],
    phone: '(03) 9882 1100',
    hours: '10am - 6pm',
  },
  {
    id: 31,
    name: 'Salvos Stores North Melbourne',
    address: '231 Queensberry St, North Melbourne VIC 3051',
    coordinates: [144.9555, -37.8035],
    phone: '(03) 9326 3573',
    hours: '9am - 5pm',
  },
  {
    id: 32,
    name: 'Missionpoint Yarraville',
    address: '154 Somerville Rd, Yarraville VIC 3013',
    coordinates: [144.8812, -37.8122],
    phone: '(03) 9687 4100',
    hours: '9:30am - 4:30pm',
  },
  {
    id: 33,
    name: 'Family Life Op Shop Hampton',
    address: '411 Hampton St, Hampton VIC 3188',
    coordinates: [145.0022, -37.9312],
    phone: '(03) 9598 2211',
    hours: '9:30am - 5pm',
  },
  {
    id: 34,
    name: 'Zikkies Thrift Store',
    address: '428 Sydney Rd, Coburg VIC 3058',
    coordinates: [144.9628, -37.7515],
    phone: '(03) 9354 8831',
    hours: '10am - 5pm',
  },
  {
    id: 35,
    name: 'Red Cross Shop Prahran',
    address: '182 Commercial Rd, Prahran VIC 3181',
    coordinates: [144.9912, -37.8475],
    phone: '(03) 9529 6632',
    hours: '10am - 5:30pm',
  },
  {
    id: 36,
    name: 'Trinos Op Shop Pascoe Vale',
    address: '150 Cumberland Rd, Pascoe Vale VIC 3044',
    coordinates: [144.9392, -37.7285],
    phone: '(03) 9354 2200',
    hours: '9am - 4pm',
  },
  {
    id: 37,
    name: 'Melbourne Vintage Warehouse',
    address: '513 Bridge Rd, Richmond VIC 3121',
    coordinates: [145.0062, -37.8212],
    phone: '(03) 9421 1144',
    hours: '11am - 6pm',
  },
  {
    id: 38,
    name: 'Savers Footscray Store',
    address: '33 Albert St, Footscray VIC 3011',
    coordinates: [144.8995, -37.8012],
    phone: '(03) 9689 3322',
    hours: '9am - 9pm',
  },
  {
    id: 39,
    name: 'Vinnies Newport',
    address: '3 Mason St, Newport VIC 3015',
    coordinates: [144.8835, -37.8425],
    phone: '(03) 9391 0022',
    hours: '9am - 5pm',
  },
  {
    id: 40,
    name: 'Uniting Op Shop Yarraville',
    address: '9 Anderson St, Yarraville VIC 3013',
    coordinates: [144.8895, -37.8155],
    phone: '(03) 9687 3311',
    hours: '10am - 4pm',
  },
])

const calculateDistance = (coords1, coords2) => {
  if (!coords1 || !coords2) return null
  const [lon1, lat1] = coords1
  const [lon2, lat2] = coords2
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return (R * c).toFixed(1)
}

const sortedOpShops = computed(() => {
  if (!userLocation.value) return opShops.value
  return [...opShops.value]
    .map((shop) => ({
      ...shop,
      distance: calculateDistance(userLocation.value, shop.coordinates),
    }))
    .sort((a, b) => a.distance - b.distance)
})

const updateMapMarkers = () => {
  activeMarkers.forEach((marker) => marker.remove())
  activeMarkers = []

  opShops.value.forEach((shop) => {
    const el = document.createElement('div')
    el.className = 'custom-marker-pin'
    el.innerHTML = '🛍️'

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="font-family: inherit; padding: 2px;">
          <h6 class="fw-bold mb-1" style="color: #384232;">${shop.name}</h6>
          <p class="small text-muted mb-0">${shop.address}</p>
        </div>
      `)

    const marker = new mapboxgl.Marker(el).setLngLat(shop.coordinates).setPopup(popup).addTo(map)

    el.addEventListener('click', () => {
      selectShop(shop)
    })

    activeMarkers.push(marker)
  })
}

const selectShop = (shop) => {
  selectedOpShop.value = shop
  map.flyTo({
    center: shop.coordinates,
    zoom: 14.5,
    essential: true,
  })
}

const findMyLocation = () => {
  isLoadingLocation.value = true
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser')
    isLoadingLocation.value = false
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = [position.coords.longitude, position.coords.latitude]
      userLocation.value = coords

      new mapboxgl.Marker({ color: '#384232' }).setLngLat(coords).addTo(map)

      map.flyTo({ center: coords, zoom: 12.5 })
      isLoadingLocation.value = false
    },
    () => {
      alert('Unable to fetch location details.')
      isLoadingLocation.value = false
    },
  )
}

onMounted(() => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [144.9631, -37.8136], // Hardcoded coordinates for Melbourne area
    zoom: 11.5,
  })

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search suburb or postcode...',
    types: 'postcode,district,place,locality,neighborhood,address',
  })


  if (geocoderContainer.value) {
    geocoder.addTo(geocoderContainer.value)
  }

  geocoder.on('result', (e) => {
    if (e && e.result && e.result.geometry && e.result.geometry.coordinates) {
      const coords = e.result.geometry.coordinates

      // validation of coords
      if (!isNaN(coords[0]) && !isNaN(coords[1])) {
        userLocation.value = coords
      } else {
        console.error('Geocoder returned invalid numeric coordinates:', coords)
      }
    }
  })

  //markers
  map.on('load', () => {
    updateMapMarkers()
  })
})

onUnmounted(() => {
  if (map) map.remove()
})
</script>

<style scoped>
.list-card {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(56, 66, 50, 0.1) !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-card:hover {
  transform: translateY(-2px);
  border-color: #384232 !important;
  background-color: #ffffff;
  box-shadow: 0 0.4rem 0.8rem rgba(56, 66, 50, 0.08) !important;
}
.active-card {
  border-color: #384232 !important;
  background-color: #384232 !important;
}
.active-card .shop-title,
.active-card .text-truncate-custom,
.active-card div {
  color: #ffffff !important;
  opacity: 1 !important;
}

.shop-title {
  color: #384232;
  font-size: 0.95rem;
}
.text-truncate-custom {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.search-box-wrapper :deep(.mapboxgl-ctrl-geocoder) {
  width: 260px !important;
  max-width: none !important;
  box-shadow: none !important;
  border: 1px solid rgba(56, 66, 50, 0.2);
  border-radius: 0.375rem;
  background-color: #ffffff;
}

:deep(.custom-marker-pin) {
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
}
:deep(.custom-marker-pin:hover) {
  transform: scale(1.2);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(56, 66, 50, 0.2);
  border-radius: 10px;
}
</style>
