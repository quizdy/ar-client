<script setup lang="ts">
import { Loader } from "@googlemaps/js-api-loader";

const target = {
  lat: 35.189346130029506, 
  lng: 136.98874682457898,
  title: "home",
}

const gmap = ref<HTMLElement>();

const $config = useRuntimeConfig();

onMounted(() => {
  const loader = new Loader({
    apiKey: $config.gmapApiKey,
    version: "weekly",
    libraries: ["places"],
  });

  if (navigator.geolocation && navigator.geolocation.watchPosition) {
    navigator.geolocation.watchPosition((position) => {
      const mapOptions = {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 20,
        disableDefaultUI: true,
      };

      loader
        .load()
        .then((google) => {
          const map = new google.maps.Map((gmap as any).value, mapOptions);

          const markerOptions = {
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
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
          };

          new google.maps.Marker(markerOptions2);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }
});
</script>

<template>
  <div class="container">
    <div class="map" ref="gmap"></div>
    <div class="footer">
      <button>hint</button>
      <button>camera</button>
    </div>
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
  height: 90vh;
  width: 100%;
}

button {
  margin: .5rem;
  border-radius: 1rem;
}
</style>
