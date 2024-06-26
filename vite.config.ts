import { UserConfig, defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config: UserConfig = {
    plugins: [
      preact({
        prerender: {
          enabled: true,
          renderTarget: "#app",
        },
      }),
    ],
    base: "./",
  };
  return config;
});
