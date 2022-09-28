import { UserConfig, defineConfig } from "vite";

const configuration: UserConfig = {
  optimizeDeps: {
    exclude: ["argon2", 'pg-hstore'],
  },
};

export default defineConfig(configuration);
