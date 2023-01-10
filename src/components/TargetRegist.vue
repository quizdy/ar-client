<template>
  <v-container>
    <v-text-field readonly v-model="props.venue"></v-text-field>
    <v-text-field label="name" v-model="target.title"></v-text-field>
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
    <v-dialog v-model="dialog" persistent max-width="400px">
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
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{
  venue: string;
  title: string;
  lat: number;
  lng: number;
  pic: string;
  comments: string;
}>();

const target = reactive({
  venue: props.venue,
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

onMounted(() => {
  if (navigator.geolocation && navigator.geolocation.watchPosition) {
    navigator.geolocation.watchPosition((position) => {
      target.lat = position.coords.latitude;
      target.lng = position.coords.longitude;
    });
  }
});

const onFileChanged = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  const file = files![0];
  target.file = file;
};

const emits = defineEmits<{ (e: "update", target: any): void }>();

const upload = () => {
  emits("update", target);
  dialog.value = false;
};
</script>

<style scoped lang="scss"></style>
