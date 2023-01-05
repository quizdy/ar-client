// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  srcDir: "./src",
  publicRuntimeConfig: {
    gmapApiKey: process.env.GMAP_API_KEY,
  },
  app: {
    head: {
      style: [{ children: "body { margin: 0; padding: 0;}" }],
    },
  },
};
