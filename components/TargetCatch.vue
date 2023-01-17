<template>
  <v-container>
    <v-card id="wrapper" class="mb-4" height="70vh" width="100%">
      <video id="videoCapture" autoplay muted playsinline></video>
      <canvas id="canvasCapture"></canvas>
    </v-card>
    <v-progress-linear
      :color="progressColor"
      height="18"
      v-model="pos.matchPercentage"
      striped
    >
      <template v-slot:default="{ value }"
        ><p class="text-caption">{{ Math.ceil(value) }} %</p>
      </template></v-progress-linear
    >
  </v-container>
</template>

<script setup lang="ts">
import resemble from "resemblejs";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const props = defineProps<{
  venue: string;
  title: string;
  lat: number;
  lng: number;
  image: string;
  comments: string;
}>();

const GAP = 10;

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
  matchPercentage: 0.0,
});

const progressColor = ref("light-blue");

const startVideo = async (): Promise<void> => {
  if (typeof window !== "object") return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;

  const video = document.getElementById("videoCapture") as HTMLVideoElement;
  const canvas = document.getElementById("canvasCapture") as HTMLCanvasElement;

  if (video === null) return;
  if (canvas === null) return;

  const ctx = canvas.getContext("2d");

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

  if (ctx === null) return;
  const target = new Image();
  target.src = props.image;
  target.onload = () => {
    updateCanvas(ctx, video, canvas, target);
  };

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
  target: HTMLImageElement
) => {
  ctx.drawImage(
    target,
    pos.frontToBack,
    pos.leftToRight,
    canvas.width,
    canvas.height
  );

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.15;

  const diff = resemble(props.pic)
    .compareTo(canvas.toDataURL())
    .ignoreColors()
    .onComplete((data) => {
      pos.matchPercentage = 100 - data.misMatchPercentage;
      progressColor.value =
        pos.matchPercentage > 80 ? "deep-orange" : "light-blue";
      // if (pos.matchPercentage > GAP) {
      //   emits("nextTreasure");
      // }
    });

  pos.frameId = requestAnimationFrame(
    updateCanvas.bind(null, ctx, video, canvas, target)
  );
};

const emits = defineEmits<{ (e: "nextTreasure"): void }>();

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
#videoCapture,
#canvasCapture {
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#videoCapture {
  opacity: 0;
}

#canvasCapture {
  opacity: 1;
}
</style>
