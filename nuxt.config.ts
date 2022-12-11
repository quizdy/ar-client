import path from "path";
import fs from "fs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./keys/server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "./keys/server.csr")),
    },
  },
  srcDir: "./src",
};
