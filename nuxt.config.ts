// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  srcDir: "./src",
  publicRuntimeConfig: {
    gmapApiKey: process.env.GMAP_API_KEY,
  },
};
