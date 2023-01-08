<template>
  <v-container>
    <v-text-field label="name">{{ gps.name }}</v-text-field>
    <v-file-input
      :rules="[
        (value) =>
          !value || value.size >= 10000000 || 'Size should be less than 10 MB!',
      ]"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick a picture"
      prepend-icon="mdi-camera"
      label="picture"
      @change="onFileChanged"
    ></v-file-input>
    <v-text-field readonly>{{ gps.lat }}</v-text-field>
    <v-text-field readonly>{{ gps.lng }}</v-text-field>
    <v-btn @click="upload">upload</v-btn>
  </v-container>
</template>

<script setup lang="ts">
const gps = reactive({
  name: "",
  lat: 0.0,
  lng: 0.0,
  file: ref<File | null>(null),
});

onMounted(() => {
  if (navigator.geolocation && navigator.geolocation.watchPosition) {
    navigator.geolocation.watchPosition((position) => {
      gps.lat = position.coords.latitude;
      gps.lng = position.coords.longitude;
    });
  }
});

const onFileChanged = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  const file = files![0];
  gps.file = file;
};

const upload = () => {
  console.log(gps.file);
};
</script>

<style scoped lang="scss"></style>
