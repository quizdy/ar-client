<script setup lang="ts">
const target = {
  name: "test",
  img: "/_nuxt/assets/images/question.png",
};

const startVideo = async () => {
  if (typeof window !== "object") return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
  const video = document.getElementsByTagName("video")[0];
  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { facingMode: { exact: "environment" } },
  });
  video.srcObject = stream;
  video.play();
  if (ctx !== null) {
    const question = new Image();
    question.src = target.img;
    question.onload = () => {
      updateCanvas(ctx, video, canvas, question);
    };
  }
};

const updateCanvas = (
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  question: HTMLImageElement
) => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    question,
    (canvas.width - 50) / 2,
    (canvas.height - 50) / 2,
    50,
    50
  );
  const id = requestAnimationFrame(
    updateCanvas.bind(null, ctx, video, canvas, question)
  );
};
</script>

<template>
  <button @click="startVideo">startVideo</button>
  <video autoplay muted playsinline></video>
  <canvas></canvas>
</template>

<style scoped>
video {
  display: none;
}

canvas {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
