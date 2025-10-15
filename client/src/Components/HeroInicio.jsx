// HeroInicio.jsx
import React, { useEffect, useState } from "react";
import Typewriter from "./Typewriter";
import trafo from "../Empresas/Pampa/Base_Transformador_PAMPA/1.jpeg";
import aguatoro from "../Empresas/Pampa/PampaAguaDelToro/2.jpeg";
import park from "../Empresas/Muni/ParqueNiños/9.jpeg";

export default function HeroInicio() {
  const backgrounds = [trafo, aguatoro, park];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % backgrounds.length),
      5000
    );
    return () => clearInterval(id);
  }, [backgrounds.length]);

  return (
    <header
      id="inicio"
      className="relative h-screen w-full overflow-hidden"
      aria-label="Sección principal"
    >
      {backgrounds.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Fondo ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            current === i ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          loading="lazy"
        />
      ))}

      {/* overlay oscuro con degradado para matizar imágenes claras */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.45), rgba(2,6,23,0.65))",
        }}
      />

      <div className="relative z-20 flex h-full w-full items-center justify-center px-6">
        <div className="max-w-6xl text-center">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <Typewriter words={["Empresa Constructora DDEC S.R.L"]} />
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 font-light tracking-wide">
            Desarrollo de Estructuras Cíviles de San Rafael, Mendoza
          </p>

          <div className="flex items-center justify-center gap-5 flex-wrap">
            <a
              href="#empresasyproyectos"
              className="inline-block px-8 py-3 rounded-lg text-lg font-semibold shadow-md transform hover:-translate-y-0.5 transition btn-metal btn-contrast"
            >
              Ver proyectos
            </a>

            <a
              href="#contacto"
              className="inline-block px-8 py-3 rounded-lg border border-gray-300 text-white font-semibold text-lg hover:bg-white hover:text-gray-900 transition"
              aria-label="Contactar"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>

      <div className="absolute left-6 bottom-8 z-30 flex gap-2">
        {backgrounds.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === i ? "scale-125 bg-gray-100" : "bg-gray-400/50"
            }`}
          />
        ))}
      </div>
    </header>
  );
}
