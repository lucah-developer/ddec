import React, { useEffect } from "react";
import ProjectDetail from "../../Components/ProjectDetail";
import ImagesIPV from "../../Empresas/IPV";

export default function Ipv() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getImages = (obj) => obj ? Object.values(obj) : [];

  const projects = [
    {
      id: "ipv",
      title: "Barrios IPV San Rafael",
      subtitle: "Construcción masiva de viviendas residenciales con enfoque en la eficiencia estructural y social.",
      heroImage: getImages(ImagesIPV)[18] || getImages(ImagesIPV)[0],
      images: getImages(ImagesIPV),
      projectId: "DD-IPV-SR-22",
      area: "1.5 Hectáreas",
      year: "2022",
      seismicZone: "Zona 4",
      materiality: "Mampostería Portante y Hormigón Armado",
      description: "Ejecución de barrios para el Instituto Provincial de la Vivienda (IPV). Proyectos de alto impacto social que requieren una gestión logística y constructiva optimizada para el cumplimiento de plazos gubernamentales.",
      tags: ["Social", "Vivienda", "San Rafael", "Mendoza"]
    }
  ];

  return (
    <div className="bg-surface">
      <section className="pt-32 pb-12 px-8 text-center bg-surface-container-low border-b border-outline-variant/10">
        <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white uppercase mb-4">
          IPV
        </h1>
        <p className="text-on-surface-variant max-w-3xl mx-auto text-lg lowercase first-letter:uppercase">
          Infraestructura habitacional y compromiso ciudadano. Construyendo el futuro habitacional de la provincia.
        </p>
      </section>

      {projects.map((proj, idx) => (
        <ProjectDetail key={idx} {...proj} />
      ))}

      <section className="py-24 px-8 md:px-16 bg-surface-container-low border-t border-outline-variant/10 text-center">
        <h2 className="text-4xl font-bold font-headline text-white mb-8">HABLE CON NOSOTROS</h2>
        <a href="mailto:constructoraddecsrl@gmail.com" className="px-16 py-6 bg-primary text-on-primary font-black uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all inline-block">
          Contactar Oficina Técnica
        </a>
      </section>
    </div>
  );
}
