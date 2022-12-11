<script setup>
const webcam = ref(null);
onMounted(() => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        webcam.srcObject = stream;
      });
  }
});
</script>

<template>
  <div>
    <video ref="webcam" autoplay></video>
  </div>
</template>

<style scoped>
video {
  height: 80vh;
  width: 90vw;
}
</style>
