import { UserConfig, defineConfig } from "vite";

const configuration: UserConfig = {
  optimizeDeps: {
    exclude: ["argon2"],
  },
};

export default defineConfig(configuration);
