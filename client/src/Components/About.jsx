// About.jsx
import React, { useEffect } from "react";
import paruqe from "../Empresas/Muni/ParqueNiños/7.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFlag } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 900, delay: 80, once: true });
  }, []);

  // Pattern para modo claro
  const lightPattern = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><circle cx='6' cy='6' r='2' fill='%239CA3AF' fill-opacity='0.15'/><circle cx='24' cy='24' r='1.6' fill='%239CA3AF' fill-opacity='0.08'/><circle cx='42' cy='42' r='2' fill='%23D1D5DB' fill-opacity='0.12'/></svg>")`;

  // Pattern para modo oscuro
  const darkPattern = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><circle cx='6' cy='6' r='2' fill='%23ffffff' fill-opacity='0.07'/><circle cx='24' cy='24' r='1.6' fill='%23ffffff' fill-opacity='0.05'/><circle cx='42' cy='42' r='2' fill='%239CA3AF' fill-opacity='0.08'/></svg>")`;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative py-24 px-6 overflow-hidden transition-colors duration-500 bg-white dark:bg-black text-gray-800 dark:text-white"
    >
      {/* Fondo degradado + pattern */}
      <div className="absolute inset-0" aria-hidden>
        {/* Degradado claro */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(243,244,246,0.95) 100%)",
          }}
        />
        {/* Degradado oscuro */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,1) 0%, rgba(15,15,15,0.95) 100%)",
          }}
        />

        {/* Pattern claro */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: lightPattern,
            backgroundRepeat: "repeat",
            backgroundSize: "40px 40px",
            opacity: 0.18,
          }}
        />

        {/* Pattern oscuro */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: darkPattern,
            backgroundRepeat: "repeat",
            backgroundSize: "40px 40px",
            opacity: 0.15,
          }}
        />
      </div>

      {/* Contenido */}
      <div className="relative max-w-7xl mx-auto z-10">
        {/* Título */}
        <div className="text-center mb-16">
          <h2
            id="about-title"
            className="text-4xl md:text-5xl font-extrabold tracking-tight flex items-center justify-center gap-3"
          >
            Sobre la Empresa
            <span className="inline-flex items-center justify-center rounded-full bg-gray-200/40 dark:bg-white/10 p-2">
              <FcAbout className="text-2xl" />
            </span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
            Somos una empresa constructora de San Rafael, Mendoza, especializada
            en obras públicas y privadas. Compromiso, calidad e innovación.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda */}
          <div className="space-y-10">
            <div data-aos="fade-right">
              <h3 className="text-3xl font-bold flex items-center gap-3">
                Nuestra Misión
                <span className="inline-flex items-center justify-center rounded-md bg-sky-800/10 dark:bg-sky-800/20 p-2 text-sky-500">
                  <BsFillRocketTakeoffFill className="text-lg" />
                </span>
              </h3>
              <p className="mt-4 text-gray-600 dark:text-slate-300 leading-relaxed text-justify">
                Impulsar el desarrollo sostenible mediante la construcción de
                obras públicas y privadas de alta calidad. Eficiencia,
                innovación y responsabilidad social.
              </p>
            </div>

            {/* Datos en cards */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div
                data-aos="fade-up"
                className="p-5 bg-gray-100/70 dark:bg-white/5 rounded-xl shadow-md border border-gray-200 dark:border-white/10 hover:border-sky-400/40 transition"
              >
                <FaFlag className="text-3xl text-sky-500 mb-3" />
                <h4 className="font-semibold text-xl">Fundada</h4>
                <p className="mt-2 text-gray-700 dark:text-slate-400 text-sm leading-relaxed">
                  Establecida en 2010 en San Rafael. Más de una década aportando
                  experiencia.
                </p>
              </div>

              <div
                data-aos="fade-up"
                className="p-5 bg-gray-100/70 dark:bg-white/5 rounded-xl shadow-md border border-gray-200 dark:border-white/10 hover:border-sky-400/40 transition"
              >
                <h4 className="font-semibold text-xl">+100 Proyectos</h4>
                <p className="mt-2 text-gray-700 dark:text-slate-400 text-sm leading-relaxed">
                  Proyectos que reflejan nuestra calidad y compromiso con la
                  seguridad.
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div data-aos="flip-left" className="flex justify-center">
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 hover:border-sky-400/40 transition">
              <img
                src={paruqe}
                alt="Proyecto destacado - Parque"
                className="object-cover w-full h-[420px] rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
