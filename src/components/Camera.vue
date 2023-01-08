<template>
  <v-container>
    <v-btn @click="startVideo">startVideo</v-btn>

    <video id="videoCapture" autoplay muted playsinline></video>
    <canvas id="canvasCapture"></canvas>
    <v-text-field solo readonly label="rotateDegrees">{{
      pos.rotateDegrees
    }}</v-text-field>
    <v-text-field solo readonly label="misMatchPercentage">{{
      pos.misMatchPercentage
    }}</v-text-field>
    <v-btn @click="checkImage">check</v-btn>
  </v-container>
</template>

<script setup lang="ts">
import resemble from "resemblejs";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const props = defineProps<{
  title: string;
  lat: number;
  lng: number;
  pic: string;
}>();

const startVideoMethod = (): void => {
  startVideo();
};

const stopVideoMethod = (): void => {
  stopVideo();
};

defineExpose({
  startVideoMethod,
  stopVideoMethod,
});

const pos = reactive({
  frameId: 0,
  frontToBack: 0.0,
  leftToRight: 0.0,
  rotateDegrees: 0.0,
  gravityX: 0.0,
  gravityY: 0.0,
  gravityZ: 0.0,
  misMatchPercentage: 0.0,
});

const startVideo = async (): Promise<void> => {
  if (typeof window !== "object") return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;

  const video = document.getElementById("videoCapture") as HTMLVideoElement;
  const canvas = document.getElementById("canvasCapture") as HTMLCanvasElement;

  if (video === null) return;
  if (canvas === null) return;

  const ctx = canvas.getContext("2d");

  const devices = (await navigator.mediaDevices.enumerateDevices()).filter(
    (d) => d.kind.includes("video")
  );

  console.log(devices);

  let constraints = {
    audio: false,
    video: true,
  };

  const requestPermission = (
    DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
  ).requestPermission;

  if (typeof requestPermission === "function") {
    (constraints.video as any) = { facingMode: { exact: "environment" } };
  }

  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  video.srcObject = stream;
  video.play();
  if (ctx !== null) {
    const question = new Image();
    question.src = "/images/box.png";
    question.onload = () => {
      updateCanvas(ctx, video, canvas, question);
    };
  }

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
};

const stopVideo = () => {
  const video = document.getElementsByTagName("video")[0];
  video.pause();
  video.srcObject = null;
  cancelAnimationFrame(pos.frameId);
  window.removeEventListener("deviceorientation", handleOrientationEvent, true);
  window.removeEventListener("devicemotion", handleMotionEvent, true);
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
  const canvas = document.getElementById("canvasCapture") as HTMLCanvasElement;

  if (canvas === null) return;

  const diff = resemble(props.pic)
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
