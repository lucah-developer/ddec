import React from "react";

const Hero = () => {
  return (
    <section className="relative h-[716px] flex items-center bg-surface-container-lowest overflow-hidden" id="projects">
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover opacity-30 grayscale" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtzf1-ikPRAERu7XldaWZawXBr85r4LlZFaYiM8M2uX9g7IEXUZUtBdbsp-pKcvKI8XWksr8YKlwHoAAbxRzC4HzuaBKiL6HnsXbIeXG1euuAr5eNhbI2Qm3s564DqBS_unubkDDO0O1CmL_NAmlQT2kO8SGFoBp5sgUMA_DxWwNXGLcC6uUD8qDf-J7tHJqu-T8cggKtKcaZWBOr8E1kDiwt42yANmcsu7B9CV5C13t2wIxUZaSbPV0XhtzJ49el_8UlT0y9V9w" 
          alt="Proyectos Representativos D.D.E.C"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-on-background">Trabajos Representativos</h2>
        <p className="text-xl text-primary font-semibold tracking-widest uppercase">Infraestructura Gubernamental y Sector Privado</p>
      </div>
    </section>
  );
};

export default Hero;
