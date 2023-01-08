<template>
  <div class="main">
    <CameraTest v-if="screen === 'camera'" />
    <Map v-else-if="screen === 'map'" />
    <Hint v-else />
  </div>
  <div class="footer">
    <button :class="{ active: screen === '' }" @click="showScreen('')">
      hint
    </button>
    <button :class="{ active: screen === 'map' }" @click="showScreen('map')">
      map
    </button>
    <button
      :class="{ active: screen === 'camera' }"
      @click="showScreen('camera')"
    >
      camera
    </button>
  </div>
</template>

<script setup lang="ts">
let screen = ref("");

const showScreen = (screenName: string) => {
  screen.value = screenName;
};
</script>

<style scoped>
.main {
  height: 100%;
  width: 100%;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
}

.footer button {
  border-radius: 1rem;
  border: 1px solid #eee;
  box-shadow: 0px 0px 3px #ccc;
  margin: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}

.footer button.active {
  color: #fff;
  background-color: #f3bc56e7;
}
</style>
