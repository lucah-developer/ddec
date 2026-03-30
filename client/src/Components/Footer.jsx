import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 dark:bg-black border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-12 py-16 gap-8 max-w-7xl mx-auto font-body">
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          <span className="text-xl font-bold text-slate-200 font-headline">D.D.E.C S.R.L.</span>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-medium">Firma Certificada ISO 9001 • Ingeniería Civil</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 text-xs uppercase tracking-widest font-semibold">
          <a className="text-slate-500 hover:text-slate-200 transition-colors" href="#">Legales</a>
          <a className="text-slate-500 hover:text-slate-200 transition-colors" href="#">Privacidad</a>
          <a className="text-primary hover:brightness-110 underline decoration-2 underline-offset-4 transition-all" href="#">Dashboard de Ingeniería</a>
        </div>
        
        <div className="flex gap-6">
          <a className="text-slate-500 hover:text-primary transition-all transform hover:scale-110" href="#">
            <span className="material-symbols-outlined">share</span>
          </a>
          <a className="text-slate-500 hover:text-primary transition-all transform hover:scale-110" href="#">
            <span className="material-symbols-outlined">link</span>
          </a>
        </div>
      </div>
      
      <div className="w-full px-12 py-8 border-t border-white/5 text-center">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">© 2024 D.D.E.C S.R.L. Civil Engineering. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;