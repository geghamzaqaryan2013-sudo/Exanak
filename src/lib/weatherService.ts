import type { AggregatedWeather, WeatherSourceResult } from '@/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback: client-side direct fetch from Open-Meteo when Edge Function is unavailable
async function fetchDirectFromOpenMeteo(lat: number, lon: number): Promise<AggregatedWeather> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation,visibility,uv_index&daily=sunrise,sunset&timezone=Asia/Yerevan&forecast_days=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  const c = data.current;

  const conditionCode = c.weather_code;
  const conditionMap: Record<number, string> = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing rime fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
    80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
  };

  const source: WeatherSourceResult = {
    sourceId: 'open_meteo_fallback',
    sourceName: 'Open-Meteo (Fallback)',
    sourceUrl: 'https://open-meteo.com/',
    temperature: c.temperature_2m,
    feelsLike: c.apparent_temperature,
    condition: String(conditionCode),
    conditionDescription: conditionMap[conditionCode] ?? 'Unknown',
    windSpeed: c.wind_speed_10m,
    windDirection: c.wind_direction_10m,
    humidity: c.relative_humidity_2m,
    pressure: c.surface_pressure,
    visibility: c.visibility ?? null,
    precipitation: c.precipitation,
    uvIndex: c.uv_index ?? null,
    included: true,
    available: true,
    fetchedAt: new Date().toISOString(),
    sourceUpdate: c.time,
    dataType: 'grid',
  };

  const confidence = 50;

  return {
    finalTemperature: c.temperature_2m,
    finalFeelsLike: c.apparent_temperature,
    finalCondition: conditionMap[conditionCode] ?? 'Unknown',
    finalWindSpeed: c.wind_speed_10m,
    finalWindDirection: c.wind_direction_10m,
    finalHumidity: c.relative_humidity_2m,
    finalPressure: c.surface_pressure,
    finalVisibility: c.visibility ?? null,
    finalPrecipitation: c.precipitation,
    finalUvIndex: c.uv_index ?? null,
    sunrise: data.daily?.sunrise?.[0] ?? null,
    sunset: data.daily?.sunset?.[0] ?? null,
    confidence,
    confidenceLevel: 'medium',
    sourceCount: 1,
    includedCount: 1,
    outlierCount: 0,
    hasConflict: false,
    explanation: 'Weather data fetched from a single source (fallback mode). The multi-source aggregation service was unavailable. Data may be less reliable.',
    confidenceExplanation: 'Only 1 source available (fallback mode). Confidence is limited.',
    sources: [source],
    computedAt: new Date().toISOString(),
    usingNearestData: false,
  };
}

export async function fetchWeather(lat: number, lon: number, settlementName: string): Promise<AggregatedWeather> {
  // Try Edge Function first
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const url = `${SUPABASE_URL}/functions/v1/armenia-weather?lat=${lat}&lon=${lon}`;
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && !data.error) {
          return data as AggregatedWeather;
        }
      }
    } catch {
      // Fall through to direct fetch
    }
  }

  // Fallback: direct client-side fetch
  return fetchDirectFromOpenMeteo(lat, lon);
}
