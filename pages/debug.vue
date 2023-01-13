<template>
  <v-app>{{ venues }}</v-app>
</template>

<script setup lang="ts">
const { data: res } = await useFetch("/api/venues", {
  method: "GET",
});

const venues = ref([]);
const venues = res.value?.jsons;
</script>