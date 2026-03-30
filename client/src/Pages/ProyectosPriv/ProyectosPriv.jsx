import React, { useEffect } from "react";
import ProjectDetail from "../../Components/ProjectDetail";
import ImagesConsultorio from "../../Empresas/Privados/Casadoro/CONSULTORIO";
import ImagesBarrio from "../../Empresas/Privados/Casas/CasasDeBarrio";
import ImagesCasasV from "../../Empresas/Privados/Casas/CasasVarias";
import ImagesCDPaleta from "../../Empresas/Privados/CLUB DE PALETA";
import ImagesDpdB from "../../Empresas/Privados/Deptos/Deptos Baloffet";
import ImagesDpdR from "../../Empresas/Privados/Deptos/Deptos Roca";
import ImagesLocalB from "../../Empresas/Privados/Local_Ballofet";
import ImagesFedeC from "../../OBRAS/Federico_Cinta";
import ImagesRodo from "../../OBRAS/ObraPrivAmiga_Rodolfo";

export default function ProyectosPriv() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getImages = (obj) => obj ? Object.values(obj) : [];

  const projects = [
    {
      id: "casaspriv",
      title: "Residenciales de Autor",
      subtitle: "Arquitectura habitacional personalizada que fusiona el estilo de vida con la solidez de ingeniería civil.",
      heroImage: getImages(ImagesBarrio)[0],
      images: [getImages(ImagesBarrio)[1], getImages(ImagesCasasV)[0], getImages(ImagesFedeC)[0], getImages(ImagesRodo)[0]],
      projectId: "DD-PR-RE-VAR",
      area: "Varios m²",
      year: "2018-2024",
      seismicZone: "Zona 4",
      materiality: "Hormigón, Metal y Terminaciones de Alta Gama",
      description: "Construcción de viviendas unifamiliares en barrios exclusivos de San Rafael como El Nihuil y Cuadro Benegas. Proyectos llave en mano con altísimos estándares de calidad técnica.",
      tags: ["Residencial", "Diseño", "San Rafael", "Mendoza"]
    },
    {
      id: "consultorio",
      title: "Consultorio Casadoro",
      subtitle: "Espacios profesionales de vanguardia diseñados para la excelencia médica.",
      heroImage: getImages(ImagesConsultorio)[8] || getImages(ImagesConsultorio)[0],
      images: getImages(ImagesConsultorio),
      projectId: "DD-PR-CO-23",
      area: "350 m²",
      year: "2023",
      seismicZone: "Zona 4",
      materiality: "Hormigón Visto y Pisos Técnicos",
      description: "Construcción de consultorios privados premium. Una obra de terminación fina donde el diseño aséptico se combina con la robustez estructural de DDEC.",
      tags: ["Salud", "Profesional", "San Rafael"]
    },
    {
      id: "cdp",
      title: "Club De Paleta",
      subtitle: "Infraestructura deportiva de gran escala preparada para el desempeño de alto nivel.",
      heroImage: getImages(ImagesCDPaleta)[4] || getImages(ImagesCDPaleta)[0],
      images: getImages(ImagesCDPaleta),
      projectId: "DD-PR-CP-22",
      area: "1,800 m²",
      year: "2022",
      seismicZone: "Zona 4",
      materiality: "Estructura Metálica de Gran Luces y Hormigón Polimerizado",
      description: "Desarrollo integral del Club de Paleta en San Rafael. Una obra donde la ingeniería de grandes luces y pavimentos deportivos técnicos fueron la clave del éxito.",
      tags: ["Deporte", "Estructura Pesada", "Mendoza"]
    },
    {
      id: "depas",
      title: "Edificios de Altura",
      subtitle: "Desarrollos multifamiliares de renta y vivienda en ubicaciones estratégicas.",
      heroImage: getImages(ImagesDpdR)[0],
      images: [getImages(ImagesDpdR)[1], getImages(ImagesDpdB)[0], getImages(ImagesDpdB)[1]],
      projectId: "DD-PR-ED-VAR",
      area: "Varios m²",
      year: "2020-2023",
      seismicZone: "Zona 4",
      materiality: "Estructura de Hormigón Independiente",
      description: "Construcción de complejos de departamentos. Proyectos en Av. J. Roca y Av. Ballofet. Soluciones habitacionales integrales con foco en la durabilidad del activo inmobiliario.",
      tags: ["Inmobiliario", "Altura", "San Rafael Center"]
    },
    {
      id: "local",
      title: "Locales Comerciales",
      subtitle: "Fachadas de alto impacto y espacios interiores flexibles para el éxito mercantil.",
      heroImage: getImages(ImagesLocalB)[4] || getImages(ImagesLocalB)[0],
      images: getImages(ImagesLocalB),
      projectId: "DD-PR-LC-21",
      area: "450 m²",
      year: "2021",
      seismicZone: "Zona 4",
      materiality: "Vidrio Templado y Pórticos de Hormigón",
      description: "Construcción de local comercial en Av. Ballofet. Diseño moderno que maximiza la exposición de marca y la durabilidad estructural en zonas de alta sismicidad.",
      tags: ["Comercial", "Marcas", "Diseño Moderno"]
    }
  ];

  return (
    <div className="bg-surface">
      <section className="pt-32 pb-12 px-8 text-center bg-surface-container-low border-b border-outline-variant/10">
        <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white uppercase mb-4">
          Inversiones Privadas
        </h1>
        <p className="text-on-surface-variant max-w-3xl mx-auto text-lg lowercase first-letter:uppercase">
          Proyectos desarrollados para el sector privado con un compromiso total hacia la rentabilidad y el prestigio arquitectónico.
        </p>
      </section>

      {projects.map((proj, idx) => (
        <ProjectDetail key={idx} {...proj} />
      ))}

      <section className="py-24 px-8 md:px-16 bg-surface-container-low border-t border-outline-variant/10 text-center">
        <h2 className="text-3xl font-bold font-headline text-white mb-8">INICIE SU PROYECTO PRIVADO</h2>
        <a href="mailto:constructoraddecsrl@gmail.com" className="px-16 py-6 bg-primary text-on-primary font-black uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all inline-block">
          Contactar Oficina Técnica
        </a>
      </section>
    </div>
  );
}
