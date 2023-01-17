<template>
  <v-app>
    <v-main>
      <TargetMap
        v-show="currentComponent === 'targetMap'"
        ref="refTargetMap"
        :venue="venue"
        :no="targets[0].no"
        :title="targets[0].title"
        :lat="targets[0].lat"
        :lng="targets[0].lng"
        :image="targets[0].image"
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
        :image="targets[0].image"
        :comments="targets[0].comments"
      />
      <TargetInfo
        v-show="currentComponent === ''"
        :venue="venue"
        :no="targets[0].no"
        :title="targets[0].title"
        :lat="targets[0].lat"
        :lng="targets[0].lng"
        :image="targets[0].image"
        :comments="targets[0].comments"
      />
    </v-main>
    <v-bottom-navigation v-model="currentComponent">
      <v-btn currentComponent="" @click="chgPage('')">
        <v-icon>mdi-information</v-icon>
        <span>Info</span>
      </v-btn>
      <v-btn currentComponent="targetMap" @click="chgPage('targetMap')">
        <v-icon>mdi-map-marker</v-icon>
        <span>Map</span>
      </v-btn>
      <v-btn currentComponent="targetScan" @click="chgPage('targetScan')">
        <v-icon>mdi-magnify-scan</v-icon>
        <span>Scan</span>
      </v-btn>
      <v-btn currentComponent="logout" @click="chgPage('logout')">
        <v-icon>mdi-door</v-icon>
        <span>Logout</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
const route = useRoute();
const venue = ref(route.query.venue ? route.query.venue : "");
const targets = ref([]);
const currentComponent = ref("");

const refTargetMap = ref();
const refTargetScan = ref();

let no = 0;

const chgPage = (pageName: string) => {
  if (pageName === "logout") {
    navigateTo({
      path: "/",
    });
    return;
  }
  currentComponent.value = pageName;
  if (pageName === "targetScan") {
    refTargetScan.value.startVideoMethod();
  } else {
    refTargetScan.value.stopVideoMethod();
  }
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

venue.value = res.value?.venue;
targets.value = res.value?.targets;
</script>

<style scoped lang="scss"></style>
