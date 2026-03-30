import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * Visor3D - Mapbox GL JS Implementation
 * Using Mapbox Standard style with dynamic 3D buildings and lighting.
 */
const Visor3D = ({ lat, lng, height = "500px" }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState(true);

  // Set Mapbox Access Token
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_TOKEN';

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!lat || !lng) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/standard', // Mapbox Standard Style (Modern, 3D, High Quality)
      center: [lng, lat],
      zoom: 17,
      pitch: 60, // Pitch at 60 as requested
      bearing: -20, // Initial bearing to get structural perspective
      antialias: true
    });

    map.current.on('style.load', () => {
      // Configure 3D objects and lighting for Mapbox Standard
      map.current.setConfigProperty('basemap', 'show3dObjects', true);
      map.current.setConfigProperty('basemap', 'lightPreset', 'dusk'); // Set premium lighting
      setLoading(false);
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lat, lng]);

  if (!lat || !lng) return null;

  return (
    <div style={{ height }} className="w-full relative bg-surface-container-lowest overflow-hidden rounded-lg group border border-outline-variant/10 shadow-2xl">
      {/* Map Content */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-container text-primary font-black uppercase tracking-widest text-xs z-20">
          Iniciando Núcleo de Mapas 3D...
        </div>
      )}

      {/* Vista Inmersiva Badge */}
      <div className="absolute top-8 right-8 z-10 pointer-events-none">
        <div className="px-4 py-2 bg-black/60 backdrop-blur-md border border-primary/40 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Vista Inmersiva 3D</span>
        </div>
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em] bg-black/40 px-3 py-1 backdrop-blur-sm">Use Mouse para Rotar Orbitariamente</p>
      </div>

      {/* CSS Override for Mapbox Logo Removal if desired - keeping it for terms of service but making it subtle */}
      <style>
        {`
        .mapboxgl-ctrl-bottom-right, .mapboxgl-ctrl-bottom-left {
          opacity: 0.1;
          transition: opacity 0.3s;
        }
        .mapboxgl-ctrl-bottom-right:hover, .mapboxgl-ctrl-bottom-left:hover {
          opacity: 0.8;
        }
        .mapboxgl-canvas { outline: none; }
        `}
      </style>
    </div>
  );
};

export default Visor3D;
