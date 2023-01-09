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
        :title="targets[no].title"
        :lat="targets[no].lat"
        :lng="targets[no].lng"
        :pic="targets[no].pic"
      />
      <Camera
        v-show="currentComponent === 'camera'"
        @nextTreasure="nextTreasure"
        ref="cameraRef"
        :title="targets[no].title"
        :lat="targets[no].lat"
        :lng="targets[no].lng"
        :pic="targets[no].pic"
        :gap="gap"
      />
      <Admin
        v-show="currentComponent === 'admin'"
        :gap="gap"
        @update="update"
      />
      <Hint
        v-show="currentComponent === ''"
        :title="targets[no].title"
        :lat="targets[no].lat"
        :lng="targets[no].lng"
        :pic="targets[no].pic"
      />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const cameraRef = ref();
const mapRef = ref();
let targets: any = ref([]);
let no = 0;

let currentComponent = ref("");
const gap = ref(0);

const chgPage = (pageName: string) => {
  currentComponent.value = pageName;
  if (pageName === "camera") {
    cameraRef.value.startVideoMethod();
  } else {
    cameraRef.value.stopVideoMethod();
  }
};

const update = (value?: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(value.file);

  reader.onload = async (e: any) => {
    value.base64 = e.currentTarget.result;
    const { data: res } = await useFetch("/api/targets", {
      method: "POST",
      body: { value: value },
    });
  };
};

const nextTreasure = () => {
  if (no < targets.length) {
    no++;
    alert("Go to next point");
    chgPage("");
  } else {
    alert("clear!!!");
  }

  console.info("no", no);
};

const code = ref("1");
const { data: res } = await useFetch("/api/targets", {
  method: "GET",
  params: { no: 1 },
});

targets = res.value?.targets.targets;
</script>

<style scoped lang="scss"></style>
