<template>
  <v-app>
    <div>
      {{ msg }}
    </div>
  </v-app>
</template>

<script setup lang="ts">
const msg = ref();
const { data: ret } = await useFetch("/api/d", {
  method: "POST",
});
msg.value = ret.value?.ret;
console.log(ret.value?.ret);
</script>

<style scoped lang="scss"></style>
