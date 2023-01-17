<template>
  <v-app>
    <div>
      {{ msg }}
    </div>
    <v-file-input
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick a picture"
      prepend-icon="mdi-camera"
      @change="onTargetFileChanged"
    ></v-file-input>
    <v-btn @click="updateTarget">aaaaaaa</v-btn>
  </v-app>
</template>

<script setup lang="ts">
const msg = ref();

const venue = "a";

const target = reactive({
  no: 1,
  title: "1",
  lat: "1",
  lng: "1",
  comments: "1",
  base64: "",
});

const tmp = ref<File | null>(null);

// const URL = "https://treasurehunting2023.azurewebsites.net";
// console.log("aaa");
// const { data: res } = await useFetch("/api/venues", {
//   method: "GET",
// });
// console.log(res.value);
// msg.value = res.value?.venues;

// console.log("bbb");
// const { data: res } = await useFetch("/api/venue", {
//   method: "POST",
//   body: { venue: venue },
// });
// console.log(res.value);

const { data: result } = await useFetch("/api/delete-venue", {
  method: "POST",
  body: { venue: venue },
});

// const updateTarget = () => {
//   const reader = new FileReader();
//   reader.readAsDataURL(tmp.value);

//   reader.onload = async (e: any) => {
//     target.base64 = e.currentTarget.result;
//     const { data: result } = await useFetch(URL + "/update-target", {
//       method: "POST",
//       // body: { venue: venue, target: target },
//       body: {
//         venue: venue,
//         target: {
//           no: 3333,
//           title: "33",
//           lat: "33",
//           lng: "33",
//           image: "/images/33333333.png",
//           base64: e.currentTarget.result,
//           comments: "3333",
//         },
//       },
//     });
//     console.log(result);
//   };
// };

// const { data: result } = await useFetch("http://localhost:3001/delete-target", {
//   method: "POST",
//   body: {
//     venue: venue,
//     target: {
//       no: 2,
//       title: "33",
//       lat: "3",
//       lng: "3",
//       image: "/images/3.png",
//       base64: "data:image",
//       comments: "3",
//     },
//   },
// });

// const { data: result } = await useFetch("http://localhost:3001/venues", {
//   method: "GET",
// });

// const { data: result } = await useFetch("http://localhost:3001/targets", {
//   method: "GET",
//   body: { venue: venue },
// });

const onTargetFileChanged = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  const file = files![0];
  tmp.value = file;
};
</script>

<style scoped lang="scss"></style>
