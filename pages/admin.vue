<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>{{
        venue === "" ? "Venue List" : venue
      }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!venue" @click="logout"><v-icon>mdi-door</v-icon></v-btn>
      <v-btn v-if="venue && target === null" @click="backVenueList"
        ><v-icon>mdi-arrow-left-circle</v-icon></v-btn
      >
      <v-btn v-if="venue && target !== null" @click="backTargetList"
        ><v-icon>mdi-arrow-left-circle</v-icon></v-btn
      >
    </v-app-bar>
    <v-main>
      <VenueList v-if="!venue" @setVenue="setVenue" />
      <TargetList
        v-if="venue && target === null"
        :venue="venue"
        @setTarget="setTarget"
      />
      <TargetEdit
        v-if="venue && target !== null"
        :venue="venue"
        :no="target.no"
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
const venue = ref("");
const target = ref(null);

const reftargetList = ref();

const setVenue = (json: any) => {
  venue.value = json.venue;
};

const setTarget = (t: any) => {
  target.value = t;
};

const logout = () => {
  navigateTo({
    path: "/",
  });
};

const backVenueList = () => {
  venue.value = "";
  target.value = null;
};

const backTargetList = () => {
  target.value = null;
};
</script>

<style scoped lang="scss"></style>
