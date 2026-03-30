import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { MdClose, MdChevronLeft, MdChevronRight, MdZoomIn } from "react-icons/md";

const ModalGallery = ({ images, initialIndex, onClose }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    startIndex: initialIndex,
    loop: true 
  });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-surface-container-lowest/95 backdrop-blur-2xl p-4 md:p-12"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Technical Documentation</span>
          <span className="text-xl font-headline font-bold text-white uppercase italic">Project Evidence Gallery</span>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 bg-white/5 hover:bg-primary hover:text-on-primary transition-all rounded-full flex items-center justify-center text-white"
        >
          <MdClose size={32} />
        </button>
      </div>

      {/* Main Carousel Area */}
      <div className="flex-1 relative flex items-center overflow-hidden">
        {/* Navigation Buttons */}
        <button 
          onClick={scrollPrev}
          className="hidden md:flex absolute left-4 z-10 w-16 h-16 bg-white/5 hover:bg-primary hover:text-on-primary transition-all rounded-full items-center justify-center text-white"
        >
          <MdChevronLeft size={48} />
        </button>
        <button 
          onClick={scrollNext}
          className="hidden md:flex absolute right-4 z-10 w-16 h-16 bg-white/5 hover:bg-primary hover:text-on-primary transition-all rounded-full items-center justify-center text-white"
        >
          <MdChevronRight size={48} />
        </button>

        {/* Viewport */}
        <div className="embla w-full h-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="embla__container h-full flex items-center">
            {images.map((img, idx) => (
              <div key={idx} className="embla__slide flex-[0_0_100%] h-full flex items-center justify-center px-4">
                <img 
                  src={img} 
                  alt={`Structural detail ${idx + 1}`}
                  className="max-w-full max-h-full object-contain shadow-[0_0_100px_-20px_rgba(175,198,255,0.2)] border border-outline-variant/10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Indicator */}
      <div className="mt-8 flex justify-between items-end border-t border-outline-variant/20 pt-8">
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button 
              key={i}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              className={`h-1 transition-all duration-500 rounded-full ${selectedIndex === i ? 'w-12 bg-primary' : 'w-4 bg-white/10'}`}
            />
          ))}
        </div>
        <div className="text-[10px] font-mono text-on-surface-variant font-bold uppercase tracking-widest">
           IMAGE_REF_{selectedIndex + 1} / TOTAL_{images.length}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectDetail = ({ 
  id,
  title, 
  subtitle, 
  heroImage, 
  projectId, 
  area, 
  year, 
  seismicZone, 
  materiality, 
  images = [], 
  description,
  manifestoTitle,
  manifestoPara1,
  manifestoPara2,
  tags = []
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const openGallery = (index) => {
    setInitialIndex(index);
    setModalOpen(true);
  };

  // Combine hero + project images for the gallery
  const allImages = [heroImage, ...images].filter(Boolean);

  return (
    <div id={id} className="bg-surface text-on-background font-body selection:bg-primary/30">
      <AnimatePresence>
        {modalOpen && (
          <ModalGallery 
            images={allImages} 
            initialIndex={initialIndex} 
            onClose={() => setModalOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* 1. High-Impact Hero */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-end pb-24 px-8 md:px-16">
        <div className="absolute inset-0 z-0">
          <img 
            alt={title} 
            className="w-full h-full object-cover grayscale brightness-50" 
            src={heroImage} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 mb-6 rounded-sm"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase font-label">Struct_ID: {projectId}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-headline font-black tracking-tighter leading-none mb-8 text-white uppercase italic"
          >
            {title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-on-surface-variant max-w-3xl font-light leading-relaxed mb-8"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. Technical Summary */}
      <section className="bg-surface-container-low py-32 px-8 md:px-16 border-y border-outline-variant/10 tectonic-grid relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {[
            { label: 'Calculated Area', value: area || '12,450 m²' },
            { label: 'Engineering Year', value: year || '2024' },
            { label: 'Seismic Response', value: seismicZone || 'Zone 4' },
            { label: 'Primary Stress Mat.', value: materiality || 'Concrete H35' },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-4 group"
            >
              <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.4em] font-label leading-none">{item.label}</p>
              <p className="text-2xl md:text-4xl font-headline font-black text-white italic tracking-tighter group-hover:text-primary transition-colors duration-500">{item.value}</p>
              <div className="h-0.5 w-8 bg-outline-variant group-hover:w-full group-hover:bg-primary transition-all duration-700"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Image Gallery - FIXED 3 BOXES GRID */}
      <section className="py-32 px-8 md:px-16 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[700px]">
            {/* Main Image (Box 1) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              onClick={() => openGallery(0)}
              className="md:col-span-8 h-[400px] md:h-full bg-surface-container-highest overflow-hidden rounded-sm border border-outline-variant/20 relative group cursor-pointer"
            >
              <img 
                alt="Architecture Overview" 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                src={allImages[0]} 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-5xl transform scale-50 group-hover:scale-100 transition-transform duration-500">fullscreen</span>
              </div>
              <div className="absolute bottom-6 left-6 bg-surface-container-low/80 backdrop-blur-md px-4 py-2 border border-outline-variant/20">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Main Facade View</span>
              </div>
            </motion.div>

            {/* Sub Images (Box 2 & 3) */}
            <div className="md:col-span-4 flex flex-col gap-8 h-full">
              {[allImages[1], allImages[2]].map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  onClick={() => openGallery(idx + 1)}
                  className="flex-1 h-[250px] bg-surface-container-highest overflow-hidden rounded-sm border border-outline-variant/20 relative group cursor-pointer"
                >
                  {img ? (
                    <>
                      <img 
                        alt={`Structural detail ${idx + 2}`} 
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                        src={img} 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-3xl">add_photo_alternate</span>
                      </div>
                      {idx === 1 && allImages.length > 3 && (
                        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex flex-col items-center justify-center pointer-events-none group-hover:bg-primary/40 transition-all">
                           <span className="text-4xl font-headline font-black text-white">+{allImages.length - 3}</span>
                           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">More Evidence</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-surface-container-low flex items-center justify-center border-2 border-dashed border-outline-variant/20 opacity-30">
                       <span className="material-symbols-outlined text-5xl">pending</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Engineering Visualization - BIM Layer */}
      <section className="py-32 bg-surface-container-lowest relative border-y border-outline-variant/10 overflow-hidden" id="bim">
        <div className="absolute inset-0 opacity-[0.03] tectonic-grid"></div>
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="flex-1 space-y-12">
            <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-white uppercase italic leading-[0.85]">
              Structural <br/>
              <span className="text-primary italic">Intelligence</span>
            </h2>
            <div className="space-y-10">
              {[
                { icon: 'architecture', title: 'Calculated Synergy', desc: 'BIM-driven structural analysis ensuring high seismic resilience and material efficiency.' },
                { icon: 'settings_suggest', title: 'Load Distribution', desc: 'Stress management via finite element modeling for industrial-grade stability.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-surface-container-high border border-outline-variant flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                    <span className="material-symbols-outlined text-primary group-hover:text-black transition-colors">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-xl text-white uppercase italic mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-on-surface-variant text-sm md:text-base font-light leading-relaxed max-w-md">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/5] bg-surface-container-high/40 backdrop-blur-3xl rounded-sm overflow-hidden border border-outline-variant/20 shadow-[0_0_100px_-20px_rgba(175,198,255,0.05)] relative z-10">
              <img 
                alt="Digital Twin Visualization" 
                className="w-full h-full object-cover opacity-50 grayscale mix-blend-screen" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVXlV_GbT0TbF9flhqPlsnDV_ycFP6w5966BlzL3ZG2qulkaeOj4a4oMyYkw2Ky2vDeCorqPf4JFVGGrYfRGFmkgBhuInMiPWzGaLDWEuVKcHDPYchgbcT8jfAzv97yP7qO0Rph3h6mNP0YHBY5tbcgPSp5MtK6jrzDT99y5RZW5Z5SO9WTBhYwZGtjl9O4CVv9hEoD4kiURL46vWnx3v8f4C2vICCwJaYVzxbRqfX9KCLCwBAHLbA8ZC4yBhmSEm-s6niEcjnHg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-32 h-32 border border-primary/20 rounded-full flex items-center justify-center animate-pulse">
                   <div className="w-24 h-24 border border-primary/40 rounded-full flex items-center justify-center">
                     <span className="material-symbols-outlined text-primary text-5xl">hub</span>
                   </div>
                </div>
                <div className="px-6 py-2 bg-primary/10 border border-primary/20 backdrop-blur-md text-primary font-black text-[10px] uppercase tracking-[0.4em] font-label">BIM Engine v5.2 Optimized</div>
              </div>
            </div>
            
            {/* Real-time Telemetry Data overlay */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 p-8 bg-surface-container-high border border-outline-variant/20 shadow-2xl z-20 space-y-4 max-w-[250px]">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Systems_Online</span>
              </div>
              <div className="h-[1px] w-full bg-white/5"></div>
              <div className="space-y-2 font-mono text-[10px] text-primary">
                 <p>&gt; AXIAL_LOAD: 45.2kN</p>
                 <p>&gt; TORQUE_V: 12.87</p>
                 <p>&gt; SEISMIC_CAT: Z4_HIGH</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Manifesto Section */}
      <section className="py-40 px-8 md:px-16 bg-surface overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.02] grayscale" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCn5-CGpG2wEgXo0rYfyEnyO6vKWSRdIBOqvO9oeGnSb8Gnc4XoASwH9fB36T2IKyV98Zp0Awazrb6E7bFMsScsRGZAeBTiRs-ovCcIR4Ut-AEdmX-7p9likehLFgvEsmhDrNItzK9zhPMn5_ffarHaPUX4SqKf8cJJN4fd6HabxglJ8SgtcD8pXEtXmZobgQNzxjXGAYo0F7QvsQ9yQvvBQQRsgX7TcYQunWZiW9f-i0fq_iX1kyRK4xJpFqWTg4ST4B1I1dc_aQ)', backgroundSize: 'cover' }}></div>
        <div className="max-w-5xl mx-auto relative">
          <motion.span 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            className="absolute -top-32 -left-32 text-[250px] font-black text-white leading-none z-0 select-none uppercase italic"
          >
            PRECISION
          </motion.span>
          <div className="relative z-10 space-y-16">
            <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-white uppercase italic">{manifestoTitle || 'The Structural Manifesto'}</h2>
            <div className="grid md:grid-cols-2 gap-16 text-on-surface-variant font-body leading-relaxed text-xl font-light">
              <p className="first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">{manifestoPara1 || description}</p>
              <p>{manifestoPara2 || description}</p>
            </div>
            <div className="pt-12 border-t border-outline-variant/20 flex flex-wrap gap-4">
              {(tags.length > 0 ? tags : ['Seismic Resilience', 'Engineering Design', 'Zero Error Policy']).map((tag, idx) => (
                <span key={idx} className="bg-surface-container-high px-6 py-3 text-[10px] font-black text-primary font-label uppercase tracking-[0.3em] border border-outline-variant/10">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
