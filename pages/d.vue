<template>
  <v-app>
    <div>
      {{ msg }}
    </div>
  </v-app>
</template>

<script setup lang="ts">
const msg = ref();
const venue = "test";
// const { data: result } = await useFetch("http://localhost:3001/update-venue", {
//   method: "POST",
//   body: { venue: venue },
// });

// const { data: result } = await useFetch("http://localhost:3001/delete-venue", {
//   method: "POST",
//   body: { venue: venue },
// });

// const { data: result } = await useFetch("http://localhost:3001/update-target", {
//   method: "POST",
//   body: {
//     venue: venue,
//     target: {
//       no: 1,
//       title: "11",
//       lat: "1",
//       lng: "1",
//       pic: "/images/aa.png",
//       base64: "data:image",
//       comments: "gg",
//     },
//   },
// });

const { data: result } = await useFetch("http://localhost:3001/delete-target", {
  method: "POST",
  body: {
    venue: venue,
    target: {
      no: 2,
      title: "11",
      lat: "1",
      lng: "1",
      pic: "/images/aa.png",
      base64: "data:image",
      comments: "gg",
    },
  },
});

// const { data: result } = await useFetch("http://localhost:3001/venues", {
//   method: "GET",
// });

// const { data: result } = await useFetch("http://localhost:3001/targets", {
//   method: "GET",
//   body: { venue: venue },
// });
msg.value = result.value;
console.log(result.value);
</script>

<style scoped lang="scss"></style>
