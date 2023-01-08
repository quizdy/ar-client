<template>
  <v-container>
    <div class="map" ref="gmap"></div>
    <v-text-field solo readonly>{{ distance }}</v-text-field>
  </v-container>
</template>

<script setup lang="ts">
import { Loader } from "@googlemaps/js-api-loader";

const props = defineProps<{
  title: string;
  lat: number;
  lng: number;
  pic: string;
}>();

var beepLow: any;
var beepHigh: any;
var volume = 0.25;

const gmap = ref<HTMLElement>();
const $config = useRuntimeConfig();

let loader: any;
let pos = reactive({
  lat: 0.0,
  lng: 0.0,
  accuracy: 0,
  zoom: 20,
});

const distance = ref();

onMounted(() => {
  loader = new Loader({
    //apiKey: $config.gmapApiKey,
    apiKey: "AIzaSyCYsLDv3eHNGZ-HFcXUjoA5r442Aj10ND0",
    version: "weekly",
    libraries: ["places"],
  });

  if (navigator.geolocation && navigator.geolocation.watchPosition) {
    navigator.geolocation.watchPosition(watchPosition, watchPositionError, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    });
  }
});

const watchPositionError = (e: any) => {
  console.log("watchPositionError", e);
};

const watchPosition = (position: any) => {
  pos.lat = position.coords.latitude;
  pos.lng = position.coords.longitude;
  pos.accuracy = position.coords.accuracy;

  showMap();

  chkDistance(props.lat, props.lng, pos.lat, pos.lng);
};

const showMap = async () => {
  const mapOptions = reactive({
    center: {
      lat: pos.lat,
      lng: pos.lng,
    },
    zoom: pos.zoom,
    disableDefaultUI: true,
    zoomControl: true,
  });

  const google = await loader.load();
  const map = new google.maps.Map((gmap as any).value, mapOptions);

  google.maps.event.addListener(map, "zoom_changed", function () {
    console.log(map.getZoom());
    pos.zoom = map.getZoom();
  });

  const currentPos = new google.maps.LatLng(pos.lat, pos.lng);
  const currentMarker = new google.maps.Marker({ position: currentPos });
  currentMarker.setMap(map);

  const icon = {
    url: "/images/box.png",
    scaledSize: new google.maps.Size(40, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0),
  };

  const targetPos = new google.maps.LatLng(props.lat, props.lng);
  const targetMarker = new google.maps.Marker({
    position: targetPos,
    icon: icon,
  });
  targetMarker.setMap(map);

  new google.maps.Circle({
    map: map,
    center: currentPos,
    radius: pos.accuracy,
    strokeColor: "#0081C9",
    strokeOpacity: 0.5,
    strokeWeight: 0.75,
    fillColor: "#0081C9",
    fillOpacity: 0.18,
  });

  map.panTo(currentPos);

  console.log(pos.lat, pos.lng);
};

const chkDistance = (
  targetLatitude: number,
  targetLongitude: number,
  parentLatitude: number,
  parentLongitude: number
) => {
  distance.value = getDistance(
    targetLatitude,
    targetLongitude,
    parentLatitude,
    parentLongitude
  );

  clearInterval(beepLow);
  clearInterval(beepHigh);

  if (distance.value < 0.01) {
    beep(60, 0.5);
  } else if (distance.value < 3) {
    beep(20, 0.5);
  } else if (distance.value < 5) {
    beep(20, 0.5);
  } else if (distance.value < 8) {
    beep(20, 0.5);
  } else if (distance.value < 10) {
    beep(30, 0.5);
  } else {
    beep(360, 0.5);
  }
};

const getDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  lat1 *= Math.PI / 180;
  lng1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  lng2 *= Math.PI / 180;
  return (
    6371 *
    Math.acos(
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
        Math.sin(lat1) * Math.sin(lat2)
    )
  );
};

const beep = (tempo: number, beat: number) => {
  const low = new Audio(
    "data:audio/wav;base64,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"
  );
  const high = new Audio(
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  );

  low.volume = volume;
  high.volume = volume;

  beepLow = setInterval(() => {
    low.play();
  }, (60 / tempo) * 1000);

  beepHigh = setInterval(() => {
    // high.play();
  }, (60 / tempo) * 1000 * beat);
};
</script>

<style scoped>
.map {
  margin: 0;
  padding: 0;
  height: 80vh;
  width: 100%;
}
</style>
