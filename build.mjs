import { build } from "esbuild";
import { mkdirSync, cpSync } from "fs";
import { resolve } from "path";

const distPublic = resolve("dist/public");
mkdirSync(distPublic, { recursive: true });

await build({
    entryPoints: ["src/app.tsx"],
    bundle: true,
    format: "esm",
    target: "es2020",
    minify: true,
    outfile: "dist/public/app.js",
    external: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom/client",
    ],
});

cpSync("src/public/main.css", `${distPublic}/main.css`);
console.log("Built app.js and copied main.css");