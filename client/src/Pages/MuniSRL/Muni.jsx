import React, { useEffect } from "react";
import ProjectDetail from "../../Components/ProjectDetail";
import ImagesBiblioteca from "../../Empresas/Muni/BibliotecaMMoreno";
import ImagesCanchaH from "../../Empresas/Muni/Cancha_Hockey";
import ImagesCasaM from "../../Empresas/Muni/Casa de Mujer";
import ImagesCentroI from "../../Empresas/Muni/Cic C. Benegas";
import ImagesCicloVía from "../../Empresas/Muni/Ciclo Vía";
import ImagesColector from "../../Empresas/Muni/ColectorIndustrial";
import ImagesComedorUni from "../../Empresas/Muni/Comedor_Universitario";
import ImagesEstaciones from "../../Empresas/Muni/EstacionesEco";
import ImagesManKM0 from "../../Empresas/Muni/Mantenimiento Km0";
import ImagesMuseo from "../../Empresas/Muni/Museo San Rafael";
import ImagesParque from "../../Empresas/Muni/ParqueNiños";
import ImagesPelegrini from "../../Empresas/Muni/PaseoPelegrini";
import ImagesPlayonD from "../../Empresas/Muni/Playon_Deportivo_Balofett";
import ImagesPlazaRosas from "../../Empresas/Muni/Plaza Salto de Las Rosas";
import ImagesPlazaB from "../../Empresas/Muni/Plaza_Belgrano";
import ImagesPlazaRama from "../../Empresas/Muni/Plaza_Rama_Caída";
import ImagesLoteo from "../../Empresas/Muni/Urba Loteo Ptocrear/Fotos";

