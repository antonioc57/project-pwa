const workboxBuild = require("workbox-build");

const buildSW = () => {
  return workboxBuild
    .injectManifest({
      swSrc: "src/service-worker.js",
      swDest: "dist/service-worker.js",
      globDirectory: "dist",
      globPatterns: ["**/*.{js,css,html,png}"]
    })
    .then(({ count, size, warnings }) => {
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
};

buildSW();
