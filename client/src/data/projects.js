/* Textos del prototipo aprobado (data.js). Las fotos son todas las del repo, no solo las muestras. */
import manifest from "./manifest.json";

export function mediaUrl(rel) {
  if (!rel) return "";
  return "/media/" + rel.split("/").map((seg) => encodeURIComponent(seg)).join("/");
}

export const shots = {
  terminado: mediaUrl(manifest.shots.terminado),
  telecom: mediaUrl(manifest.shots.telecom),
  privada: mediaUrl(manifest.shots.privada),
  casas: mediaUrl(manifest.shots.casas),
};

const photosOf = (id) => (manifest.projects[id] || []).map(mediaUrl);

export const CLIENTS = [
  {
    key: "afip",
    label: "AFIP",
    full: "AFIP",
    sector: "Público / Institucional",
    intro:
      "Infraestructura ejecutada para la Administración Federal de Ingresos Públicos. Compromiso con el rigor administrativo y estructural.",
  },
  {
    key: "muni",
    label: "Municipalidad",
    full: "Municipalidad de San Rafael",
    sector: "Desarrollo urbano",
    intro:
      "Portafolio de obras públicas desarrolladas para la Municipalidad de San Rafael. Obras que ordenan y mejoran la ciudad.",
  },
  {
    key: "ipv",
    label: "IPV",
    full: "IPV Mendoza",
    sector: "Vivienda social",
    intro:
      "Infraestructura habitacional y compromiso ciudadano. Barrios pensados para durar y habitar con dignidad.",
  },
  {
    key: "pampa",
    label: "Pampa Energía",
    full: "Pampa Energía",
    sector: "Sector energético",
    intro:
      "Infraestructura de soporte energético y reparaciones críticas. Ingeniería de precisión para infraestructura crítica.",
  },
  {
    key: "irri",
    label: "Irrigación",
    full: "Irrigación Prov.",
    sector: "Infraestructura hídrica",
    intro:
      "Proyectos hídricos e infraestructura de riego: obras que sostienen el sistema productivo de Mendoza.",
  },
  {
    key: "priv",
    label: "Privados",
    full: "Inversión privada",
    sector: "Desarrollos de autor",
    intro:
      "Proyectos desarrollados para el sector privado, con la misma rigurosidad técnica que la obra pública.",
  },
];

