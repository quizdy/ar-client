<template>
  <div>
    <Swiper
      :slides-per-view="1"
      :loop="false"
      :effect="'creative'"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperSlide v-for="(t, i) in props.targets" :key="i">
        <v-sheet max-width="800">
          <img
            :src="$config.API_URL + t.image"
            :height="size.height"
            style="object-fit: cover"
          />
          <!-- <v-img
            :src="$config.API_URL + t.image"
            :min-height="size.height"
            :min-width="size.width"
            :max-height="size.height"
            :max-width="size.width"
          ></v-img> -->
          <!-- {{ i }}
          {{ t.title }} -->
        </v-sheet>
      </SwiperSlide>
    </Swiper>
    <!--     
    <v-card class="mx-auto" max-height="calc(100dvh - 60px)" max-width="600">
      <v-img
        class="mx-auto"
        :src="props.image"
        max-height="calc(80dvh - 60px)"
      ></v-img>
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
    </v-card> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  venue: string;
  pos: number;
  targets: any;
}>();

const size = reactive({
  height: 0,
  width: 0,
});

onMounted(() => {
  size.height = document.documentElement.clientHeight - 64;
  size.width = document.documentElement.clientWidth;
});
</script>

<style scoped lang="scss"></style>
