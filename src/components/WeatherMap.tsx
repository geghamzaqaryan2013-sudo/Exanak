import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { Settlement, AggregatedWeather } from '@/types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface WeatherMapProps {
  settlement: Settlement;
  weather: AggregatedWeather | null;
}

export function WeatherMap({ settlement, weather }: WeatherMapProps) {
  const { t, language } = useLanguage();
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [settlement.lat, settlement.lon],
      zoom: 10,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update map center and marker when settlement changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.setView([settlement.lat, settlement.lon], 10);

    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    const name = language === 'hy' ? settlement.nameHy : settlement.nameEn;
    const temp = weather?.finalTemperature !== null && weather?.finalTemperature !== undefined
      ? `${weather.finalTemperature > 0 ? '+' : ''}${Math.round(weather.finalTemperature)}°C`
      : '—';
    const condition = weather?.finalCondition ?? '—';
    const wind = weather?.finalWindSpeed !== null && weather?.finalWindSpeed !== undefined
      ? `${Math.round(weather.finalWindSpeed)} ${t.kmh}`
      : '—';

    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="width:28px;height:28px;background:#0ea5e9;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-size:14px;">📍</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const marker = L.marker([settlement.lat, settlement.lon], { icon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family:system-ui;padding:4px;">
        <strong style="font-size:14px;">${name}</strong><br/>
        <span style="font-size:20px;font-weight:bold;">${temp}</span><br/>
        <span style="color:#666;">${condition}</span><br/>
        <span style="color:#666;">${t.windSpeed}: ${wind}</span>
      </div>
    `);

    markerRef.current = marker;
  }, [settlement, weather, language, t]);

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-1 backdrop-blur-sm">
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-white">{t.interactiveMap}</h3>
        <p className="text-xs text-slate-400">
          {t.selectedLocation}: {language === 'hy' ? settlement.nameHy : settlement.nameEn}
        </p>
      </div>
      <div
        ref={containerRef}
        className="h-72 w-full overflow-hidden rounded-xl sm:h-80"
        style={{ zIndex: 0 }}
      />
    </div>
  );
}
