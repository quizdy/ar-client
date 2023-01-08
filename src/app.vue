<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>たからさがしα</v-app-bar-title>
      <v-spacer></v-spacer>
      <div>
        <v-tabs background-color="transparent">
          <v-tab @click="chgPage('')">ヒント</v-tab>
          <v-tab @click="chgPage('map')">ちず</v-tab>
          <v-tab @click="chgPage('camera')">カメラ</v-tab>
          <v-tab @click="chgPage('admin')">アップロード</v-tab>
        </v-tabs>
      </div>
    </v-app-bar>
    <v-main>
      <Map
        v-show="currentComponent === 'map'"
        ref="mapRef"
        :title="targets[0].title"
        :lat="targets[0].lat"
        :lng="targets[0].lng"
        :pic="targets[0].pic"
      />
      <Camera
        v-show="currentComponent === 'camera'"
        ref="cameraRef"
        :title="targets[0].title"
        :lat="targets[0].lat"
        :lng="targets[0].lng"
        :pic="targets[0].pic"
      />
      <Admin v-show="currentComponent === 'admin'" @update="update" />
      <Hint
        v-show="currentComponent === ''"
        :title="targets[0].title"
        :lat="targets[0].lat"
        :lng="targets[0].lng"
        :pic="targets[0].pic"
      />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const targets = [
  {
    title: "オンデイズ",
    lat: 35.16105678202227,
    lng: 136.98562526441762,
    pic: "/images/20220422133654_061702_30028589.jpg",
    distance: 0.0,
  },
];

const cameraRef = ref();
const mapRef = ref();

let currentComponent = ref("");

const chgPage = (pageName: string) => {
  currentComponent.value = pageName;
  if (pageName === "camera") {
    cameraRef.value.startVideoMethod();
  } else {
    cameraRef.value.stopVideoMethod();
  }
};

// Test
const update = (value?: string) => {
  console.log(value);
};
</script>

<style scoped lang="scss"></style>
