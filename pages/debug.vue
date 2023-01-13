<template>
  <v-app>{{ aaa }}</v-app>
</template>

<script setup lang="ts">
const { data: res } = await useFetch("/api/venues", {
  method: "GET",
});

const venues = ref([]);
console.log(res.value?.jsons);
const aaa = res.value?.jsons;
</script>