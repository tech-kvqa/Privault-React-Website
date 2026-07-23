import { defineConfig } from "eslint/config";

const eslintConfig = defineConfig([
  // Basic configuration to bypass next-specific rules in static project
  {
    ignores: [
      "dist/**",
      "node_modules/**"
    ]
  }
]);

export default eslintConfig;
