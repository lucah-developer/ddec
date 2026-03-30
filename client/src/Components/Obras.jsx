import React, { useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Obras = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const companies = [
    {
      title: "Administración AFIP",
      category: "Público / Institucional",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASjhfj0jQQr1yiuhfY8dQg_qRnph_PS4zp6Y8wAXvE67s0VQbXUuHc0qva08q_r5ah1lm_V1Wm1-02PJQ6aPC0U-0tubBTbO155_TXac0C7OsEwP3MnJuLJ-ttyAHqJDKp-ZpJfDnkLLZzv8aAGGCuZP1H7hUV4eOq_1jmKp6W1lFxy9kp8xNezkYTBUYlolijfsgX1qkld8ZhzVrxk2Poe8UGZq5dcKn5fc98a-jGif8m8_x_-gmcDf7Rl7_AuwRcBjJ1gRquHw",
      link: "/afip",
    },
    {
      title: "Municipalidad SRL",
      category: "Desarrollo Urbano",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEPzgfLwF8C3Zsahla60Rmv0XK8vciys1aMVdS1K1v0iCU9qV05H13lvSAVG0PmjQ8CZP2lwNDA6xPe7SMy9qr0XQYRHwOwANW2DzekIBUriUDUqHeCOKSuVd_8bwGSIsG-znfkXA-cnt3Rq4DbU7Qe5zs8nu6ukRU-L3LqpZLNG8JFcmRphzMjzSL9NVK71K2vxSf5YvIn71gQulscVkF4BTujA2O944rb2j4bitjTVqs4yBr433fK_MqBsBMzdlX4pDYO9PNvg",
      link: "/muni",
    },
    {
      title: "IPV Mendoza",
      category: "Vivienda Social",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwWTgNOhg26IhITMLQCq4voq3rnch05bUtfehb0DGjzZnMmibqi4rLpK7o2Kbnra1cbGzDTbsUY2PPta_i7c0fXNVehK_-YPI4qUZlYe7yQx75-LByNNrOcgXCOpbbJ_1UIoIsIyOE_wrFw4Fp34jYeZZPmbDD1GH1wlFtV5CVUMybFz-ZnQS86cJpeJLjukI59Hs5AEVIc-pTmOWAff4OxwlPB5NtShCgkHVJo9Tfi3shNiHQ4zCNcDzEM86o8IU2AGOPA-VJEg",
      link: "/ipv",
    },
    {
      title: "Pampa Energía",
      category: "Sector Energético",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRbKT-aiX6JLqLOENSZxcRyJwodgnU0_X77r7HaGMHgbeFI6str7k_U56F1ObieafUsgQLHBsfucYv5wmkUvxsrAT43CZirnNJUKM1Qhj0QekvWqmqCiYagpXYqjsbn0b3DEML6GZhpLfwL4v0GNH75oyJv2C-sEY19rRjwaAW6vFgI6WGIhC2c2ffZqPpog9YY4huHYTOgeyoB_wYXZ30fbqqw6ymyws2kqP7DrOX9bu1rY6hegDh07DX7ZvXP0_c15SirAIBGw",
      link: "/pampaenergía",
    },
    {
      title: "Irrigación Prov.",
      category: "Infraestructura Hídrica",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVXlV_GbT0TbF9flhqPlsnDV_ycFP6w5966BlzL3ZG2qulkaeOj4a4oMyYkw2Ky2vDeCorqPf4JFVGGrYfRGFmkgBhuInMiPWzGaLDWEuVKcHDPYchgbcT8jfAzv97yP7qO0Rph3h6mNP0YHBY5tbcgPSp5MtK6jrzDT99y5RZW5Z5SO9WTBhYwZGtjl9O4CVv9hEoD4kiURL46vWnx3v8f4C2vICCwJaYVzxbRqfX9KCLCwBAHLbA8ZC4yBhmSEm-s6niEcjnHg",
      link: "/irrigación",
    },
    {
      title: "Inversión Privada",
      category: "Desarrollos de Autor",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZuWzNBSZ1IrIGhZiNE3XW6NFYBn08lhHHKO_mg4A5tzHbctI4zkhqU-uRB15_QK9a3IBnFw9EQaSFBcMmk7_cje-V3qC1AewaIybIbYpdXDatPE5ml3KscPHmsNSJ5zpEWzQ_GObd_Umy1BkeGhEw-lzUbRzzLackG-jfTwGOQW1JUxWJqeqPpZnptcCkvYRfCs0e57jvjNRzX6hNMXkkR3COAKq06tvMvQB1moupLb605MuqQQmFlVVVQQhKfQ8nECksBYRD9Q",
      link: "/proyectospriv",
    },
  ];

  return (
    <div className="relative group/carousel">
      {/* Navigation Buttons */}
      <div className="hidden md:flex absolute -left-6 -right-6 top-1/2 -translate-y-1/2 justify-between z-10 pointer-events-none">
        <button 
          onClick={scrollPrev}
          className="w-12 h-12 bg-surface-container-high/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary border border-outline-variant/20 shadow-2xl hover:bg-primary hover:text-on-primary transition-all pointer-events-auto active:scale-90"
        >
          <MdChevronLeft size={32} />
        </button>
        <button 
          onClick={scrollNext}
          className="w-12 h-12 bg-surface-container-high/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary border border-outline-variant/20 shadow-2xl hover:bg-primary hover:text-on-primary transition-all pointer-events-auto active:scale-90"
        >
          <MdChevronRight size={32} />
        </button>
      </div>

      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 px-1">
          {companies.map((project, index) => (
            <div 
              key={index} 
              className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0"
            >
              <a 
                href={project.link}
                className="group block bg-surface-container-highest overflow-hidden relative aspect-[4/5] shadow-xl border border-outline-variant/10 rounded-sm transition-all duration-300 hover:shadow-primary/10"
              >
                <img 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  src={project.image} 
                  alt={project.title}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Technical Label */}
                <div className="absolute top-4 left-4">
                  <div className="bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20">
                    PARTNER_SEC_0{index + 1}
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <p className="text-[10px] font-black text-primary mb-2 uppercase tracking-[0.3em] font-label">{project.category}</p>
                  <h3 className="text-2xl font-black text-white font-headline leading-tight tracking-tighter uppercase whitespace-pre-line truncate">{project.title}</h3>
                  
                  <div className="mt-4 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700"></div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile Hint */}
      <div className="mt-8 flex justify-center md:hidden">
        <div className="px-4 py-2 bg-surface-container-high/50 rounded-full flex gap-2">
           <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
           <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Deslice para explorar</span>
        </div>
      </div>
    </div>
  );
};

export default Obras;
