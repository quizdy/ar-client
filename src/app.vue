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
      <v-container>
        <Map v-show="currentComponent === 'map'" />
        <Camera v-show="currentComponent === 'camera'" ref="camera" />
        <Admin v-show="currentComponent === 'admin'" />
        <Hint v-show="currentComponent === ''" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const hint = resolveComponent("Hint");
const map = resolveComponent("Map");
const camera = resolveComponent("Camera");

let currentComponent = ref("");

const chgPage = (pageName: string) => {
  currentComponent.value = pageName;
  if (pageName === "camera") {
  } else {
  }
};
</script>

<style scoped lang="scss"></style>
