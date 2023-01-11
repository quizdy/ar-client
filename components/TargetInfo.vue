<template>
  <div>
    <v-card class="mx-auto my-12" max-width="374">
      <v-img height="250" :src="props.pic"></v-img>

      <v-card-title>{{ props.title }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ms-4">4.5 (413)</div>
        </v-row>

        <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

        <div>
          Small plates, salads & sandwiches - an intimate setting with 12 indoor
          seats plus patio seating.
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Tonight's availability</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="no"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip>1</v-chip>

          <v-chip>2</v-chip>

          <v-chip>3</v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </div>
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

const no = ref<number>(props.no);
const loading = ref<boolean>(false);
</script>

<style scoped lang="scss"></style>
