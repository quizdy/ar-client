<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>{{ venue === "" ? "会場一覧" : venue }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!venue" @click="showVenueEdit(true)"
        ><v-icon>mdi-plus-circle</v-icon></v-btn
      >
      <v-btn v-if="!venue" @click="logout"><v-icon>mdi-door</v-icon></v-btn>
      <v-btn v-if="venue" @click="addTarget()"
        ><v-icon>mdi-plus-circle</v-icon></v-btn
      >
      <v-btn v-if="venue" @click="backVenueList"
        ><v-icon>mdi-arrow-left-circle</v-icon></v-btn
      >
    </v-app-bar>
    <v-main>
      <VenueList
        v-if="!venue"
        @selectedVenue="selectedVenue"
        ref="refVenueList"
      />
      <TargetList
        v-if="venue"
        :venue="venue"
        @editTarget="editTarget"
        ref="refTargetList"
      />
    </v-main>
    <client-only>
      <v-dialog v-model="venueEditDialog" persistent>
        <VenueEdit :venue="venue" @showVenueEdit="showVenueEdit" />
      </v-dialog>
      <v-dialog v-model="targetEditDialog" persistent>
        <TargetEdit
          :venue="venue"
          :target="target"
          @showTargetEdit="showTargetEdit"
        />
      </v-dialog>
    </client-only>
  </v-app>
</template>

<script setup lang="ts">
const venue = ref("");
const target = ref();
const venueEditDialog = ref(false);
const targetEditDialog = ref(false);
const refVenueList = ref();
const refTargetList = ref();

const showVenueEdit = (s: boolean) => {
  venueEditDialog.value = s;
  if (!s) refVenueList.value.getVenues();
};

const showTargetEdit = (s: boolean) => {
  targetEditDialog.value = s;
  if (!s) refTargetList.value.getTargets();
};

const selectedVenue = (v: string) => {
  venue.value = v;
};

const editTarget = (t: any) => {
  target.value = t;
  showTargetEdit(true);
};

const addTarget = async () => {
  const { data: res } = await useFetch("/api/GetTargets", {
    method: "GET",
    params: { venue: venue.value },
  });

  target.value = {
    no: res.value?.targets.length + 1,
    title: "",
    lat: 0.0,
    lng: 0.0,
    image: "",
    comments: "",
  };
  showTargetEdit(true);
};

const backVenueList = () => {
  venue.value = "";
  target.value = null;
};

const logout = () => {
  navigateTo({
    path: "/",
  });
};
</script>

<style scoped lang="scss"></style>
