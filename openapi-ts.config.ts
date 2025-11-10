import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:3002/v3/api-docs",
  output: "./src/lib/hey-api/generated",
  plugins: [
    {
      name: "@hey-api/client-axios",
      runtimeConfigPath: "../hey-api-client-config.ts",
    },
    "@tanstack/react-query",
    {
      name: "zod",
      types: {
        infer: true,
      },
    },
  ],
});
