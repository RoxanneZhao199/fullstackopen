import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    NODE_ENV: 'test',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
