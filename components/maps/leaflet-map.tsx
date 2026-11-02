'use client';

import React, { useEffect, useRef } from 'react';
import { Institution } from '@/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  center = [53.9015, 27.5622], // Minsk default
  zoom = 12
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map if not already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: true,
      });

      // OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add markers for institutions
    institutions.forEach((inst) => {
      // Custom colored SVG pin
      let pinColor = '#34785D'; // Green default
      if (inst.type === 'kindergarten') pinColor = '#34785D';
      if (inst.type === 'polyclinic') pinColor = '#2F6D9E';
      if (inst.type === 'crisis_center') pinColor = '#E58A7D';
      if (inst.type === 'family_center') pinColor = '#7A5BA3';

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background-color: ${pinColor};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #FFFFFF;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
            cursor: pointer;
          ">
            <div style="
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #FFFFFF;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker(inst.coordinates, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        onSelectInstitution(inst);
      });

      marker.bindTooltip(`<b>${inst.name}</b><br/><span style="color:#666;font-size:11px;">${inst.address}</span>`, {
        direction: 'top',
        offset: [0, -30],
      });

      markersRef.current[inst.id] = marker;
    });

  }, [institutions]);

  // Pan to selected institution
  useEffect(() => {
    if (selectedInstitution && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedInstitution.coordinates, 15, {
        duration: 1.2,
      });

      const marker = markersRef.current[selectedInstitution.id];
      if (marker) {
        marker.openTooltip();
      }
    }
  }, [selectedInstitution]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full min-h-[420px] rounded-3xl z-10 overflow-hidden shadow-inner border border-[#E9DACB]" 
    />
  );
}
