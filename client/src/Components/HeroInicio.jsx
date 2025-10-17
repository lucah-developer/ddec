// HeroInicio.jsx
import React, { useEffect, useState } from "react";
import Typewriter from "./Typewriter";
import trafo from "../Empresas/Pampa/Base_Transformador_PAMPA/1.jpeg";
import aguatoro from "../Empresas/Pampa/PampaAguaDelToro/2.jpeg";
import park from "../Empresas/Muni/ParqueNiños/9.jpeg";

export default function HeroInicio({ useTypewriter = true }) {
  const backgrounds = [trafo, aguatoro, park];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((c) => (c + 1) % backgrounds.length),
      5000
    );
    return () => clearInterval(id);
  }, [backgrounds.length]);

  const words = [
    "Empresa Constructora DDEC S.R.L",
    "Calidad y seguridad en obras civiles",
  ];

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

      {/* overlay más ligero, sin tintes fuertes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,6,23,0.28), rgba(2,6,23,0.5))",
        }}
      />

      <div className="relative z-20 flex h-full w-full items-center justify-center px-6">
        <div className="text-center">
          <div className="flex flex-wrap items-baseline justify-center gap-4">
            <span
              className="text-base sm:text-lg md:text-4xl text-gray-200 font-bold"
              style={{ fontFamily: "var(--body-font)" }}
            >
              Empresa Constructora
            </span>

            <h1
              className="m-0 p-0 text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-white hero-heading"
              style={{ fontFamily: "var(--heading-font)" }}
              aria-label="Nombre de la empresa"
            >
              <Typewriter
                text="D.D.E.C S.R.L"
                typingSpeed={110}
                startDelay={180}
                className="text-inherit"
              />
            </h1>
          </div>

          {/* si querés subtítulo debajo: */}
          <p
            className="text-base md:text-xl text-gray-300 mb-6 font-light tracking-wide mt-3"
            style={{ fontFamily: "var(--body-font)" }}
          >
            Desarrollo de Estructuras Cíviles de San Rafael, Mendoza
          </p>
        </div>
      </div>

      <div className="absolute left-6 bottom-8 z-30 flex gap-2">
        {backgrounds.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a slide ${i + 1}`}
            aria-pressed={current === i}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              current === i ? "scale-125 bg-gray-100" : "bg-gray-400/50"
            }`}
          />
        ))}
      </div>
    </header>
  );
}
