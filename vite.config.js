import { defineConfig } from 'vite'
import pugPlugin from 'vite-plugin-pug'
import path from "path";
const {sync} = require("glob");

const { resolve } = require('path')

export default defineConfig({
  plugins: [pugPlugin({pretty: true}, { pagesUrl: './branches/' })],

  server: { port: 8083 },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...sync('./branches/**.html').reduce(function(obj, el){
          obj['branches/' + path.parse(el).name] = el;
          return obj
        },{})
      },
    },
  },
})
