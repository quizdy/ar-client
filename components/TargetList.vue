<template>
  <div>
    <v-sheet>
      <v-card class="ma-2">
        <template v-for="(t, i) in targets" :key="i">
          <v-list>
            <v-list-item
              :title="t.title"
              :prepend-avatar="$config.API_URL + t.image"
              @click="selectedTarget(t)"
            >
              <template v-slot:append>
                <v-btn
                  color="grey-lighten-1"
                  icon="mdi-delete"
                  variant="text"
                  @click.stop="delTarget(t)"
                ></v-btn>
              </template>
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

const selectedTarget = (t: any) => {
  emitTarget("editTarget", t);
};

const getTargets = async () => {
  const { data: res } = await useFetch("/api/GetTargets", {
    method: "GET",
    params: { venue: props.venue },
  });

  targets.value = res.value?.targets;
};

const delTarget = async (target: any) => {
  const { data: res } = await useFetch("/api/DeleteTarget", {
    method: "POST",
    body: { venue: props.venue, target: target },
  });

  getTargets();
};

nextTick(() => {
  getTargets();
});

defineExpose({
  getTargets,
});
</script>

<style scoped lang="scss"></style>
