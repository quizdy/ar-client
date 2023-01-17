<template>
  <div>
    <v-sheet>
      <v-card class="ma-2">
        <template v-for="(v, i) in venues">
          <v-list>
            <v-list-item :title="v" @click="selectedVenue(v)">
              <template v-slot:append>
                <v-btn
                  color="grey-lighten-1"
                  icon="mdi-delete"
                  variant="text"
                  @click.stop="delVenue(v)"
                ></v-btn> </template
            ></v-list-item>
          </v-list>
          <v-divider v-if="i < venues.length - 1" :key="i"></v-divider>
        </template>
      </v-card>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
const emitVenue = defineEmits<{
  (e: "selectedVenue", venue: string): void;
  (e: "editVenue", venue: string): void;
}>();

const $config = useRuntimeConfig();
const venues = ref([]);

const selectedVenue = (venue: string) => {
  emitVenue("selectedVenue", venue);
};

const getVenues = async () => {
  const { data: res } = await useFetch($config.API_URL + "/venues", {
    method: "GET",
  });

  venues.value = res.value?.venues;
};

const delVenue = async (venue: string) => {
  const { data: res } = await useFetch($config.API_URL + "/delete-venue", {
    method: "POST",
    body: { venue: venue },
  });

  getVenues();
};

nextTick(() => {
  getVenues();
});

defineExpose({
  getVenues,
});
</script>

<style scoped lang="scss"></style>
