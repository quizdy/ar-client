<template>
  <v-container>
    <v-card class="d-flex flex-column justify-center pa-2">
      <v-card-title>
        <span class="headline">ターゲットの登録</span>
      </v-card-title>
      <v-row>
        <v-col>
          <v-text-field readonly v-model="target.no"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="target.title"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick a picture"
            prepend-icon="mdi-camera"
            @change="onTargetFileChanged"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="target.lat"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="target.lng"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              prepend-icon="mdi-check-bold"
              rounded="pill"
              variant="outlined"
              @click="confirmTarget"
              >登録</v-btn
            >
            <v-btn
              prepend-icon="mdi-close-thick"
              rounded="pill"
              variant="outlined"
              @click="emit('showTargetEdit', false)"
              >キャンセル</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
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
              @click="updateTarget"
              >はい</v-btn
            >
            <v-btn
              color="blue darken-1"
              class="dialog-Button"
              flat
              @click="cancelTarget"
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
const propsTarget = defineProps<{
  venue: string;
  target: any;
}>();

const venue = ref(propsTarget.venue);

const target = reactive({
  no: propsTarget.target.no,
  title: propsTarget.target.title,
  lat: propsTarget.target.lat,
  lng: propsTarget.target.lng,
  file: ref<File | null>(null),
  comments: propsTarget.target.comments,
  base64: "",
});

const dialog = ref(false);

const snackbar = reactive({
  show: false,
  timeout: 2000,
  color: "",
  msg: "",
});

const emit = defineEmits<{ (e: "showTargetEdit", s: boolean): void }>();

const confirmTarget = () => {
  if (!target.title) {
    snackbar.msg = "title is invalid";
    snackbar.color = "error";
    snackbar.show = true;
    return;
  }
  if (!target.file) {
    snackbar.msg = "image is invalid";
    snackbar.color = "error";
    snackbar.show = true;
    return;
  }
  dialog.value = true;
};

const cancelTarget = () => {
  dialog.value = false;
};

const onTargetFileChanged = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  const file = files![0];
  target.file = file;
};

const updateTarget = () => {
  if (target.file === null) {
    snackbar.msg = "image is invalid";
    snackbar.color = "error";
    snackbar.show = true;
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(target.file);

  reader.onload = async (e: any) => {
    target.base64 = e.currentTarget.result;
    const { data: res } = await useFetch("/api/UpdateTarget", {
      method: "POST",
      body: { venue: venue, target: target },
    });

    dialog.value = false;
    emit("showTargetEdit", false);
  };
};

onMounted(async () => {
  if (!navigator.geolocation || !navigator.geolocation.getCurrentPosition)
    return;

  const position: any = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  if (target.lat === 0 && target.lng === 0) {
    target.lat = position.coords.latitude;
    target.lng = position.coords.longitude;
  }
});
</script>

<style scoped lang="scss"></style>