export default function Muni() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const getImages = (obj) => obj ? Object.values(obj) : [];

  const projects = [
    {
      id: "museo",
      title: "Museo Humberto Lagiglia",
      subtitle: "Construcción del Museo de Historia Natural de San Rafael, un hito cultural y arquitectónico.",
      heroImage: "https://www.memo.com.ar/files/image/50/50649/64236f1432609.jpg",
      images: getImages(ImagesMuseo),
      projectId: "DD-MU-MU-21",
      area: "2,800 m²",
      year: "2021",
      seismicZone: "Zona 4",
      materiality: "Hormigón Visto y Vidrio Técnico",
      description: "Se realizó la construcción integral del Museo de Historia Natural 'Dr. Humberto Lagiglia'. El edificio integra galerías de exposición con laboratorios de investigación técnica.",
      tags: ["Cultura", "Mendoza", "San Rafael"],
      location3D: { lat: -34.61462, lng: -68.33065, tilt: 45, range: 300 }
    },
    {
      id: "pellegrini",
      title: "Paseo Pellegrini",
      subtitle: "Renovación del núcleo comercial céntrico con infraestructura peatonal avanzada.",
      heroImage: "https://www.sanrafael.gov.ar/wp-content/uploads/2019/06/led-paseo-pellegrini.jpg",
      images: getImages(ImagesPelegrini),
      projectId: "DD-MU-PE-19",
      area: "4,500 m²",
      year: "2019",
      seismicZone: "Zona 4",
      materiality: "Pórfido y Luminaria LED Industrial",
      description: "Construcción del Paseo Pellegrini en el centro de San Rafael. Un espacio dinámico que concentra la actividad comercial y social del departamento.",
      tags: ["Urbanismo", "Comercio", "Iluminación"],
      location3D: { lat: -34.61805, lng: -68.33189, tilt: 45, range: 250 }
    },
    {
      id: "parque",
      title: "Parque de los Niños",
      subtitle: "Megaproyecto de recreación infantil con estándares internacionales de seguridad.",
      heroImage: getImages(ImagesParque)[6] || getImages(ImagesParque)[0],
      images: getImages(ImagesParque),
      projectId: "DD-MU-PN-20",
      area: "12,000 m²",
      year: "2020",
      seismicZone: "Zona 4",
      materiality: "Pisos Antimpacto y Estructuras Metálicas",
      description: "Remodelación y mantenimiento integral del Parque de los Niños. Un espacio emblemático junto a la Plaza Francia diseñado para el juego y el aprendizaje.",
      tags: ["Recreación", "Estructura Metálica", "Social"],
      location3D: { lat: -34.60982, lng: -68.34311, tilt: 45, range: 500 }
    },
    {
      id: "bmoreno",
      title: "Biblioteca M. Moreno",
      subtitle: "Refuerzo estructural y modernización de la cubierta envolvente.",
      heroImage: getImages(ImagesBiblioteca)[9] || getImages(ImagesBiblioteca)[0],
      images: getImages(ImagesBiblioteca),
      projectId: "DD-MU-BM-22",
      area: "1,500 m²",
      year: "2022",
      seismicZone: "Zona 4",
      materiality: "Techo Técnico y Parasoles Industriales",
      description: "Construcción del techo y parasoles de la Biblioteca Mariano Moreno. Soluciones de protección térmica y solar para la preservación de archivos culturales.",
      tags: ["Protección Solar", "Cultura", "Patrimonio"],
      location3D: { lat: -34.61665, lng: -68.33412, tilt: 45, range: 200 }
    },
    {
      id: "comedoruni",
      title: "Comedor Universitario UTN",
      subtitle: "Infraestructura de servicios para la formación académica superior.",
      heroImage: getImages(ImagesComedorUni)[27] || getImages(ImagesComedorUni)[0],
      images: getImages(ImagesComedorUni),
      projectId: "DD-MU-CU-18",
      area: "850 m²",
      year: "2018",
      seismicZone: "Zona 4",
      materiality: "Hormigón Armado y Cerramientos de Aluminio",
      description: "Construcción del Comedor Universitario para la UTN San Rafael. Espacios diseñados para la funcionalidad y el alto tránsito estudiantil.",
      tags: ["Educación", "Servicios", "UTN"]
    }
  ];

  return (
    <div className="bg-surface">
      <section className="pt-32 pb-12 px-8 text-center bg-surface-container-low border-b border-outline-variant/10">
        <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white uppercase mb-4">
          Infraestructura Municipal
        </h1>
        <p className="text-on-surface-variant max-w-3xl mx-auto text-lg">
          Portafolio de obras públicas desarrolladas para la Municipalidad de San Rafael. Transformando el entorno urbano con precisión de ingeniería civil.
        </p>
      </section>

      {projects.map((proj, idx) => (
        <ProjectDetail key={idx} {...proj} />
      ))}

      {/* Inquiry Form */}
      <section className="py-24 px-8 md:px-16 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex flex-col md:row gap-16 items-start">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-extrabold font-headline tracking-tight text-white mb-6 uppercase">Consultas <br/> Institucionales</h2>
            <p className="text-on-surface-variant mb-8 text-lg">Nuestra oficina técnica está disponible para asesorías integrales en obra pública y privada.</p>
            <div className="space-y-4 text-primary">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">location_on</span>
                <span className="text-sm font-semibold uppercase tracking-wider">Mendoza, Argentina</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">mail</span>
                <span className="text-sm font-semibold uppercase tracking-wider">constructoraddecsrl@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 w-full bg-surface-container p-8 md:p-12 shadow-2xl">
            <form action="#" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Nombre del Responsable</label>
                <input className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-white p-4 font-body" type="text" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Email Organizacional</label>
                <input className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-white p-4 font-body" type="email" />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Descripción del Requerimiento</label>
                <textarea className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-white p-4 font-body h-32"></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full md:w-auto px-16 py-6 bg-primary text-on-primary font-black uppercase tracking-[0.3em] text-sm hover:brightness-110 active:scale-95 transition-all">
                  Enviar Requerimiento
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
