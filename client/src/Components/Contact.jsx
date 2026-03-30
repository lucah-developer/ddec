import React from "react";

const Contact = () => {
  return (
    <section className="py-32 bg-surface" id="contact">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-surface-container-low grid grid-cols-1 lg:grid-cols-2 shadow-2xl border border-outline-variant/10">
          <div className="p-12 md:p-20 border-r border-outline-variant/10">
            <h2 className="text-4xl font-bold mb-12 text-on-background">Consulta tu Próximo Proyecto</h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Nombre Completo</label>
                  <input 
                    className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface p-4 transition-all" 
                    type="text" 
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Correo Electrónico</label>
                  <input 
                    className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface p-4 transition-all" 
                    type="email" 
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Tipo de Consulta</label>
                <select className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface p-4 appearance-none">
                  <option>Consulta Estructural</option>
                  <option>Licitación de Obra Civil</option>
                  <option>Proyecto Industrial</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Resumen Técnico</label>
                <textarea 
                  className="w-full bg-surface-container-highest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-on-surface p-4 h-32 transition-all" 
                  placeholder="Detalla brevemente tu requerimiento..."
                ></textarea>
              </div>
              <button className="bg-primary text-on-primary px-12 py-5 font-bold uppercase tracking-widest hover:brightness-110 transition-all active:scale-95">
                Enviar Solicitud Técnica
              </button>
            </form>
          </div>
          
          <div className="flex flex-col">
            <div className="h-1/2 w-full bg-surface-container-highest relative overflow-hidden">
              <img 
                className="w-full h-full object-cover opacity-50 grayscale" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF1dkOwdpxv2CGMXf1L4YM92gMBfyHt_zRnyY2UyLRpurAoRGm9dqxaNvGPavW3EMz7MvkGHKFSG-duYqg--JDMrIaJzqUMj9dbaexCzei_vtk7SlR3DPH-nGqj9q3AfOKIBfnjvjzIlLi22g679FmaDABiRatoFvpNbjzLd1EMYe-6MNRcX5MODcujH0ODVlCVF3Ybb4YFuIWkgeLHCCUvqtkzIhousa-20QrVCHGos06Ox0pT0ft-25NY9i5QRtYNeY1--mgOA" 
                alt="Mapa San Rafael Mendoza"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary text-on-primary p-4 rounded-full shadow-2xl animate-pulse">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
              </div>
            </div>
            <div className="h-1/2 p-12 md:p-20 bg-surface-container-high space-y-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Sede Central</p>
                <p className="text-2xl font-bold text-on-surface">Av. Mitre 1250</p>
                <p className="text-secondary">San Rafael, Mendoza, Argentina</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Línea Directa</p>
                  <p className="font-bold text-on-surface text-lg">+54 260 444 8921</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Correo Electrónico</p>
                  <p className="font-bold text-on-surface text-lg">info@ddec.com.ar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
