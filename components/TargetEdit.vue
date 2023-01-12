<template>
  <v-container>
    <v-text-field readonly v-model="props.venue"></v-text-field>
    <v-text-field readonly v-model="props.no"></v-text-field>
    <v-text-field label="title" v-model="target.title"></v-text-field>
    <v-file-input
      accept="image/png, image/jpeg, image/bmp"
      placeholder="Pick a picture"
      prepend-icon="mdi-camera"
      label="picture"
      @change="onFileChanged"
    ></v-file-input>
    <v-text-field readonly v-model="target.lat"></v-text-field>
    <v-text-field readonly v-model="target.lng"></v-text-field>
    <v-btn @click="confirm">upload</v-btn>
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
              @click="upload"
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
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{
  venue: string;
  no: number;
  title: string;
  lat: number;
  lng: number;
  pic: string;
  comments: string;
}>();

const target = reactive({
  venue: props.venue,
  no: props.no,
  title: props.title,
  lat: props.lat,
  lng: props.lng,
  file: ref<File | null>(null),
  comments: props.comments,
});

const dialog = ref(false);

const confirm = () => {
  if (!target.title) return;
  if (!target.file) return;
  dialog.value = true;
};

const cancel = () => {
  dialog.value = false;
};

onMounted(async () => {
  if (
    !navigator.geolocation ||
    !navigator.geolocation.getCurrentPosition ||
    !navigator.geolocation.watchPosition
  )
    return;

  const position: any = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  target.lat = position.coords.latitude;
  target.lng = position.coords.longitude;
});

const onFileChanged = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  const file = files![0];
  target.file = file;
};

const emits = defineEmits<{ (e: "update", target: any): void }>();

const upload = () => {
  const reader = new FileReader();
  reader.readAsDataURL(target.file);

  reader.onload = async (e: any) => {
    target.base64 = e.currentTarget.result;
    console.log("target", target);
    const { data: result } = await useFetch("/api/target", {
      method: "POST",
      body: { target: target },
    });
  };
  dialog.value = false;
};
</script>

<style scoped lang="scss"></style>
