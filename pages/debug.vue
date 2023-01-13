<template>
  <v-app>{{ venues }}</v-app>
</template>

<script setup lang="ts">
const { data: res } = await useFetch("/api/venues", {
  method: "GET",
});

const venues = ref([]);
console.log(res.value?.jsons);
</script>