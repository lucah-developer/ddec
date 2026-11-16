/* El build de CRA copia los symlinks de public/media tal cual.
   Los reemplaza por las carpetas reales para que el deploy sirva las fotos. */
const fs = require("fs");
const path = require("path");

const media = path.join(__dirname, "..", "build", "media");
if (!fs.existsSync(media)) {
  console.log("no build/media, skip");
  process.exit(0);
}
for (const name of fs.readdirSync(media)) {
  const p = path.join(media, name);
  if (!fs.lstatSync(p).isSymbolicLink()) continue;
  const target = fs.realpathSync(p);
  fs.unlinkSync(p);
  fs.cpSync(target, p, { recursive: true });
  console.log("copied", name);
}
