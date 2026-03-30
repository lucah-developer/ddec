import React from "react";

const HeroInicio = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-40 grayscale" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmhyynAxTKJmqcRF5yVE-5NiKqrBz1YywiwRFw9jcXsN-SUODhNjJsodLExEc3Jf327-dkhQdkOQ-Uo3J50G2f5LhPqcvUKmhdvG4UOj-KTY-zxCBnXROIDiQwDUWY0SLpMFRKrgyPeeYoWvLeYNVzz0v1z2rJKQlV2FStTkIxA46mBsH98zdlB0BUsKaAMCOx9SN9Anm5q6Ja3L9ZgqIyJPk5dNuKn0GZ150p4iE9NPY6_FWtqVtzc5P0g3q8EjCVHDKXa3dD2w" 
          alt="Ingeniería Civil D.D.E.C"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="max-w-3xl">
          <h4 className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-sm">
            Empresa de Ingeniería Civil
          </h4>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-none text-blue-glow">
            Excelencia Estructural,<br/>
            <span className="text-primary-dim">Orgullo Regional.</span>
          </h1>
          <p className="text-xl text-secondary max-w-xl mb-10 leading-relaxed font-body">
            Definiendo el panorama arquitectónico de San Rafael, Mendoza a través de rigurosos estándares de ingeniería e innovación industrial.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              className="bg-primary text-on-primary px-8 py-4 font-bold rounded-sm hover:brightness-110 transition-all active:scale-95" 
              href="#projects"
            >
              Ver Portfolio
            </a>
            <a 
              className="bg-surface-container-highest text-on-surface px-8 py-4 font-bold rounded-sm hover:bg-surface-variant transition-all active:scale-95" 
              href="#contact"
            >
              Contactar Expertos
            </a>
          </div>
        </div>
      </div>

      {/* Asymmetric Detail */}
      <div className="absolute bottom-12 right-12 hidden lg:block">
        <div className="bg-surface-container-low p-8 border-l-4 border-primary shadow-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Identidad Local</p>
          <p className="font-headline font-bold text-xl text-on-surface">San Rafael, Mendoza</p>
          <p className="text-secondary text-sm">34.6177° S, 68.3301° W</p>
        </div>
      </div>
    </section>
  );
};

export default HeroInicio;
