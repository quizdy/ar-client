<script setup lang="ts">
let latitude: number = 0;
let longitude: number = 0;
onMounted(() => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        if (typeof window === "object") {
          const video: HTMLVideoElement =
            document.getElementsByTagName("video")[0];
          video.srcObject = stream;
          video.play();

          const canvas: HTMLCanvasElement =
            document.getElementsByTagName("canvas")[0];
          const ctx = canvas.getContext("2d");
          if (ctx != null) updateVideo(ctx, video, canvas);
        }
      });
  }

  navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude, longitude);
  });
});

function updateVideo(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
) {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(updateVideo);
}
</script>

<template>
  <div class="camera">
    <div class="row">
      <video></video>
      <canvas></canvas>
    </div>
    <div class="row">
      <p>{{ latitude }}, {{ longitude }}</p>
    </div>
  </div>
</template>

<style scoped>
.camera {
  text-align: center;
  padding-top: 5vh;
}

.row {
  display: flex;
  align-items: center;
}

video,
canvas {
  height: 80vh;
  width: 40vw;
}
</style>
