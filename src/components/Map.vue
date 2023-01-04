<script setup lang="ts">
import { Loader } from "@googlemaps/js-api-loader";

const gmap = ref<HTMLElement>();

const config = useRuntimeConfig();

onMounted(() => {
  const loader = new Loader({
    apiKey: config.gmapApiKey,
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
        zoom: 15,
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
            title: "aaaaaa",
          };

          new google.maps.Marker(markerOptions);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }
});
</script>

<template>
  <div ref="gmap"></div>
</template>

<style scoped>
div {
  height: 300px;
  width: 300px;
}
</style>
