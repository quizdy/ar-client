<template>
  <div>
    <v-card class="ma-2">
      <template v-for="(v, i) in venues">
        <v-list lines="one">
          <v-list-item
            :key="i"
            :title="v.title"
            @click="selectedVenue(v.title)"
          >
          </v-list-item>
        </v-list>
        <v-divider v-if="i < v.length - 1" :key="i"></v-divider>
      </template>
    </v-card>
    <div class="footer">
      <v-text-field
        v-model="venue"
        max-heigth="36px"
        max-width="120px"
      ></v-text-field>
      <v-btn max-heigth="36px" max-width="36px" @click="showDialog"
        ><v-icon>mdi-plus-circle</v-icon></v-btn
      >
    </div>
    <client-only>
      <v-dialog v-model="dialog" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">登録</span>
          </v-card-title>
          <v-card-text> 登録しますか？ </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              class="dialog-Button"
              flat
              @click="updateVenue"
              >はい</v-btn
            >
            <v-btn
              color="blue darken-1"
              class="dialog-Button"
              flat
              @click="cancel"
              >いいえ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </client-only>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{ (e: "setVenue"): void }>();

const venues = ref([]);
const venue = ref("");
const dialog = ref(false);

const { data: res } = await useFetch("/api/venues", {
  method: "GET",
});

venues.value = res.value?.venues;

const selectedVenue = async (title: string) => {
  const { data: res } = await useFetch("/api/targets", {
    method: "GET",
    params: { venue: title },
  });
  emits("setVenue", res.value?.json);
};

const showDialog = () => {
  dialog.value = true;
};

const updateVenue = async () => {
  const { data: result } = await useFetch("/api/venue", {
    method: "POST",
    body: { venue: venue },
  });
  const { data: res } = await useFetch("/api/venues", {
    method: "GET",
  });
  venues.value = res.value?.venues;
  dialog.value = false;
};

const cancel = () => {
  dialog.value = false;
};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
