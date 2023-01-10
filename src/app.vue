<template>
  <v-app>
    <v-app-bar app>
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
    </v-app-bar>
    <v-main>
      <TargetMap
        v-show="currentComponent === 'targetMap'"
        ref="refTargetMap"
        :venue="target.venue"
        :title="target.title"
        :lat="target.lat"
        :lng="target.lng"
        :pic="target.pic"
        :comments="target.comments"
      />
      <TargetScan
        v-show="currentComponent === 'targetScan'"
        @nextTreasure="nextTreasure"
        ref="refTargetScan"
        :venue="target.venue"
        :title="target.title"
        :lat="target.lat"
        :lng="target.lng"
        :pic="target.pic"
        :comments="target.comments"
      />
      <TargetRegist
        v-show="currentComponent === 'targetRegist'"
        @update="updateTarget"
        ref="refTargetRegist"
        :venue="target.venue"
        :title="target.title"
        :lat="target.lat"
        :lng="target.lng"
        :pic="target.pic"
        :comments="target.comments"
      />
      <TargetInfo
        v-show="currentComponent === ''"
        :venue="target.venue"
        :title="target.title"
        :lat="target.lat"
        :lng="target.lng"
        :pic="target.pic"
        :comments="target.comments"
      />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const venue = "test";
const targets: any = ref([]);
const currentComponent = ref("");

const refTargetMap = ref();
const refTargetScan = ref();
const refTargetRegist = ref();

let no = 0;
const target = reactive({
  venue: "",
  title: "",
  lat: 0.0,
  lng: 0.0,
  pic: "",
  comments: "",
});

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
    console.log(updateTarget);
    const { data: res } = await useFetch("/api/target", {
      method: "POST",
      body: { target: updateTarget },
    });
  };
};

const readTarget = async (value?: any) => {
  const { data: res } = await useFetch("/api/targets", {
    method: "GET",
    params: { venue: venue },
  });

  targets.value = res.value?.targets.targets;

  target.venue = targets.value[no].venue;
  target.title = targets.value[no].title;
  target.lat = targets.value[no].lat;
  target.lng = targets.value[no].lng;
  target.pic = targets.value[no].pic;
  target.comments = targets.value[no].comments;
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

readTarget();
</script>

<style scoped lang="scss"></style>
