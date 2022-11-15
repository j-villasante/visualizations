const sassPlugin = require("esbuild-sass-plugin")
const liveServer = require("live-server")

const build = process.argv[2] === "build"

if (!build) {
    liveServer.start({
        port: 8001,
        host: "0.0.0.0",
        root: "dist",
        open: false,
        file: "index.html",
        wait: 200,
        logLevel: 2,
    })
}

require("esbuild")
    .build({
        entryPoints: ["./src/styles/main.scss", "./src/index.tsx"],
        bundle: true,
        outdir: "./dist",
        watch: !build,
        minify: build,
        plugins: [sassPlugin.sassPlugin()],
    })
    .catch(() => process.exit(1))
