<template>
  <v-container>
    <v-card class="mx-auto" max-width="600">
      <v-img :src="props.pic"></v-img>
      <v-card-title>{{ props.title }} </v-card-title>
      <v-card-subtitle>
        {{ props.comments }}
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he
            could deliver. You won't have time for sleeping, soldier, not with
            all the bed making you'll be doing. Then we'll go with that data
            file! Hey, you add a one and two zeros to that or we walk! You're
            going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
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

const show = ref<boolean>(false);
</script>

<style scoped lang="scss"></style>
