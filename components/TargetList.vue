<template>
  <div>
    <v-card class="ma-2">
      <template v-for="(t, i) in targets">
        <v-list lines="one">
          <v-list-item
            :key="t.no"
            :title="t.title"
            :prepend-avatar="t.pic"
            @click="selectedTarget(t)"
          >
          </v-list-item>
        </v-list>
        <v-divider v-if="i < t.length - 1" :key="t.no"></v-divider>
      </template>
    </v-card>
    <v-btn class="btnAddTarget" @click="addTarget()"
      ><v-icon>mdi-plus-circle</v-icon></v-btn
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  venue: string;
}>();

const emits = defineEmits<{ (e: "setTarget"): void }>();

const targets = ref([]);

const { data: res } = await useFetch("/api/targets", {
  method: "GET",
  params: { venue: props.venue },
});

targets.value = res.value?.json.targets;

const selectedTarget = (t: any) => {
  emits("setTarget", t);
};

const addTarget = () => {
  const t = {
    venue: props.venue,
    no: targets.value.length + 1,
    title: "",
    lat: 0.0,
    lng: 0.0,
    pic: "",
    comments: "",
  };
  emits("setTarget", t);
};
</script>

<style scoped lang="scss">
.btnAddTarget {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
</style>
