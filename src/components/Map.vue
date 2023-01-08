<script setup lang="ts">
import { Loader } from "@googlemaps/js-api-loader";

const target = {
  lat: 35.16105678202227,
  lng: 136.98562526441762,
  title: "オンデイズ",
};

const gmap = ref<HTMLElement>();
const $config = useRuntimeConfig();

let loader: any;
let pos = reactive({
  lat: 0.0,
  lng: 0.0,
});

onMounted(() => {
  loader = new Loader({
    //apiKey: $config.gmapApiKey,
    apiKey: "AIzaSyCYsLDv3eHNGZ-HFcXUjoA5r442Aj10ND0",
    version: "weekly",
    libraries: ["places"],
  });

  showMap();
});

const showMap = () => {
  if (navigator.geolocation && navigator.geolocation.watchPosition) {
    navigator.geolocation.watchPosition((position) => {
      pos.lat = position.coords.latitude;
      pos.lng = position.coords.longitude;

      loader
        .load()
        .then((google: any) => {
          const mapOptions = reactive({
            center: {
              lat: pos.lat,
              lng: pos.lng,
            },
            zoom: 20,
            disableDefaultUI: true,
            zoomControl: true,
          });

          console.log(mapOptions.center.lat, mapOptions.center.lng);
          const map = new google.maps.Map((gmap as any).value, mapOptions);

          const markerOptions = {
            position: {
              lat: pos.lat,
              lng: pos.lng,
            },
            map,
            title: "now",
          };

          new google.maps.Marker(markerOptions);

          const markerOptions2 = {
            position: {
              lat: target.lat,
              lng: target.lng,
            },
            map,
            title: target.title,
            icon: {
              url: "/_nuxt/assets/images/pin.png",
            },
          };

          new google.maps.Marker(markerOptions2);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    });
  }
};
</script>

<template>
  <div class="container">
    <div class="map" ref="gmap"></div>
    <v-btn @click="showMap">reload</v-btn>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.map {
  margin: 0;
  padding: 0;
  height: 80vh;
  width: 100%;
}
</style>