const RAW = [
  {
    id: "afip-san-luis",
    title: "AFIP San Luis",
    client: "afip",
    loc: "San Luis",
    sub: "Remodelación integral y mantenimiento del edificio administrativo principal, incluyendo áreas comunes y comedores.",
    head: "Desafío de infraestructura",
    desc: [
      "Se realizó la remodelación y el mantenimiento del edificio principal de AFIP en la ciudad de San Luis. El proyecto incluyó la renovación completa de los baños y el comedor principal, integrando acabados industriales con la robustez estructural requerida.",
      "Nuestro equipo se centró en minimizar la interrupción del servicio administrativo mientras se aplicaban soluciones de ingeniería estructural para reforzar la durabilidad de las instalaciones de alto tránsito.",
    ],
    tags: ["Sector público", "Mantenimiento civil"],
  },
  {
    id: "cielorrasos-afip",
    title: "Cielorrasos AFIP",
    client: "afip",
    loc: "San Rafael, Mendoza",
    sub: "Construcción técnica de cielorrasos suspendidos para la optimización acústica y térmica de las oficinas administrativas.",
    head: "Soluciones de terminación",
    desc: [
      "Construcción de los cielorrasos pertenecientes a las oficinas de AFIP en San Rafael. Se implementaron sistemas de montaje rápido y alta resistencia para garantizar la seguridad en zonas de alta sismicidad.",
      "La precisión milimétrica en el nivelado y la elección de materiales incombustibles fueron pilares para cumplir con los estándares de seguridad de edificios gubernamentales.",
    ],
    tags: ["Terminaciones técnicas", "Acústica"],
  },
  {
    id: "afip-san-rafael",
    title: "San Rafael Admin",
    client: "afip",
    loc: "San Rafael, Mendoza",
    sub: "Ejecución de núcleos sanitarios avanzados con foco en durabilidad industrial y optimización de recursos hídricos.",
    head: "Higiene y estructura",
    desc: [
      "Se realizó la construcción de los baños pertenecientes al edificio de la AFIP en San Rafael, Mendoza. Un proyecto de pequeña escala pero de alta complejidad técnica debido a la integración de sistemas hidráulicos industriales.",
      "Cada componente fue evaluado para resistir el uso intensivo, asegurando décadas de operatividad.",
    ],
    tags: ["Obra civil", "Infraestructura pública"],
  },
  {
    id: "museo-lagiglia",
    title: "Museo Humberto Lagiglia",
    client: "muni",
    loc: "San Rafael, Mendoza",
    sub: "Construcción del Museo de Historia Natural de San Rafael, un hito cultural y arquitectónico.",
    desc: [
      "Se realizó la construcción integral del Museo de Historia Natural 'Dr. Humberto Lagiglia'. El edificio integra galerías de exposición con laboratorios de investigación técnica.",
    ],
    tags: ["Cultura"],
  },
  {
    id: "paseo-pellegrini",
    title: "Paseo Pellegrini",
    client: "muni",
    loc: "Centro de San Rafael",
    sub: "Renovación del núcleo comercial céntrico con infraestructura peatonal avanzada.",
    desc: [
      "Construcción del Paseo Pellegrini en el centro de San Rafael. Un espacio dinámico que concentra la actividad comercial y social del departamento.",
    ],
    tags: ["Urbanismo", "Comercio", "Iluminación"],
  },
  {
    id: "parque-de-los-ninos",
    title: "Parque de los Niños",
    client: "muni",
    loc: "San Rafael, Mendoza",
    sub: "Megaproyecto de recreación infantil con estándares internacionales de seguridad.",
    desc: [
      "Remodelación y mantenimiento integral del Parque de los Niños. Un espacio emblemático junto a la Plaza Francia diseñado para el juego y el aprendizaje.",
    ],
    tags: ["Recreación", "Estructura metálica"],
  },
  {
    id: "biblioteca-moreno",
    title: "Biblioteca M. Moreno",
    client: "muni",
    loc: "",
    sub: "Refuerzo estructural y modernización de la cubierta envolvente.",
    desc: [
      "Construcción del techo y parasoles de la Biblioteca Mariano Moreno. Soluciones de protección térmica y solar para la preservación de archivos culturales.",
    ],
    tags: ["Protección solar", "Cultura", "Patrimonio"],
  },
  {
    id: "comedor-utn",
    title: "Comedor Universitario UTN",
    client: "muni",
    loc: "San Rafael, Mendoza",
    sub: "Infraestructura de servicios para la formación académica superior.",
    desc: [
      "Construcción del Comedor Universitario para la UTN San Rafael. Espacios diseñados para la funcionalidad y el alto tránsito estudiantil.",
    ],
    tags: ["Educación", "Servicios"],
  },
  {
    id: "casa-de-la-mujer",
    title: "Casa de la Mujer",
    client: "muni",
    loc: "",
    sub: "",
    desc: [],
    tags: ["Obra en etapas"],
  },
  {
    id: "cancha-de-hockey",
    title: "Cancha de Hockey",
    client: "muni",
    loc: "",
    sub: "",
    desc: [],
    tags: [],
  },
  {
    id: "ciclovia",
    title: "Ciclovía",
    client: "muni",
    loc: "",
    sub: "",
    desc: [],
    tags: ["Urbanismo"],
  },
  {
    id: "estaciones-eco",
    title: "Estaciones Eco",
    client: "muni",
    loc: "",
    sub: "",
    desc: [],
    tags: [],
  },
  {
    id: "mantenimiento-km0",
    title: "Mantenimiento Km 0",
    client: "muni",
    loc: "",
    sub: "",
    desc: [],
    tags: ["Mantenimiento"],
  },
  {
    id: "playon-ballofet",
    title: "Playón Deportivo Ballofet",
    client: "muni",
    loc: "Av. Ballofet",
    sub: "",
    desc: [],
    tags: ["Deporte"],
  },
  {
    id: "plaza-salto-de-las-rosas",
    title: "Plaza Salto de las Rosas",
    client: "muni",
    loc: "",
    sub: "",
    desc: [],
    tags: ["Espacio público"],
  },
  {
    id: "plaza-belgrano",
    title: "Plaza Belgrano",
    client: "muni",
    loc: "",
    sub: "",
    desc: [],
    tags: ["Espacio público"],
  },
  {
    id: "plaza-rama-caida",
    title: "Plaza Rama Caída",
    client: "muni",
    loc: "",
    sub: "",
    desc: [],
    tags: ["Espacio público"],
  },
  {
    id: "red-cloacal-sarmiento",
    title: "Red cloacal Sarmiento",
    client: "muni",
    loc: "",
    sub: "",
    desc: [],
    tags: ["Saneamiento"],
  },
  {
    id: "red-cloacal",
    title: "Red cloacal",
    client: "muni",
    loc: "",
    sub: "",
    desc: [],
    tags: ["Saneamiento"],
  },
  {
    id: "ipv-san-rafael",
    title: "Barrios IPV San Rafael",
    client: "ipv",
    loc: "San Rafael, Mendoza",
    sub: "Construcción masiva de viviendas residenciales con enfoque en la eficiencia estructural y social.",
    desc: [
      "Ejecución de barrios para el Instituto Provincial de la Vivienda (IPV). Proyectos de alto impacto social que requieren una gestión logística y constructiva optimizada para el cumplimiento de plazos gubernamentales.",
    ],
    tags: ["Social", "Vivienda"],
  },
  {
    id: "base-transformador-pampa",
    title: "Base Transformador Pampa",
    client: "pampa",
    loc: "",
    sub: "Ingeniería de fundaciones pesadas para soporte de transformadores de alto voltaje.",
    desc: [
      "Construcción de la base del transformador para PAMPA ENERGÍA. Un proyecto de alta precisión donde la nivelación y la calidad del hormigón son críticas para la estabilidad del equipo electromecánico.",
    ],
    tags: ["Energía", "Hormigón especial", "Ingeniería eléctrica"],
  },
  {
    id: "junta-elastica-nihuil-2",
    title: "Junta Elástica Nihuil 2",
    client: "pampa",
    loc: "",
    sub: "Colaboración internacional en infraestructura hidroeléctrica de gran escala.",
    desc: [
      "Construcción y colocación de la Junta Elástica para la Turbina del Nihuil 2. Proyecto realizado en colaboración con la empresa brasilera Sacde, enfocado en absorber vibraciones dinámicas de la turbina.",
    ],
    tags: ["Hidroelectricidad", "Sacde-Melisan"],
  },
  {
    id: "pampa-agua-del-toro",
    title: "Pampa Agua del Toro",
    client: "pampa",
    loc: "San Rafael, Mendoza",
    sub: "Soluciones de infraestructura en entornos geográficos de alta complejidad.",
    desc: [
      "Construcción en Pampa Agua del Toro. Un proyecto que demuestra la capacidad de DDEC para operar en locaciones remotas, garantizando estándares de calidad industrial.",
    ],
    tags: ["Obra de campo"],
  },
  {
    id: "dique-aisol",
    title: "Reparación Dique Aisol",
    client: "pampa",
    loc: "Mendoza",
    sub: "Mantenimiento estructural preventivo y correctivo de presas reguladoras.",
    desc: [
      "Se realizó la construcción y reparación del Dique Aisol. Intervenciones críticas para la seguridad estructural y la gestión hídrica eficiente del sistema Pampa Energía.",
    ],
    tags: ["Hidráulica", "Reparación estructural"],
  },
  {
    id: "canal-sauce-la-leona",
    title: "Canal Sauce La Leona",
    client: "irri",
    loc: "Cuadro Benegas",
    sub: "Ingeniería hidráulica para la gestión y distribución de recursos hídricos en zonas agrícolas.",
    desc: [
      "Construcción del Canal Sauce La Leona. Un proyecto crítico para el Departamento General de Irrigación, asegurando la eficiencia en el transporte de agua hacia las zonas productoras del sur mendocino.",
    ],
    tags: ["Hidráulica", "Agricultura"],
  },
  {
    id: "compuertas-derivador-matriz",
    title: "Compuertas Derivador Matriz",
    client: "irri",
    loc: "",
    sub: "Tecnología de control y derivación de caudales hídricos de alta precisión.",
    desc: [
      "Reparación y construcción del sistema de compuertas en el derivador Matriz. Obras esenciales para el control de caudales y el mantenimiento de la red de irrigación provincial.",
    ],
    tags: ["Mantenimiento hídrico", "Infraestructura"],
  },
  {
    id: "residenciales-de-autor",
    title: "Residenciales de Autor",
    client: "priv",
    loc: "El Nihuil y Cuadro Benegas",
    sub: "Arquitectura habitacional personalizada que fusiona el estilo de vida con la solidez de ingeniería civil.",
    desc: [
      "Construcción de viviendas unifamiliares en barrios exclusivos de San Rafael como El Nihuil y Cuadro Benegas. Proyectos llave en mano con altísimos estándares de calidad técnica.",
    ],
    tags: ["Residencial", "Diseño"],
  },
  {
    id: "consultorio-casadoro",
    title: "Consultorio Casadoro",
    client: "priv",
    loc: "San Rafael, Mendoza",
    sub: "Espacios profesionales de vanguardia diseñados para la excelencia médica.",
    desc: [
      "Construcción de consultorios privados premium. Una obra de terminación fina donde el diseño aséptico se combina con la robustez estructural de DDEC.",
    ],
    tags: ["Salud", "Profesional"],
  },
  {
    id: "club-de-paleta",
    title: "Club de Paleta",
    client: "priv",
    loc: "San Rafael, Mendoza",
    sub: "Infraestructura deportiva de gran escala preparada para el desempeño de alto nivel.",
    desc: [
      "Desarrollo integral del Club de Paleta en San Rafael. Una obra donde la ingeniería de grandes luces y pavimentos deportivos técnicos fueron la clave del éxito.",
    ],
    tags: ["Deporte", "Estructura pesada"],
  },
  {
    id: "edificios-de-altura",
    title: "Edificios de Altura",
    client: "priv",
    loc: "Av. J. Roca y Av. Ballofet, San Rafael",
    sub: "Desarrollos multifamiliares de renta y vivienda en ubicaciones estratégicas.",
    desc: [
      "Construcción de complejos de departamentos. Proyectos en Av. J. Roca y Av. Ballofet. Soluciones habitacionales integrales con foco en la durabilidad del activo inmobiliario.",
    ],
    tags: ["Inmobiliario", "Altura"],
  },
  {
    id: "locales-comerciales",
    title: "Locales Comerciales",
    client: "priv",
    loc: "Av. Ballofet, San Rafael",
    sub: "Fachadas de alto impacto y espacios interiores flexibles para el éxito mercantil.",
    desc: [
      "Construcción de local comercial en Av. Ballofet. Diseño moderno que maximiza la exposición de marca y la durabilidad estructural.",
    ],
    tags: ["Comercial", "Diseño moderno"],
  },
];

