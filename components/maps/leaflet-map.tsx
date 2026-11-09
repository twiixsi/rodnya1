'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Institution } from '@/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink, Layers, Navigation, ZoomIn, ZoomOut } from 'lucide-react';

interface LeafletMapProps {
  institutions: Institution[];
  selectedInstitution: Institution | null;
  onSelectInstitution: (institution: Institution) => void;
  center?: [number, number];
  zoom?: number;
}

export default function LeafletMap({
  institutions,
  selectedInstitution,
  onSelectInstitution,
  center = [53.8965, 27.6080], // Minsk center near Peredovaya street
  zoom = 13
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: false, // We render custom pixel-perfect zoom buttons matching infrastr.jpg
        attributionControl: false,
      });

      // Subtle attribution
      L.control.attribution({
        prefix: 'Реальная картография Республики Беларусь • OpenStreetMap & Яндекс',
        position: 'bottomright'
      }).addTo(map);

      // 100% бесплатный и надежный тайловый слой OpenStreetMap без водяных знаков и без требований API-ключей
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount if needed
    };
  }, []);

  // Update markers whenever institutions or selectedInstitution changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    institutions.forEach((inst) => {
      const isSelected = selectedInstitution?.id === inst.id;

      // Pin colors matching infrastr.jpg:
      // Kindergartens: Coral Red (#D44A3A)
      // Medical / Polyclinics: Deep Teal Green (#1F6E54)
      // Development, Clubs, Shops, One-window: Slate Blue (#2A67B1)
      let pinColor = '#2A67B1'; // Default blue
      if (inst.type === 'kindergarten') {
        pinColor = '#D44A3A'; // Coral-red
      } else if (inst.type === 'polyclinic') {
        pinColor = '#1F6E54'; // Dark green/teal
      } else if (inst.type === 'development_center' || inst.type === 'hobby_club') {
        pinColor = '#2A67B1'; // Blue
      } else if (inst.type === 'one_window') {
        pinColor = '#5B4282'; // Royal purple
      } else if (inst.type === 'maternity_store' || inst.type === 'leisure_food') {
        pinColor = '#B8622B'; // Warm amber
      }

      const pinSize = isSelected ? 42 : 32;
      const dotSize = isSelected ? 12 : 9;

      const customIcon = L.divIcon({
        className: 'custom-real-pin',
        html: `
          <div style="
            position: relative;
            width: ${pinSize}px;
            height: ${pinSize}px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.25s ease-out;
            cursor: pointer;
          ">
            ${isSelected ? `
              <div style="
                position: absolute;
                inset: -6px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                background-color: ${pinColor}33;
                animation: pulse 1.5s infinite;
              "></div>
            ` : ''}
            <div style="
              background-color: ${pinColor};
              width: ${pinSize}px;
              height: ${pinSize}px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              border: ${isSelected ? '3px' : '2px'} solid #FFFFFF;
              box-shadow: 0 4px 12px rgba(0,0,0,0.28);
            ">
              <div style="
                width: ${dotSize}px;
                height: ${dotSize}px;
                border-radius: 50%;
                background-color: #FFFFFF;
                transform: rotate(45deg);
              "></div>
            </div>
          </div>
        `,
        iconSize: [pinSize, pinSize],
        iconAnchor: [pinSize / 2, pinSize],
        popupAnchor: [0, -pinSize],
      });

      const marker = L.marker(inst.coordinates, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        onSelectInstitution(inst);
      });

      marker.bindTooltip(
        `<div style="font-family: inherit; font-size: 12px; font-weight: 700; color: #1E3029; padding: 2px 4px;">
           ${inst.name}
           <div style="font-size: 10px; font-weight: 500; color: #556862; margin-top: 2px;">${inst.address}</div>
           ${inst.free_spots ? `<div style="color: #208253; font-size: 10px; font-weight: 700; margin-top: 2px;">Свободно: ${inst.free_spots} мест</div>` : ''}
           ${inst.has_online_admin ? `<div style="color: #2563eb; font-size: 10px; font-weight: 700; margin-top: 2px;">✓ Администратор на связи на сайте</div>` : ''}
         </div>`,
        {
          direction: 'top',
          offset: [0, -pinSize + 4],
          className: 'leaflet-custom-tooltip'
        }
      );

      markersRef.current[inst.id] = marker;
    });
  }, [institutions, selectedInstitution, onSelectInstitution]);

  // Smooth fly-to when selected institution changes
  useEffect(() => {
    if (selectedInstitution && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedInstitution.coordinates, 15, {
        duration: 1.0,
      });

      const marker = markersRef.current[selectedInstitution.id];
      if (marker) {
        marker.openTooltip();
      }
    }
  }, [selectedInstitution]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetCenter = () => {
    if (selectedInstitution) {
      mapInstanceRef.current?.flyTo(selectedInstitution.coordinates, 15);
    } else {
      mapInstanceRef.current?.flyTo(center, zoom);
    }
  };

  const currentLat = selectedInstitution ? selectedInstitution.coordinates[0] : center[0];
  const currentLng = selectedInstitution ? selectedInstitution.coordinates[1] : center[1];

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[580px] rounded-3xl overflow-hidden border border-[#EDE2D5] shadow-xs">
      {/* Real Map Canvas */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full z-10" 
      />

      {/* Top-Left Custom Zoom Controls matching infrastr.jpg (+ / -) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col bg-white rounded-xl shadow-md border border-[#E8DDD1] overflow-hidden select-none">
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 flex items-center justify-center text-[#283D38] hover:bg-[#F8F1E8] active:bg-[#EDE2D4] transition-colors border-b border-[#E8DDD1]"
          title="Приблизить карту"
        >
          <span className="text-xl font-bold leading-none">+</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 flex items-center justify-center text-[#283D38] hover:bg-[#F8F1E8] active:bg-[#EDE2D4] transition-colors"
          title="Отдалить карту"
        >
          <span className="text-xl font-bold leading-none">−</span>
        </button>
      </div>

      {/* Bottom Bar: Quick links to real Yandex Maps and Google Maps */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <a
            href={`https://yandex.by/maps/?pt=${currentLng},${currentLat}&z=16&l=map`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-[#283D38] text-[11px] font-bold shadow-md border border-[#E8DDD1] flex items-center gap-1.5 backdrop-blur-xs transition-all hover:scale-[1.02]"
            title="Открыть этот район в реальных Яндекс Картах"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
            <span>Яндекс Карты</span>
            <ExternalLink className="w-3 h-3 text-[#6B7C77]" />
          </a>

          <a
            href={`https://www.google.com/maps?q=${currentLat},${currentLng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-[#283D38] text-[11px] font-bold shadow-md border border-[#E8DDD1] flex items-center gap-1.5 backdrop-blur-xs transition-all hover:scale-[1.02]"
            title="Открыть этот район в реальных Google Maps"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
            <span>Google Карты</span>
            <ExternalLink className="w-3 h-3 text-[#6B7C77]" />
          </a>
        </div>

        <button
          onClick={handleResetCenter}
          className="pointer-events-auto px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-[#283D38] text-[11px] font-semibold shadow-md border border-[#E8DDD1] flex items-center gap-1 backdrop-blur-xs transition-all"
          title="Сфокусировать на выбранном объекте"
        >
          <Navigation className="w-3 h-3 text-[#34785D]" />
          <span>Центрировать</span>
        </button>
      </div>
    </div>
  );
}
