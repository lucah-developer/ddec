import React, { useEffect } from "react";
import ProjectDetail from "../../Components/ProjectDetail";
import ImagesSanLuis from "../../Empresas/Afip/AFIP_SAN_LUIS/Index";
import ImagesCielor from "../../Empresas/Afip/CIELORRASOS_SR/Index";
import ImagesSanRa from "../../Empresas/Afip/AFIP_SAN_RAFAEL/index";

export default function Afip() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      title: "AFIP San Luis",
      subtitle: "Remodelación integral y mantenimiento del edificio administrativo principal, incluyendo áreas comunes y comedores.",
      heroImage: ImagesSanLuis.tres || ImagesSanLuis.uno,
      images: [ImagesSanLuis.uno, ImagesSanLuis.dos, ImagesSanLuis.cuatro, ImagesSanLuis.cinco],
      projectId: "DD-AF-SL-23",
      area: "3,500 m²",
      year: "2023",
      seismicZone: "Zona 3",
      materiality: "Hormigón de Alta Densidad",
      manifestoTitle: "Desafío de Infraestructura",
      manifestoPara1: "Se realizó la remodelación y el mantenimiento del edificio principal de AFIP en la ciudad de San Luis. El proyecto incluyó la renovación completa de los baños y el comedor principal, integrando acabados industriales con la robustez estructural requerida.",
      manifestoPara2: "Nuestro equipo se centró en minimizar la interrupción del servicio administrativo mientras se aplicaban soluciones de ingeniería estructural para reforzar la durabilidad de las instalaciones de alto tránsito.",
      tags: ["Sector Público", "Mantenimiento Civil", "San Luis"]
    },
    {
      title: "Cielorrasos AFIP",
      subtitle: "Construcción técnica de cielorrasos suspendidos para la optimización acústica y térmica de las oficinas administrativas.",
      heroImage: ImagesCielor.uno,
      images: [ImagesCielor.dos, ImagesCielor.tres, ImagesCielor.cuatro],
      projectId: "DD-AF-CR-22",
      area: "1,200 m²",
      year: "2022",
      seismicZone: "Zona 4",
      materiality: "Paneles Técnicos y Estructura Liviana",
      manifestoTitle: "Soluciones de Terminación",
      manifestoPara1: "Construcción de los cielorrasos pertenecientes a las oficinas de AFIP en San Rafael. Se implementaron sistemas de montaje rápido y alta resistencia para garantizar la seguridad en zonas de alta sismicidad.",
      manifestoPara2: "La precisión milimétrica en el nivelado y la elección de materiales incombustibles fueron pilares para cumplir con los estándares de seguridad vial de edificios gubernamentales.",
      tags: ["Terminaciones Técnicas", "San Rafael", "Acústica Industrial"]
    },
    {
      title: "San Rafael Admin",
      subtitle: "Ejecución de núcleos sanitarios avanzados con foco en durabilidad industrial y optimización de recursos hídricos.",
      heroImage: ImagesSanRa.uno,
      images: [ImagesSanRa.dos, ImagesSanRa.tres, ImagesSanRa.cuatro, ImagesSanRa.cinco],
      projectId: "DD-AF-SR-21",
      area: "450 m²",
      year: "2021",
      seismicZone: "Zona 4",
      materiality: "Hormigón Armado y Cerramientos Técnicos",
      manifestoTitle: "Higiene y Estructura",
      manifestoPara1: "Se realizó la construcción de los baños pertenecientes al edificio de la AFIP en San Rafael, Mendoza. Un proyecto de pequeña escala pero de alta complejidad técnica debido a la integración de sistemas hidráulicos industriales.",
      manifestoPara2: "Cada componente fue evaluado para resistir el uso intensivo, utilizando refuerzos estructurales que exceden la normativa local, asegurando décadas de operatividad sin fisuras.",
      tags: ["Obra Civil", "Mendoza", "Infraestructura Pública"]
    }
  ];

  return (
    <div className="bg-surface">
      {/* Header section special for the company */}
      <section className="pt-32 pb-12 px-8 text-center bg-surface-container-low border-b border-outline-variant/10">
        <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-white uppercase mb-4">
          Operaciones AFIP
        </h1>
        <p className="text-on-surface-variant max-w-3xl mx-auto text-lg">
          Compendio de proyectos de infraestructura ejecutados para la Administración Federal de Ingresos Públicos. Compromiso con el rigor administrativo y estructural.
        </p>
      </section>

      {projects.map((proj, idx) => (
        <ProjectDetail key={idx} {...proj} />
      ))}

      {/* Final Inquiry CTA */}
      <section className="py-24 px-8 md:px-16 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-extrabold font-headline tracking-tight text-white mb-6 uppercase">Discutir un <br/> Proyecto Similar</h2>
            <p className="text-on-surface-variant mb-8 text-lg">¿Interesado en llevar la precisión estructural a su próxima obra? Contáctese con nuestro equipo directivo.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary group">
                <span className="material-symbols-outlined transition-transform group-hover:scale-110">location_on</span>
                <span className="text-sm font-semibold uppercase tracking-wider">San Rafael, Mendoza, Argentina</span>
              </div>
              <div className="flex items-center gap-3 text-primary group">
                <span className="material-symbols-outlined transition-transform group-hover:scale-110">mail</span>
                <a href="mailto:constructoraddecsrl@gmail.com" className="text-sm font-semibold uppercase tracking-wider hover:text-white transition-colors">constructoraddecsrl@gmail.com</a>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 w-full bg-surface-container p-8 md:p-12 shadow-2xl border border-outline-variant/10">
            <form action="#" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Nombre Completo</label>
                <input className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-white p-4 transition-colors font-body" type="text" placeholder="Ingresar nombre..." />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Correo Institucional</label>
                <input className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-white p-4 transition-colors font-body" type="email" placeholder="ejemplo@organizacion.com" />
              </div>
              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Requerimiento Técnico</label>
                <textarea className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-white p-4 transition-colors resize-none font-body h-32" placeholder="Describa los alcances estructurales de su proyecto..."></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full md:w-auto px-16 py-6 bg-primary text-on-primary font-black uppercase tracking-[0.3em] text-sm hover:brightness-110 transition-all active:scale-95" type="submit">
                  Enviar Consulta
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
