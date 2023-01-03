<script setup lang="ts">
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const pos = reactive({
  state: false,
  frontToBack: 0.0,
  leftToRight: 0.0,
  rotateDegrees: 0.0,
  gravityX: 0.0,
  gravityY: 0.0,
  gravityZ: 0.0,
});

onMounted(() => {
  // if (window.Notification) {
  //   alert("Notificationに対応してる");
  // } else {
  //   alert("Notificationに対応してない");
  // }
  // if (window.DeviceOrientationEvent) {
  //   alert("DeviceOrientationEventに対応してる");
  // } else {
  //   alert("DeviceOrientationEventに対応してない");
  // }
  pos.state = true;
});

const start = async () => {
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
  pos.state = false;
};

const stop = () => {
  window.removeEventListener("deviceorientation", handleOrientationEvent, true);
  window.removeEventListener("devicemotion", handleMotionEvent, true);
  pos.state = true;
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

<template>
  -- Compus --
  <button v-if="pos.state" @click="start">on</button>
  <button v-else @click="stop">off</button>
  <div class="container">{{ pos.frontToBack }}</div>
</template>
