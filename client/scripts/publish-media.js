/* Copia las fotos reales al build. No depende de los symlinks de public/media. */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const destRoot = path.join(root, "build", "media");
const pairs = [
  ["Empresas", "empresas"],
  ["OBRAS", "obras"],
];

if (!fs.existsSync(path.join(root, "build"))) {
  console.log("no build, skip");
  process.exit(0);
}

fs.mkdirSync(destRoot, { recursive: true });
for (const [srcName, destName] of pairs) {
  const from = path.join(root, "src", srcName);
  const to = path.join(destRoot, destName);
  fs.rmSync(to, { recursive: true, force: true });
  fs.cpSync(from, to, { recursive: true });
  console.log("media", destName);
}
