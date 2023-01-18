<template>
  <v-app>
    <v-main>
      <TargetMap
        v-show="currentComponent === 'targetMap'"
        ref="refTargetMap"
        :venue="venue"
        :no="targets[pos].no"
        :title="targets[pos].title"
        :lat="targets[pos].lat"
        :lng="targets[pos].lng"
        :image="targets[pos].image"
        :comments="targets[pos].comments"
      />
      <TargetScan
        v-show="currentComponent === 'targetScan'"
        @nextTreasure="nextTreasure"
        ref="refTargetScan"
        :venue="venue"
        :no="targets[pos].no"
        :title="targets[pos].title"
        :lat="targets[pos].lat"
        :lng="targets[pos].lng"
        :image="targets[pos].image"
        :comments="targets[pos].comments"
      />
      <TargetInfo
        v-show="currentComponent === ''"
        :venue="venue"
        :pos="pos"
        :targets="targets"
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

let pos = 0;

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
  if (pos < targets.value.length) {
    pos++;
    alert("Go to next point");
    chgPage("");
  } else {
    alert("clear!!!");
  }
};

const { data: res } = await useFetch("/api/GetTargets", {
  method: "GET",
  params: { venue: venue },
});

venue.value = res.value?.venue;
targets.value = res.value?.targets;
</script>

<style scoped lang="scss"></style>
