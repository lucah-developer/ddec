import React, { useEffect } from "react";
import ProjectDetail from "../../Components/ProjectDetail";
import ImagesCanal from "../../Empresas/Irrigación/Canal";
import ImagesCompuertas from "../../Empresas/Irrigación/Compuertas";

export default function Irrigación() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getImages = (obj) => obj ? Object.values(obj) : [];

  const projects = [
    {
      id: "canal",
      title: "Canal Sauce La Leona",
      subtitle: "Ingeniería hidráulica para la gestión y distribución de recursos hídricos en zonas agrícolas.",
      heroImage: getImages(ImagesCanal)[24] || getImages(ImagesCanal)[0],
      images: getImages(ImagesCanal),
      projectId: "DD-IR-CL-19",
      area: "Cuadro Benegas",
      year: "2019",
      seismicZone: "Zona 4",
      materiality: "Hormigón de Alta Resistencia",
      description: "Construcción del Canal Sauce La Leona. Un proyecto crítico para el Departamento General de Irrigación, asegurando la eficiencia en el transporte de agua hacia las zonas productoras del sur mendocino.",
      tags: ["Hidráulica", "Agricultura", "Cuadro Benegas"]
    },
    {
      id: "compuertas",
      title: "Compuertas Derivador Matriz",
      subtitle: "Tecnología de control y derivación de caudales hídricos de alta precisión.",
      heroImage: getImages(ImagesCompuertas)[0],
      images: getImages(ImagesCompuertas),
      projectId: "DD-IR-DM-20",
      area: "Goudge",
      year: "2020",
      seismicZone: "Zona 4",
      materiality: "Acero Galvanizado y Hormigón Armado",
      description: "Reparación y construcción del sistema de compuertas en el derivador Matriz. Obras esenciales para el control de caudales y el mantenimiento de la red de irrigación provincial.",
      tags: ["Mantenimiento Hídrico", "Goudge", "Infraestructura"]
    }
  ];

  return (
    <div className="bg-surface">
      <section className="pt-32 pb-12 px-8 text-center bg-surface-container-low border-b border-outline-variant/10">
        <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white uppercase mb-4">
          Irrigación
        </h1>
        <p className="text-on-surface-variant max-w-3xl mx-auto text-lg lowercase first-letter:uppercase">
          Proyectos hídricos e infraestructura de riego. Gestión eficiente del recurso vital para el desarrollo provincial.
        </p>
      </section>

      {projects.map((proj, idx) => (
        <ProjectDetail key={idx} {...proj} />
      ))}

      <section className="py-24 px-8 md:px-16 bg-surface-container-low border-t border-outline-variant/10 text-center">
        <h2 className="text-3xl font-bold font-headline text-white mb-8">CONTACTO PRODUCTIVO</h2>
        <a href="mailto:constructoraddecsrl@gmail.com" className="px-12 py-5 bg-primary text-on-primary font-black uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all inline-block">
          Contactar Oficina Técnica
        </a>
      </section>
    </div>
  );
}
