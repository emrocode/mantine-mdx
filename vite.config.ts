import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/mantine-mdx/",
  plugins: [
    react(),
    mdx({
      providerImportSource: "@emrocode/mantine-mdx",
      remarkPlugins: [remarkGfm],
    }),
  ],
});
