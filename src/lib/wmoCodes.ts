// ============================================================
// WMO Weather Interpretation Code mappings
// Used by Open-Meteo and compatible with WMO standard codes.
// Maps numeric weather codes to human-readable descriptions
// in English and Armenian, plus icon identifiers.
// ============================================================

export interface WeatherCondition {
  descriptionEn: string;
  descriptionHy: string;
  /** Lucide icon name */
  icon: string;
  /** Tailwind gradient classes for the weather card background */
  gradient: string;
}

const codeMap: Record<number, WeatherCondition> = {
  0: { descriptionEn: 'Clear sky', descriptionHy: 'Պարզ երկինք', icon: 'Sun', gradient: 'from-sky-400 to-blue-500' },
  1: { descriptionEn: 'Mainly clear', descriptionHy: 'Հիմնականում պարզ', icon: 'Sun', gradient: 'from-sky-400 to-blue-500' },
  2: { descriptionEn: 'Partly cloudy', descriptionHy: 'Մասամբ ամպամած', icon: 'CloudSun', gradient: 'from-sky-400 to-slate-500' },
  3: { descriptionEn: 'Overcast', descriptionHy: 'Ամպամած', icon: 'Cloud', gradient: 'from-slate-400 to-slate-600' },
  45: { descriptionEn: 'Fog', descriptionHy: 'Մառախուղ', icon: 'CloudFog', gradient: 'from-slate-400 to-slate-600' },
  48: { descriptionEn: 'Depositing rime fog', descriptionHy: 'Սառցակալած մառախուղ', icon: 'CloudFog', gradient: 'from-slate-400 to-slate-600' },
  51: { descriptionEn: 'Light drizzle', descriptionHy: 'Թույլ մաղր', icon: 'CloudDrizzle', gradient: 'from-slate-400 to-blue-600' },
  53: { descriptionEn: 'Moderate drizzle', descriptionHy: 'Միջին մաղր', icon: 'CloudDrizzle', gradient: 'from-slate-400 to-blue-600' },
  55: { descriptionEn: 'Dense drizzle', descriptionHy: 'Ուժեղ մաղր', icon: 'CloudDrizzle', gradient: 'from-slate-400 to-blue-600' },
  56: { descriptionEn: 'Light freezing drizzle', descriptionHy: 'Թույլ սառցակալած մաղր', icon: 'CloudDrizzle', gradient: 'from-slate-400 to-blue-600' },
  57: { descriptionEn: 'Dense freezing drizzle', descriptionHy: 'Ուժեղ սառցակալած մաղր', icon: 'CloudDrizzle', gradient: 'from-slate-400 to-blue-600' },
  61: { descriptionEn: 'Slight rain', descriptionHy: 'Թույլ անձրև', icon: 'CloudRain', gradient: 'from-slate-500 to-blue-700' },
  63: { descriptionEn: 'Moderate rain', descriptionHy: 'Միջին անձրև', icon: 'CloudRain', gradient: 'from-slate-500 to-blue-700' },
  65: { descriptionEn: 'Heavy rain', descriptionHy: 'Ուժեղ անձրև', icon: 'CloudRain', gradient: 'from-slate-600 to-blue-800' },
  66: { descriptionEn: 'Light freezing rain', descriptionHy: 'Թույլ սառցակալած անձրև', icon: 'CloudRain', gradient: 'from-slate-500 to-blue-700' },
  67: { descriptionEn: 'Heavy freezing rain', descriptionHy: 'Ուժեղ սառցակալած անձրև', icon: 'CloudRain', gradient: 'from-slate-600 to-blue-800' },
  71: { descriptionEn: 'Slight snow', descriptionHy: 'Թույլ ձյուն', icon: 'Snowflake', gradient: 'from-slate-300 to-slate-500' },
  73: { descriptionEn: 'Moderate snow', descriptionHy: 'Միջին ձյուն', icon: 'Snowflake', gradient: 'from-slate-300 to-slate-500' },
  75: { descriptionEn: 'Heavy snow', descriptionHy: 'Ուժեղ ձյուն', icon: 'Snowflake', gradient: 'from-slate-300 to-slate-600' },
  77: { descriptionEn: 'Snow grains', descriptionHy: 'Ձյան հատիկներ', icon: 'Snowflake', gradient: 'from-slate-300 to-slate-500' },
  80: { descriptionEn: 'Slight rain showers', descriptionHy: 'Թույլ անձրևային եղանակ', icon: 'CloudRain', gradient: 'from-slate-500 to-blue-700' },
  81: { descriptionEn: 'Moderate rain showers', descriptionHy: 'Միջին անձրևային եղանակ', icon: 'CloudRain', gradient: 'from-slate-500 to-blue-700' },
  82: { descriptionEn: 'Violent rain showers', descriptionHy: 'Ուժեղ անձրևային եղանակ', icon: 'CloudRain', gradient: 'from-slate-600 to-blue-800' },
  85: { descriptionEn: 'Slight snow showers', descriptionHy: 'Թույլ ձյան եղանակ', icon: 'Snowflake', gradient: 'from-slate-300 to-slate-500' },
  86: { descriptionEn: 'Heavy snow showers', descriptionHy: 'Ուժեղ ձյան եղանակ', icon: 'Snowflake', gradient: 'from-slate-300 to-slate-600' },
  95: { descriptionEn: 'Thunderstorm', descriptionHy: 'Ամպրոպ', icon: 'CloudLightning', gradient: 'from-slate-700 to-gray-900' },
  96: { descriptionEn: 'Thunderstorm with slight hail', descriptionHy: 'Ամպրոպ՝ թույլ կարկուտով', icon: 'CloudLightning', gradient: 'from-slate-700 to-gray-900' },
  99: { descriptionEn: 'Thunderstorm with heavy hail', descriptionHy: 'Ամպրոպ՝ ուժեղ կարկուտով', icon: 'CloudLightning', gradient: 'from-slate-800 to-gray-900' },
};

const defaultCondition: WeatherCondition = {
  descriptionEn: 'Unknown',
  descriptionHy: 'Անհայտ',
  icon: 'Cloud',
  gradient: 'from-slate-400 to-slate-600',
};

export function getWeatherCondition(code: number): WeatherCondition {
  return codeMap[code] ?? defaultCondition;
}

/** Map a source-specific condition string to a WMO-like code for icon lookup */
export function conditionStringToCode(condition: string): number {
  const c = condition.toLowerCase().trim();
  if (c === 'clear' || c === 'clear sky' || c === 'sunny') return 0;
  if (c === 'mainly clear' || c === 'mostly clear') return 1;
  if (c === 'partly cloudy' || c === 'partially cloudy') return 2;
  if (c === 'cloudy' || c === 'overcast') return 3;
  if (c.includes('fog') || c.includes('mist')) return 45;
  if (c.includes('drizzle')) return 53;
  if (c.includes('thunder') || c.includes('storm')) return 95;
  if (c.includes('snow')) return 73;
  if (c.includes('heavy rain')) return 65;
  if (c.includes('rain') || c.includes('shower')) return 63;
  return 2;
}
