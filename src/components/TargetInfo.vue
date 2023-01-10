<template>
  <v-container>
    <v-card class="mb-4" height="70vh" width="100%">
      <v-img :src="props.pic"></v-img>
    </v-card>
    <v-text-field solo readonly v-model="props.title"></v-text-field>
    <v-text-field solo readonly v-model="props.comments"></v-text-field>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{
  venue: string;
  title: string;
  lat: number;
  lng: number;
  pic: string;
  comments: string;
}>();
</script>

<style scoped lang="scss"></style>
