import React from "react";
import Obras from "./Obras";
import Hero from "./Hero";
import HeroInicio from "./HeroInicio";
import About from "./About";
import Contact from "./Contact";

const Project = () => {
  return (
    <div className="bg-background selection:bg-primary-container selection:text-on-primary-container">
      {/* Hero Principal */}
      <HeroInicio />

      {/* Sección Sobre Nosotros */}
      <About />

      {/* Proyectos Destacados (Hero) */}
      <Hero />

      {/* Expertise / Proyectos Grid */}
      <section id="expertise" className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <Obras />
        </div>
      </section>

      {/* Contacto */}
      <Contact />
    </div>
  );
};

export default Project;
