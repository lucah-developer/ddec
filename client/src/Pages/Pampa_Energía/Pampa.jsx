import React, { useEffect } from "react";
import ProjectDetail from "../../Components/ProjectDetail";
import ImagesTrafo from "../../Empresas/Pampa/Base_Transformador_PAMPA";
import ImagesSacde from "../../Empresas/Pampa/Pampa Energía-Sacde-Melisan";
import ImagesToro from "../../Empresas/Pampa/PampaAguaDelToro";
import ImagesDique from "../../Empresas/Pampa/Reparación Dique Aisol";

export default function Pampa() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getImages = (obj) => obj ? Object.values(obj) : [];

  const projects = [
    {
      id: "basepampa",
      title: "Base Transformador Pampa",
      subtitle: "Ingeniería de fundaciones pesadas para soporte de transformadores de alto voltaje.",
      heroImage: getImages(ImagesTrafo)[9] || getImages(ImagesTrafo)[0],
      images: getImages(ImagesTrafo),
      projectId: "DD-PE-BT-20",
      area: "120 m²",
      year: "2020",
      seismicZone: "Zona 4",
      materiality: "Hormigón de Alta Resistencia H35",
      description: "Construcción de la base del transformador para PAMPA ENERGÍA. Un proyecto de alta precisión donde la nivelación y la calidad del hormigón son críticas para la estabilidad del equipo electromecánico.",
      tags: ["Energía", "Hormigón Especial", "Ingeniería Eléctrica"]
    },
    {
      id: "sacde",
      title: "Junta Elástica Nihuil 2",
      subtitle: "Colaboración internacional en infraestructura hidroeléctrica de gran escala.",
      heroImage: getImages(ImagesSacde)[9] || getImages(ImagesSacde)[0],
      images: getImages(ImagesSacde),
      projectId: "DD-PE-JE-21",
      area: "Conexión Crítica",
      year: "2021",
      seismicZone: "Zona 4",
      materiality: "Elastómeros Industriales y Acero H30",
      description: "Construcción y colocación de la Junta Elástica para la Turbina del Nihuil 2. Proyecto realizado en colaboración con la empresa brasilera Sacde, enfocado en absorber vibraciones dinámicas de la turbina.",
      tags: ["Hidroelectricidad", "Sacde", "Sacde-Melisan"]
    },
    {
      id: "toro",
      title: "Pampa Agua del Toro",
      subtitle: "Soluciones de infraestructura en entornos geógraficos de alta complejidad.",
      heroImage: getImages(ImagesToro)[1] || getImages(ImagesToro)[0],
      images: getImages(ImagesToro),
      projectId: "DD-PE-AT-19",
      area: "Infraestructura de Campo",
      year: "2019",
      seismicZone: "Zona 4",
      materiality: "Mampostería Reforzada y Metal Pesado",
      description: "Construcción en Pampa Agua del Toro. Un proyecto que demuestra la capacidad de DDEC para operar en locaciones remotas, garantizando estándares de calidad industrial.",
      tags: ["Obra de Campo", "Pampa Energía", "San Rafael"]
    },
    {
      id: "dique",
      title: "Reparación Dique Aisol",
      subtitle: "Mantenimiento estructural preventivo y correctivo de presas reguladoras.",
      heroImage: getImages(ImagesDique)[2] || getImages(ImagesDique)[0],
      images: getImages(ImagesDique),
      projectId: "DD-PE-DA-22",
      area: "Presa Aisol",
      year: "2022",
      seismicZone: "Zona 4",
      materiality: "Hormigón Proyectado y Sellados de Alta Presión",
      description: "Se realizó la construcción y reparación del Dique Aisol. Intervenciones críticas para la seguridad estructural y la gestión hídrica eficiente del sistema Pampa Energía.",
      tags: ["Hidráulica", "Reparación Estructural", "Mendoza"]
    }
  ];

  return (
    <div className="bg-surface">
      <section className="pt-32 pb-12 px-8 text-center bg-surface-container-low border-b border-outline-variant/10">
        <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white uppercase mb-4">
          Pampa Energía
        </h1>
        <p className="text-on-surface-variant max-w-3xl mx-auto text-lg lowercase first-letter:uppercase">
          Infraestructura de soporte energético y reparaciones críticas. Alianza estratégica para el desarrollo industrial argentino.
        </p>
      </section>

      {projects.map((proj, idx) => (
        <ProjectDetail key={idx} {...proj} />
      ))}

      <section className="py-24 px-8 md:px-16 bg-surface-container-low border-t border-outline-variant/10 text-center">
        <h2 className="text-3xl font-bold font-headline text-white mb-8">¿Planea una intervención de alta ingeniería?</h2>
        <a href="mailto:constructoraddecsrl@gmail.com" className="px-12 py-5 bg-primary text-on-primary font-black uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all inline-block">
          Contactar Oficina Técnica
        </a>
      </section>
    </div>
  );
}
