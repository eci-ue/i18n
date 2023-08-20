/**
 * @file Vite Config
 * @author svon.me@gmail.com
 */

import path from "path";
import { defineConfig } from "vite";

export default defineConfig(async function() {
  return {
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        "src/": path.resolve(__dirname, "src") + "/",
      },
    },
    plugins: [
    ],
    optimizeDeps: {
      include: [
      ]
    },
    build: {
      target: "modules",
      polyfillModulePreload: false,
      lib: {
        entry: "src/index",
        name: "i18n",
        formats: ["es"],
        fileName: "i18n"
      },
      cssCodeSplit: true,
      sourcemap: true,
      manifest: false,
      rollupOptions: {
        external: [
          /@js-lion\/i18n/i,
        ],
        output: {
          inlineDynamicImports: true
        }
      }
    },
  };
});
