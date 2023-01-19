// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  // srcDir: "./src",
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      GMAP_API_KEY: process.env.GMAP_API_KEY,
    },
  },
  app: {
    head: {
      title: "宝探し",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      style: [
        {
          children:
            "body { margin: 0; padding: 0; min-height: 100vh; min-height: -webkit-fill-available;}",
        },
      ],
    },
  },
  css: ['vuetify/lib/styles/main.sass', "@mdi/font/css/materialdesignicons.css"],
  build: {
    transpile: ['vuetify'],
  },
  modules: [['nuxt-swiper', {
    prefix: 'Swiper',
    styleLang: 'css',
    modules: ['navigation', 'pagination'], // all modules are imported by default
  }]],
};
