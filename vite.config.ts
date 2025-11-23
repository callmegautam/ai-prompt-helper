import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    publicDir: "public",
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                popup: resolve(__dirname, "src/ui/popup/main.tsx"),
                options: resolve(__dirname, "src/ui/options/main.tsx"),
                content: resolve(__dirname, "src/content/index.ts"),
            },
            output: {
                entryFileNames(chunk) {
                    if (chunk.name === "content") return "content.js";
                    if (chunk.name === "popup") return "popup.js";
                    if (chunk.name === "options") return "options.js";
                    return "assets/[name].js";
                },
                chunkFileNames: "assets/[name].js",
                assetFileNames: "assets/[name][extname]",
            },
        },
    },
});
