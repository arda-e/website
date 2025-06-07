import { build as esbuild } from "esbuild";
import { mkdirSync, cpSync } from "fs";
import { resolve } from "path";
import nodeExternalsPlugin from "esbuild-plugin-node-externals";

const dist = resolve("dist");
const distPublic = resolve(dist, "public");
const entryClient = "src/app.tsx";

async function buildClient() {
    mkdirSync(distPublic, { recursive: true });

    return esbuild({
        entryPoints: [entryClient],
        bundle: true,
        format: "esm",
        target: "es2020",
        minify: true,
        outfile: resolve(distPublic, "app.js"),
        external: [
            "react",
            "react/jsx-runtime",
            "react/jsx-dev-runtime",
            "react-dom/client",
        ],
    }).then(() => {
        cpSync("src/public/main.css", resolve(distPublic, "main.css"));
        console.log("✅ Built client: app.js and copied main.css");
    });
}

async function buildServer() {
    await esbuild({
        entryPoints: ["src/index.ts"],
        bundle: true,
        platform: "node",
        format: "esm",
        target: "node20",
        outfile: "dist/index.js",
        external: [nodeExternalsPlugin()],
    });

    console.log("Built server: index.js");
}

const target = process.argv[2];

switch (target) {
    case "client":
        await buildClient();
        break;
    case "server":
        await buildServer();
        break;
    case "all":
        await buildServer();
        await buildClient();
        break;
    default:
        console.error("Unknown build target. Use: client | server | all");
        process.exit(1);
}