const FIRST = [
  "comedor-utn",
  "edificios-de-altura",
  "museo-lagiglia",
  "residenciales-de-autor",
  "parque-de-los-ninos",
  "club-de-paleta",
  "paseo-pellegrini",
  "canal-sauce-la-leona",
  "base-transformador-pampa",
  "cielorrasos-afip",
  "casa-de-la-mujer",
  "ipv-san-rafael",
  "consultorio-casadoro",
  "junta-elastica-nihuil-2",
  "biblioteca-moreno",
];
const LAST = ["afip-san-luis", "afip-san-rafael", "dique-aisol"];

function weight(id) {
  const a = FIRST.indexOf(id);
  const z = LAST.indexOf(id);
  return a >= 0 ? a : z >= 0 ? 1000 + z : 100;
}

export const PROJECTS = RAW.map((p, i) => ({ ...p, photos: photosOf(p.id), _i: i }))
  .sort((a, b) => weight(a.id) - weight(b.id) || a._i - b._i)
  .map(({ _i, ...p }, index) => ({ ...p, index }));

export const clientByKey = Object.fromEntries(CLIENTS.map((c) => [c.key, c]));
export const projectById = (id) => PROJECTS.find((p) => p.id === id) || null;

export function counts() {
  const map = Object.fromEntries(CLIENTS.map((c) => [c.key, 0]));
  PROJECTS.forEach((p) => {
    map[p.client] += 1;
  });
  return map;
}

export const pad2 = (n) => String(n).padStart(2, "0");
