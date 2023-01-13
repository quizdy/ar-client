<template>
  <div>
    <v-sheet>
      <v-card class="ma-2">
        <template v-for="(t, i) in targets">
          <v-list>
            <v-list-item
              :title="t.title"
              :prepend-avatar="t.pic"
              @click="selectedTarget(t)"
            >
            </v-list-item>
          </v-list>
          <v-divider v-if="i < targets.length - 1" :key="i"></v-divider>
        </template>
      </v-card>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
const emitTarget = defineEmits<{ (e: "editTarget", t: any): void }>();

const props = defineProps<{
  venue: string;
}>();

const targets = ref([]);

const { data: res } = await useFetch("/api/targets", {
  method: "GET",
  params: { venue: props.venue },
});

targets.value = res.value?.targets;

const selectedTarget = (t: any) => {
  emitTarget("editTarget", t);
};
</script>

<style scoped lang="scss"></style>
