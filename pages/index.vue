<template>
  <v-app>
    <div class="background-img">
      <v-form>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                bg-color="#fff"
                variant="outlined"
                :rules="[(v) => v.length <= 8 || 'Over 8 characters']"
                v-model="venue"
                @input="validateCheck"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn elevation="24" height="48" width="240" @click="login"
                >はじめる</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <client-only>
        <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout">
          {{ snackbar.msg }}
        </v-snackbar>
      </client-only>
    </div>
  </v-app>
</template>

<script setup lang="ts">
const venue = ref("dd");

const snackbar = reactive({
  show: false,
  timeout: 2000,
  msg: "aaa",
});

const validateCheck = () => {
  if (!venue.value) return;
  if (venue.value.length > 8) venue.value = venue.value.slice(0, -1);
};

const login = async () => {
  // --------
  if (venue.value === "dd") {
    navigateTo({
      path: "/debug",
    });
    return;
  }
  //-----------------
  if (venue.value === "admin") {
    navigateTo({
      path: "/admin",
    });
    return;
  }

  const { data: res } = await useFetch("/api/targets", {
    method: "GET",
    params: { venue: venue.value },
  });

  if (res.value?.json.venue !== "" && res.value?.json.targets.length > 0) {
    navigateTo({
      path: "/user",
      query: {
        venue: venue.value,
      },
    });
  } else {
    snackbar.msg = "not found venue";
    snackbar.show = true;
  }
};
</script>

<style scoped lang="scss">
.background-img {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/bg.jpg") no-repeat center center;
  background-size: cover;
  opacity: 0.8;
}
</style>
