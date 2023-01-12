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
                :rules="[(v) => v.length <= 6 || 'Over 6 characters']"
                v-model="venue"
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
    </div>
  </v-app>
</template>

<script setup lang="ts">
const venue = ref("");

const login = async () => {
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
