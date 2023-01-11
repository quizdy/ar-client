<template>
  <v-app>
    <!-- <v-app-bar app>
      <v-app-bar-title>たからさがしα</v-app-bar-title>
      <v-spacer></v-spacer>
      <div>
        <v-tabs background-color="transparent">
          <v-tab @click="chgPage('')">ヒント</v-tab>
          <v-tab @click="chgPage('targetMap')">ちず</v-tab>
          <v-tab @click="chgPage('targetScan')">カメラ</v-tab>
          <v-tab @click="chgPage('targetRegist')">とうろく</v-tab>
        </v-tabs>
      </div>
    </v-app-bar> -->
    <v-main>
      <TargetMap
        v-show="currentComponent === 'targetMap'"
        ref="refTargetMap"
        :venue="venue"
        :no="targets[0].no"
        :title="targets[0].title"
        :lat="targets[0].lat"
        :lng="targets[0].lng"
        :pic="targets[0].pic"
        :comments="targets[0].comments"
      />
      <TargetScan
        v-show="currentComponent === 'targetScan'"
        @nextTreasure="nextTreasure"
        ref="refTargetScan"
        :venue="venue"
        :no="targets[0].no"
        :title="targets[0].title"
        :lat="targets[0].lat"
        :lng="targets[0].lng"
        :pic="targets[0].pic"
        :comments="targets[0].comments"
      />
      <TargetRegist
        v-show="currentComponent === 'targetRegist'"
        @update="updateTarget"
        ref="refTargetRegist"
        :venue="venue"
        :no="targets.length + 1"
        :title="targets[0].title"
        :lat="targets[0].lat"
        :lng="targets[0].lng"
        :pic="targets[0].pic"
        :comments="targets[0].comments"
      />
      <TargetInfo
        v-show="currentComponent === ''"
        :venue="venue"
        :no="targets[0].no"
        :title="targets[0].title"
        :lat="targets[0].lat"
        :lng="targets[0].lng"
        :pic="targets[0].pic"
        :comments="targets[0].comments"
      />
      {{ jsonPath }}
    </v-main>
    <v-bottom-navigation v-model="currentComponent">
      <v-btn currentComponent="">
        <span>Hint</span>

        <v-icon>mdi-infomation</v-icon>
      </v-btn>

      <v-btn currentComponent="targetMap">
        <span>Map</span>

        <v-icon>mdi-map</v-icon>
      </v-btn>

      <v-btn currentComponent="targetScan">
        <span>Camera</span>

        <v-icon>mdi-camera</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
const venue = ref("test");
const targets: any = ref([]);
const jsonPath: any = ref("path");
const currentComponent = ref("");

const refTargetMap = ref();
const refTargetScan = ref();
const refTargetRegist = ref();

let no = 0;

const chgPage = (pageName: string) => {
  currentComponent.value = pageName;
  if (pageName === "targetScan") {
    refTargetScan.value.startVideoMethod();
  } else {
    refTargetScan.value.stopVideoMethod();
  }
};

const updateTarget = (updateTarget?: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(updateTarget.file);

  reader.onload = async (e: any) => {
    updateTarget.base64 = e.currentTarget.result;
    console.log("updateTarget", updateTarget);
    const { data: res } = await useFetch("/api/targets", {
      method: "POST",
      body: { target: updateTarget },
    });
  };
};

const nextTreasure = () => {
  if (no < targets.value.length) {
    no++;
    alert("Go to next point");
    chgPage("");
  } else {
    alert("clear!!!");
  }
};

const { data: res } = await useFetch("/api/targets", {
  method: "GET",
  params: { venue: venue },
});

venue.value = res.value?.json.venue;
targets.value = res.value?.json.targets;
jsonPath.value = res.value?.json.jsonPath;
</script>

<style scoped lang="scss"></style>
