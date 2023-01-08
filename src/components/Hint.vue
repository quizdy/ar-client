<template>
  <v-container>
    <v-text-field solo readonly>{{ props.title }}</v-text-field>
    <img :src="props.pic" />
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  lat: number;
  lng: number;
  pic: string;
}>();
</script>

<style scoped lang="scss">
img {
  height: auto;
  width: 80vw;
}
</style>
