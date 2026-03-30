import React from "react";

const About = () => {
  return (
    <section className="py-32 bg-surface" id="about">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="aspect-[4/5] bg-surface-container-low overflow-hidden shadow-2xl">
            <img 
              className="w-full h-full object-cover grayscale opacity-80 hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHIJDwWav5EbMr4aND9ODPqOec9uiiZdv8tBtKleG4sNPfZJD5pJafeTKslgpJLneiY2_3BXoNc5CcTGbXBk5bKQtzkPutFCbTnZr3A8Q4uKDJHtWVa5y_iggqKjZG5klcyC7nRFnfSnEogx_sm6C-7YEI0Bwjs34c6x-q2BpRAFxgSvHmQacy9cRapxsusjjgozfsGAu5vLhD69a6PFkRWi0JDg0Xa0BiswLcRS5syTHz4Bj7xhXzTDV7L3J5QOALqX_DtkMxqg" 
              alt="Ingeniería D.D.E.C"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-primary-container p-8 max-w-xs hidden sm:block shadow-2xl border border-outline-variant/20">
            <p className="text-4xl font-extrabold text-on-primary-container mb-2">25+</p>
            <p className="text-sm font-bold uppercase tracking-widest text-on-primary-container/80">Años de Rigor en Ingeniería</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-4xl font-bold mb-8 tracking-tight text-on-surface">La Base de la Confiabilidad</h2>
          <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed font-body">
            <p>
              Desde nuestra fundación, D.D.E.C S.R.L. se ha mantenido como un monolito de precisión técnica en la región de Mendoza. Nuestro compromiso con la ingeniería civil va más allá de la construcción; diseñamos infraestructuras que sostienen comunidades e impulsan el progreso industrial.
            </p>
            <p>
              Con un profundo conocimiento de los requisitos sísmicos y la geología regional, nuestro equipo de ingenieros expertos garantiza que cada proyecto, desde edificios gubernamentales hasta complejos industriales, cumpla con los más altos estándares globales de seguridad y durabilidad.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <p className="text-primary font-bold text-lg mb-1">Integridad</p>
              <p className="text-sm text-secondary">Honestidad en cada cálculo y contrato.</p>
            </div>
            <div>
              <p className="text-primary font-bold text-lg mb-1">Precisión</p>
              <p className="text-sm text-secondary">Exactitud matemática en todos los diseños estructurales.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
