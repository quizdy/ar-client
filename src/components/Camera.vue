<template>
  <v-container>
    <video autoplay muted playsinline></video>
    <canvas></canvas>
    <v-text-field solo readonly label="rotateDegrees">{{
      pos.rotateDegrees
    }}</v-text-field>
    <v-text-field solo readonly label="misMatchPercentage">{{
      pos.misMatchPercentage
    }}</v-text-field>
    <v-btn v-if="!pos.state" @click="startVideo">startVideo</v-btn>
    <v-btn v-else @click="stopVideo">stopVideo</v-btn>
    <v-btn @click="checkImage">check</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import resemble from "resemblejs";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const pos = reactive({
  state: false,
  frameId: 0,
  frontToBack: 0.0,
  leftToRight: 0.0,
  rotateDegrees: 0.0,
  gravityX: 0.0,
  gravityY: 0.0,
  gravityZ: 0.0,
  misMatchPercentage: 0.0,
});

const target = {
  name: "test",
  img: "/_nuxt/assets/images/question.png",
  pic: "/_nuxt/assets/images/20220422133654_061702_30028589.jpg",
};

const startVideo = async () => {
  if (typeof window !== "object") return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
  const video = document.getElementsByTagName("video")[0];
  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    // video: { facingMode: { exact: "environment" } },
    video: true,
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

  const requestPermission = (
    DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
  ).requestPermission;
  if (typeof requestPermission === "function") {
    const res = await requestPermission();
    if (res === "granted") {
      window.addEventListener(
        "deviceorientation",
        handleOrientationEvent,
        true
      );
      window.addEventListener("devicemotion", handleMotionEvent, true);
    }
  } else {
    window.addEventListener("deviceorientation", handleOrientationEvent, true);
    window.addEventListener("devicemotion", handleMotionEvent, true);
  }

  pos.state = true;
};

const stopVideo = () => {
  const video = document.getElementsByTagName("video")[0];
  video.pause();
  video.srcObject = null;
  cancelAnimationFrame(pos.frameId);
  window.removeEventListener("deviceorientation", handleOrientationEvent, true);
  window.removeEventListener("devicemotion", handleMotionEvent, true);
  pos.state = false;
};

const updateCanvas = (
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  question: HTMLImageElement
) => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(question, pos.frontToBack, pos.leftToRight, 50, 50);
  pos.frameId = requestAnimationFrame(
    updateCanvas.bind(null, ctx, video, canvas, question)
  );
};

const checkImage = () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  const diff = resemble(target.pic)
    .compareTo(canvas.toDataURL())
    .ignoreColors()
    .onComplete((data) => {
      console.log(data);
      pos.misMatchPercentage = data.misMatchPercentage;
    });
};

const handleOrientationEvent = (ev: DeviceOrientationEvent) => {
  pos.frontToBack = ev.alpha === null ? 0 : ev.alpha;
  pos.leftToRight = ev.beta === null ? 0 : ev.beta;
  pos.rotateDegrees = ev.gamma === null ? 0 : ev.gamma;
};

const handleMotionEvent = (ev: DeviceMotionEvent) => {
  if (ev.accelerationIncludingGravity !== null) {
    pos.gravityX =
      ev.accelerationIncludingGravity.x === null
        ? 0
        : ev.accelerationIncludingGravity.x;
    pos.gravityY =
      ev.accelerationIncludingGravity.y === null
        ? 0
        : ev.accelerationIncludingGravity.y;
    pos.gravityZ =
      ev.accelerationIncludingGravity.z === null
        ? 0
        : ev.accelerationIncludingGravity.z;
  }
};
</script>

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
