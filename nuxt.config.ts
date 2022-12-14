// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  // srcDir: "./src",
  publicRuntimeConfig: {
    gmapApiKey: process.env.GMAP_API_KEY,
  },
  app: {
    head: {
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
  vite: {
    define: {
        "process.env.DEBUG": false
    },
    server: {
        watch: {
            usePolling: true
        }
    },
  },
};
