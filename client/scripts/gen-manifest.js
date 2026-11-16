/* Genera src/data/manifest.json con TODAS las fotos reales de cada obra. */
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "src");
const OUT = path.join(SRC, "data", "manifest.json");

const DIRS = {
  "afip-san-luis": ["Empresas/Afip/AFIP_SAN_LUIS"],
  "cielorrasos-afip": ["Empresas/Afip/CIELORRASOS_SR"],
  "afip-san-rafael": ["Empresas/Afip/AFIP_SAN_RAFAEL"],
  "museo-lagiglia": ["Empresas/Muni/Museo San Rafael"],
  "paseo-pellegrini": ["Empresas/Muni/PaseoPelegrini"],
  "parque-de-los-ninos": ["Empresas/Muni/ParqueNiños"],
  "biblioteca-moreno": ["Empresas/Muni/BibliotecaMMoreno"],
  "comedor-utn": ["Empresas/Muni/Comedor_Universitario"],
  "casa-de-la-mujer": [
    "Empresas/Muni/Casa de Mujer",
    "OBRAS/CasaMujer/Etapa_1",
    "OBRAS/CasaMujer/Etapa_2",
  ],
  "cancha-de-hockey": ["Empresas/Muni/Cancha_Hockey"],
  "ciclovia": ["Empresas/Muni/Ciclo Vía"],
  "estaciones-eco": ["Empresas/Muni/EstacionesEco"],
  "mantenimiento-km0": ["Empresas/Muni/Mantenimiento Km0"],
  "playon-ballofet": ["Empresas/Muni/Playon_Deportivo_Balofett"],
  "plaza-salto-de-las-rosas": ["Empresas/Muni/Plaza Salto de Las Rosas"],
  "plaza-belgrano": ["Empresas/Muni/Plaza_Belgrano"],
  "plaza-rama-caida": ["Empresas/Muni/Plaza_Rama_Caída"],
  "red-cloacal-sarmiento": ["Empresas/Muni/Red de ClocaCsarmiento"],
  "red-cloacal": ["Empresas/Muni/ReddeCloaca"],
  "ipv-san-rafael": ["Empresas/IPV"],
  "base-transformador-pampa": ["Empresas/Pampa/Base_Transformador_PAMPA"],
  "junta-elastica-nihuil-2": ["Empresas/Pampa/Pampa Energía-Sacde-Melisan"],
  "pampa-agua-del-toro": ["Empresas/Pampa/PampaAguaDelToro"],
  "dique-aisol": ["Empresas/Pampa/Reparación Dique Aisol"],
  "canal-sauce-la-leona": ["Empresas/Irrigación/Canal"],
  "compuertas-derivador-matriz": ["Empresas/Irrigación/Compuertas"],
  "residenciales-de-autor": [
    "Empresas/Privados/Casas/CasasDeBarrio",
    "Empresas/Privados/Casas/CasasVarias",
    "OBRAS/Federico_Cinta",
    "OBRAS/ObraPrivAmiga_Rodolfo",
  ],
  "consultorio-casadoro": ["Empresas/Privados/Casadoro/CONSULTORIO"],
  "club-de-paleta": ["Empresas/Privados/CLUB DE PALETA"],
  "edificios-de-altura": [
    "Empresas/Privados/Deptos/Deptos Baloffet",
    "Empresas/Privados/Deptos/Deptos Roca",
    "Empresas/Privados/Deptos/Dptos L Gattas",
  ],
  "locales-comerciales": ["Empresas/Privados/Local_Ballofet"],
};

/* Portada = la misma foto que usa el prototipo aprobado. */
const COVERS = {
  "afip-san-luis": "4.jpeg",
  "cielorrasos-afip": "1.jpeg",
  "museo-lagiglia": "1.jpg",
  "paseo-pellegrini": "12.jpg",
  "parque-de-los-ninos": "1.jpeg",
  "biblioteca-moreno": "1.jpg",
  "comedor-utn": "1.jpg",
  "casa-de-la-mujer": "0effd3f1-f9bd-43b0-9317-a74844c7c1d7.jpg",
  "cancha-de-hockey": "1.jpeg",
  "ciclovia": "1.jpg",
  "estaciones-eco": "1.jpg",
  "mantenimiento-km0": "1.jpeg",
  "playon-ballofet": "1.jpg",
  "plaza-salto-de-las-rosas": "13.jpg",
  "plaza-belgrano": "1.jpeg",
  "plaza-rama-caida": "1.jpeg",
  "red-cloacal-sarmiento": "2.jpg",
  "red-cloacal": "1.jpg",
  "ipv-san-rafael": "1.jpg",
  "base-transformador-pampa": "1.jpeg",
  "junta-elastica-nihuil-2": "1.jpeg",
  "pampa-agua-del-toro": "1.jpeg",
  "canal-sauce-la-leona": "1.jpeg",
  "compuertas-derivador-matriz": "1.jpeg",
  "residenciales-de-autor": "1.jpg",
  "consultorio-casadoro": "3.JPG",
  "club-de-paleta": "1.JPEG",
  "edificios-de-altura": "1.jpg",
  "locales-comerciales": "1.jpeg",
};

const SHOTS = {
  terminado: "Empresas/Irrigación/Canal/19.jpeg",
  telecom: "Empresas/Privados/Telecom SA/P011110_17.04.JPG",
  privada: "OBRAS/ObraPrivAmiga_Rodolfo/1.jpeg",
  casas: "Empresas/Privados/Casas/CasasVarias/1.jpg",
};

const IMG = /\.(jpe?g|png|webp)$/i;

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) {
    console.warn("missing dir", dir);
    return out;
  }
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith(".")) continue;
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(abs));
    else if (IMG.test(ent.name)) out.push(abs);
  }
  return out;
}

function relMedia(abs) {
  const rel = path.relative(SRC, abs).split(path.sep).join("/");
  if (rel.startsWith("Empresas/")) return "empresas/" + rel.slice("Empresas/".length);
  if (rel.startsWith("OBRAS/")) return "obras/" + rel.slice("OBRAS/".length);
  return rel;
}

function nat(a, b) {
  return a.localeCompare(b, "es", { numeric: true, sensitivity: "base" });
}

const projects = {};
for (const [id, dirs] of Object.entries(DIRS)) {
  let files = [];
  dirs.forEach((d) => {
    files.push(...walk(path.join(SRC, d)).sort(nat));
  });
  files = files.map(relMedia);
  const coverName = (COVERS[id] || "").toLowerCase();
  if (coverName) {
    const matches = files.filter((f) => f.split("/").pop().toLowerCase() === coverName);
    matches.sort((a, b) => a.split("/").length - b.split("/").length || nat(a, b));
    if (!matches.length) console.warn("cover not found", id, coverName);
    else {
      const cover = matches[0];
      files = [cover, ...files.filter((f) => f !== cover)];
    }
  }
  projects[id] = files;
}

const shots = {};
for (const [k, rel] of Object.entries(SHOTS)) {
  const abs = path.join(SRC, rel);
  if (!fs.existsSync(abs)) console.warn("shot missing", rel);
  shots[k] = relMedia(abs);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ projects, shots }, null, 0));
const counts = Object.entries(projects).map(([k, v]) => `${k}:${v.length}`).join(" ");
console.log("manifest", Object.keys(projects).length, "projects", counts);
