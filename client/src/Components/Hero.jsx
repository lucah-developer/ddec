// HeroSection.jsx
import parque from "../Empresas/Muni/ParqueNiños/7.jpeg";
import edificio from "../Empresas/Afip/AFIP_SAN_LUIS/esquina.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      delay: 100,
      once: true,
    });
  }, []);

  const sections = [
    {
      title: "Parque De Los Niños",
      subtitle: "San Rafael",
      description:
        "Realizamos la remodelación y mantenimiento del Parque de Los Niños en San Rafael, Mendoza, un espacio recreativo dedicado a los más pequeños, situado junto a la Plaza Francia, promoviendo juego, diversión y encuentro familiar.",
      image: parque,
      linkProyecto: "/muni/#parque",
    },
    {
      title: "Edificio AFIP",
      subtitle: "San Luis",
      description:
        "Remodelamos y mantenemos el edificio principal de AFIP en San Luis, incluyendo baños y comedor, reafirmando nuestro compromiso con la excelencia en infraestructura.",
      image: edificio,
      linkProyecto: "/afip/#afip",
    },
    {
      title: "Paseo Pellegrini",
      subtitle: "San Rafael",
      description:
        "Construcción del Paseo Pellegrini, un punto neurálgico del centro de San Rafael, hogar de tiendas, negocios y heladerías, revitalizando un espacio clave para la comunidad.",
      image:
        "https://www.sanrafael.gov.ar/wp-content/uploads/2019/06/led-paseo-pellegrini.jpg",
      linkProyecto: "/muni#pellegrini",
    },
  ];

  // Reutilizamos exactamente el estilo de botones del HeroInicio:
  const primaryBtnStyle = {
    background: "linear-gradient(145deg, #E5E7EB, #9CA3AF)", // metálico claro
    color: "#111827",
    boxShadow: "0 8px 20px rgba(10,12,16,0.14)",
  };

  const secondaryBtnClass =
    "bg-white text-neutral-900 px-6 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition-colors duration-300";

  return (
    <section className="relative bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
      {/* patrón sutil metálico */}
      <div
        className="absolute inset-0 opacity-8 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative container mx-auto px-6 py-20 space-y-28 z-10">
        {/* Opcional: encabezado general */}
        <div className="text-center mb-6">
          <p className="text-sm uppercase tracking-wider text-neutral-400">
            Proyectos destacados
          </p>
        </div>

        {sections.map((sec, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row ${
              i % 2 === 0 ? "" : "md:flex-row-reverse"
            } items-center gap-12`}
          >
            {/* Imagen */}
            <div
              data-aos="fade-up"
              className="relative w-full md:w-1/2 rounded-xl overflow-hidden shadow-2xl border border-neutral-700 transition hover:scale-[1.01] duration-500"
              style={{
                // ligero "metallic frame"
                boxShadow:
                  "0 12px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02)",
              }}
            >
              <img
                src={sec.image}
                alt={sec.title}
                className="w-full h-[420px] object-cover transition-transform duration-700"
              />
              {/* overlay oscuro como en HeroInicio */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Texto */}
            <div
              data-aos="fade-left"
              className="md:w-1/2 space-y-6 text-center md:text-left"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-100 leading-tight">
                {sec.title}
              </h2>

              <h3 className="text-lg md:text-xl text-neutral-400 font-medium tracking-wide">
                {sec.subtitle}
              </h3>

              <p className="leading-relaxed text-justify text-neutral-300">
                {sec.description}
              </p>

              <div className="flex justify-center md:justify-start gap-4 pt-3">
                <a
                  href={sec.linkProyecto}
                  className="px-7 py-3 rounded-lg font-semibold transition transform hover:-translate-y-0.5"
                  style={primaryBtnStyle}
                >
                  Ver Proyecto
                </a>

                <a href="/#contacto" className={secondaryBtnClass}>
                  Contáctanos
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
