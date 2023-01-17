<template>
  <v-container>
    <v-card class="d-flex flex-column justify-center pa-2">
      <v-card-title>
        <span class="headline">会場の登録</span>
      </v-card-title>
      <v-text-field v-model="venue" variant="outlined"></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          prepend-icon="mdi-check-bold"
          rounded="pill"
          variant="outlined"
          @click="confirmVenue"
          >登録</v-btn
        >
        <v-btn
          prepend-icon="mdi-close-thick"
          rounded="pill"
          variant="outlined"
          @click="emit('showVenueEdit', false)"
          >キャンセル</v-btn
        >
      </v-card-actions>
    </v-card>
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
              @click="cancelVenue"
              >いいえ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="snackbar.show"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
      >
        {{ snackbar.msg }}
      </v-snackbar>
    </client-only>
  </v-container>
</template>

<script setup lang="ts">
const propsVenue = defineProps<{
  venue: string;
}>();

const venue = ref(propsVenue.venue);
const dialog = ref(false);
const snackbar = reactive({
  show: false,
  timeout: 2000,
  color: "",
  msg: "",
});

const emit = defineEmits<{ (e: "showVenueEdit", s: boolean): void }>();

const confirmVenue = () => {
  if (!venue.value) {
    snackbar.msg = "名称を入力してください";
    snackbar.color = "error";
    snackbar.show = true;
    return;
  }
  dialog.value = true;
};

const cancelVenue = () => {
  dialog.value = false;
};

const updateVenue = async () => {
  const { data: res } = await useFetch("/api/UpdateVenue", {
    method: "POST",
    body: { venue: venue },
  });
  dialog.value = false;
  emit("showVenueEdit", false);
};
</script>

<style scoped lang="scss"></style>
