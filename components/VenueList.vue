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

const venues = ref([]);

const { data: res } = await useFetch("/api/venues", {
  method: "GET",
});

venues.value = res.value?.venues;

const selectedVenue = (venue: string) => {
  emitVenue("selectedVenue", venue);
};

const delVenue = async (venue: string) => {
  const { data: result } = await useFetch("/api/venue", {
    method: "POST",
    body: { method: "del", venue: venue },
  });
};
</script>

<style scoped lang="scss"></style>
