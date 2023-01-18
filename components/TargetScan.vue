<template>
  <div>
    <div class="wrapper">
      <video id="video" autoplay muted playsinline></video>
      <canvas id="canvas"></canvas>
      <v-img
        id="image"
        :src="$config.API_URL + props.targets[props.pos].image"
        :style="{ opacity: opacity / 100 }"
      ></v-img>
    </div>
    <v-card class="pa-2">
      <v-progress-linear
        class="mb-2"
        :color="progressColor"
        height="18"
        v-model="pos.matchPercentage"
        striped
        rounded
      >
        <template v-slot:default="{ value }"
          ><p class="text-caption">{{ Math.ceil(value) }} %</p>
        </template></v-progress-linear
      >
      <v-slider max="100" min="0" color="blue" v-model="opacity"></v-slider>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import resemble from "resemblejs";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const props = defineProps<{
  venue: string;
  pos: number;
  targets: any;
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

const emits = defineEmits<{ (e: "nextTreasure"): void }>();

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
const opacity = ref(0);

const startVideo = async (): Promise<void> => {
  if (typeof window !== "object") return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;

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

  const video = document.getElementById("video") as HTMLVideoElement;
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  if (video === null) return;
  if (canvas === null) return;

  video.srcObject = stream;
  video.play();

  const { data: res } = await useFetch("/api/GetImage", {
    method: "GET",
    params: { image: props.targets[props.pos].image },
  });

  const base64 = res.value?.base64;
  console.log(base64);

  refresh(video, canvas, base64);
};

const stopVideo = () => {
  const video = document.getElementsByTagName("video")[0];
  video.pause();
  video.srcObject = null;
  clearInterval(pos.frameId);
};

const refresh = (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  base64: string | undefined
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  if (pos.frameId % 128 === 0) {
    if (typeof base64 === "undefined") return;
    const diff = resemble(base64)
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
  }

  pos.frameId = requestAnimationFrame(
    refresh.bind(null, video, canvas, base64)
  );
};
</script>

<style scoped lang="scss">
.wrapper {
  position: relative;
  height: 80svh;
  width: 100%;
}

#video {
  display: none;
}

#canvas,
#image {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
