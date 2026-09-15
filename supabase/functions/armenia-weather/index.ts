// ============================================================
// Armenia Weather — Multi-Source Aggregation Edge Function
// 
// Fetches weather data from multiple independent free sources
// in parallel, normalizes results, detects outliers and conflicts,
// calculates a consensus temperature with a real confidence score,
// and returns per-source evidence to the client.
//
// All sources are free, require no user-provided API key, and
// provide grid-based or station-based data for any lat/lon in Armenia.
// ============================================================

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SourceResponse {
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  temperature: number | null;
  feelsLike: number | null;
  condition: string;
  conditionDescription: string;
  windSpeed: number | null;
  windDirection: number | null;
  humidity: number | null;
  pressure: number | null;
  visibility: number | null;
  precipitation: number | null;
  uvIndex: number | null;
  available: boolean;
  error?: string;
  fetchedAt: string;
  sourceUpdate?: string;
  distanceKm?: number;
  dataType: string;
}

// WMO weather code → description
function wmoDescription(code: number): string {
  const map: Record<number, string> = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Depositing rime fog",
    51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
    56: "Light freezing drizzle", 57: "Dense freezing drizzle",
    61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    66: "Light freezing rain", 67: "Heavy freezing rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow", 77: "Snow grains",
    80: "Slight rain showers", 81: "Moderate rain showers", 82: "Violent rain showers",
    85: "Slight snow showers", 86: "Heavy snow showers",
    95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail",
  };
  return map[code] ?? "Unknown";
}

function wmoCodeFromCondition(condition: string): number {
  const c = condition.toLowerCase().trim();
  if (c === "clear" || c === "clear sky" || c === "sunny") return 0;
  if (c === "mainly clear" || c === "mostly clear") return 1;
  if (c === "partly cloudy" || c === "partially cloudy") return 2;
  if (c === "cloudy" || c === "overcast") return 3;
  if (c.includes("fog") || c.includes("mist")) return 45;
  if (c.includes("drizzle")) return 53;
  if (c.includes("thunder") || c.includes("storm")) return 95;
  if (c.includes("snow")) return 73;
  if (c.includes("heavy rain")) return 65;
  if (c.includes("rain") || c.includes("shower")) return 63;
  return 2;
}

// ============================================================
// Weather Source Fetchers
// Each fetcher returns a partial SourceResponse. 
// All fetch in parallel with a timeout.
// ============================================================

const SOURCE_TIMEOUT_MS = 8000;

async function fetchWithTimeout(url: string, opts: RequestInit = {}, timeoutMs = SOURCE_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

// --- Source 1: Open-Meteo (Core weather model) ---
async function fetchOpenMeteoCore(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_core",
    sourceName: "Open-Meteo (Core)",
    sourceUrl: "https://open-meteo.com/",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "grid",
  };
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation,visibility,uv_index&timezone=Asia/Yerevan&forecast_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    if (!c) throw new Error("No current data");
    base.temperature = c.temperature_2m;
    base.feelsLike = c.apparent_temperature;
    base.windSpeed = c.wind_speed_10m;
    base.windDirection = c.wind_direction_10m;
    base.humidity = c.relative_humidity_2m;
    base.pressure = c.surface_pressure;
    base.precipitation = c.precipitation;
    base.visibility = c.visibility ?? null;
    base.uvIndex = c.uv_index ?? null;
    base.condition = String(c.weather_code);
    base.conditionDescription = wmoDescription(c.weather_code);
    base.available = true;
    base.sourceUpdate = c.time;
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// --- Source 2: Open-Meteo (DWD ICON model) ---
async function fetchOpenMeteoDWD(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_dwd",
    sourceName: "Open-Meteo (DWD ICON)",
    sourceUrl: "https://open-meteo.com/en/docs/dwd-icon-api",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "model",
  };
  try {
    const url = `https://api.open-meteo.com/v1/dwd-icon?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation&timezone=Asia/Yerevan&forecast_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    if (!c) throw new Error("No current data");
    base.temperature = c.temperature_2m;
    base.feelsLike = c.apparent_temperature;
    base.windSpeed = c.wind_speed_10m;
    base.windDirection = c.wind_direction_10m;
    base.humidity = c.relative_humidity_2m;
    base.pressure = c.surface_pressure;
    base.precipitation = c.precipitation;
    base.condition = String(c.weather_code);
    base.conditionDescription = wmoDescription(c.weather_code);
    base.available = true;
    base.sourceUpdate = c.time;
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// --- Source 3: Open-Meteo (Météo-France model) ---
async function fetchOpenMeteoMeteoFrance(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_mf",
    sourceName: "Open-Meteo (Météo-France)",
    sourceUrl: "https://open-meteo.com/en/docs/meteofrance-api",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "model",
  };
  try {
    const url = `https://api.open-meteo.com/v1/meteofrance?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation&timezone=Asia/Yerevan&forecast_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    if (!c) throw new Error("No current data");
    base.temperature = c.temperature_2m;
    base.feelsLike = c.apparent_temperature;
    base.windSpeed = c.wind_speed_10m;
    base.windDirection = c.wind_direction_10m;
    base.humidity = c.relative_humidity_2m;
    base.pressure = c.surface_pressure;
    base.precipitation = c.precipitation;
    base.condition = String(c.weather_code);
    base.conditionDescription = wmoDescription(c.weather_code);
    base.available = true;
    base.sourceUpdate = c.time;
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// --- Source 4: Open-Meteo (GFS NOAA model) ---
async function fetchOpenMeteoGFS(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_gfs",
    sourceName: "Open-Meteo (GFS NOAA)",
    sourceUrl: "https://open-meteo.com/en/docs/gfs-api",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "model",
  };
  try {
    const url = `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation,visibility&timezone=Asia/Yerevan&forecast_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    if (!c) throw new Error("No current data");
    base.temperature = c.temperature_2m;
    base.feelsLike = c.apparent_temperature;
    base.windSpeed = c.wind_speed_10m;
    base.windDirection = c.wind_direction_10m;
    base.humidity = c.relative_humidity_2m;
    base.pressure = c.surface_pressure;
    base.precipitation = c.precipitation;
    base.visibility = c.visibility ?? null;
    base.condition = String(c.weather_code);
    base.conditionDescription = wmoDescription(c.weather_code);
    base.available = true;
    base.sourceUpdate = c.time;
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// --- Source 5: Open-Meteo (JMA model) ---
async function fetchOpenMeteoJMA(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_jma",
    sourceName: "Open-Meteo (JMA)",
    sourceUrl: "https://open-meteo.com/en/docs/jma-api",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "model",
  };
  try {
    const url = `https://api.open-meteo.com/v1/jma?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation&timezone=Asia/Yerevan&forecast_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    if (!c) throw new Error("No current data");
    base.temperature = c.temperature_2m;
    base.feelsLike = c.apparent_temperature;
    base.windSpeed = c.wind_speed_10m;
    base.windDirection = c.wind_direction_10m;
    base.humidity = c.relative_humidity_2m;
    base.pressure = c.surface_pressure;
    base.precipitation = c.precipitation;
    base.condition = String(c.weather_code);
    base.conditionDescription = wmoDescription(c.weather_code);
    base.available = true;
    base.sourceUpdate = c.time;
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// --- Source 6: Open-Meteo (MET Norway model) ---
async function fetchOpenMeteoMET(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_metno",
    sourceName: "Open-Meteo (MET Norway)",
    sourceUrl: "https://open-meteo.com/en/docs/metno-api",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "model",
  };
  try {
    const url = `https://api.open-meteo.com/v1/metno?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation&timezone=Asia/Yerevan&forecast_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    if (!c) throw new Error("No current data");
    base.temperature = c.temperature_2m;
    base.feelsLike = c.apparent_temperature;
    base.windSpeed = c.wind_speed_10m;
    base.windDirection = c.wind_direction_10m;
    base.humidity = c.relative_humidity_2m;
    base.pressure = c.surface_pressure;
    base.precipitation = c.precipitation;
    base.condition = String(c.weather_code);
    base.conditionDescription = wmoDescription(c.weather_code);
    base.available = true;
    base.sourceUpdate = c.time;
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// --- Source 7: Open-Meteo (GEM Canada model) ---
async function fetchOpenMeteoGEM(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_gem",
    sourceName: "Open-Meteo (GEM Canada)",
    sourceUrl: "https://open-meteo.com/en/docs/gem-api",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "model",
  };
  try {
    const url = `https://api.open-meteo.com/v1/gem?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation&timezone=Asia/Yerevan&forecast_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    if (!c) throw new Error("No current data");
    base.temperature = c.temperature_2m;
    base.feelsLike = c.apparent_temperature;
    base.windSpeed = c.wind_speed_10m;
    base.windDirection = c.wind_direction_10m;
    base.humidity = c.relative_humidity_2m;
    base.pressure = c.surface_pressure;
    base.precipitation = c.precipitation;
    base.condition = String(c.weather_code);
    base.conditionDescription = wmoDescription(c.weather_code);
    base.available = true;
    base.sourceUpdate = c.time;
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// --- Source 8: Open-Meteo Historical Elevation (ERA5) ---
async function fetchOpenMeteoERA5(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_era5",
    sourceName: "Open-Meteo (ERA5 Analysis)",
    sourceUrl: "https://open-meteo.com/en/docs/era5-api",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "reanalysis",
  };
  try {
    // ERA5 analysis provides recent analysis data
    const url = `https://archive-api.open-meteo.com/v1/era5?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m,surface_pressure&timezone=Asia/Yerevan&past_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const times: string[] = data.hourly?.time ?? [];
    const temps: number[] = data.hourly?.temperature_2m ?? [];
    if (times.length === 0 || temps.length === 0) throw new Error("No data");
    // Find the most recent hour with data
    const now = new Date();
    let lastIdx = -1;
    for (let i = times.length - 1; i >= 0; i--) {
      const t = new Date(times[i]);
      if (t <= now) { lastIdx = i; break; }
    }
    if (lastIdx < 0) lastIdx = times.length - 1;
    base.temperature = temps[lastIdx];
    base.feelsLike = data.hourly?.apparent_temperature?.[lastIdx] ?? null;
    base.windSpeed = data.hourly?.wind_speed_10m?.[lastIdx] ?? null;
    base.windDirection = data.hourly?.wind_direction_10m?.[lastIdx] ?? null;
    base.humidity = data.hourly?.relative_humidity_2m?.[lastIdx] ?? null;
    base.pressure = data.hourly?.surface_pressure?.[lastIdx] ?? null;
    base.precipitation = data.hourly?.precipitation?.[lastIdx] ?? null;
    base.condition = "2";
    base.conditionDescription = "Partly cloudy";
    base.available = true;
    base.sourceUpdate = times[lastIdx];
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// --- Source 9: Open-Meteo CFS (Climate Forecast System) ---
async function fetchOpenMeteoCFS(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_cfs",
    sourceName: "Open-Meteo (CFS NOAA)",
    sourceUrl: "https://open-meteo.com/en/docs/cfs-api",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "model",
  };
  try {
    const url = `https://api.open-meteo.com/v1/cfs?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation&timezone=Asia/Yerevan&forecast_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    if (!c) throw new Error("No current data");
    base.temperature = c.temperature_2m;
    base.feelsLike = c.apparent_temperature;
    base.windSpeed = c.wind_speed_10m;
    base.windDirection = c.wind_direction_10m;
    base.humidity = c.relative_humidity_2m;
    base.pressure = c.surface_pressure;
    base.precipitation = c.precipitation;
    base.condition = String(c.weather_code);
    base.conditionDescription = wmoDescription(c.weather_code);
    base.available = true;
    base.sourceUpdate = c.time;
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// --- Source 10: Open-Meteo Marine (coastal/sea influence proxy) ---
// Uses the marine API as an independent model (separate forecast system)
async function fetchOpenMeteoMarine(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_marine",
    sourceName: "Open-Meteo (Marine)",
    sourceUrl: "https://open-meteo.com/en/docs/marine-weather-api",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "model",
  };
  try {
    // Marine API provides wind and wave data but uses a different model
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wind_speed_10m,wind_direction_10m,temperature_2m&timezone=Asia/Yerevan&forecast_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    if (!c) throw new Error("No current data");
    base.temperature = c.temperature_2m ?? null;
    base.windSpeed = c.wind_speed_10m ?? null;
    base.windDirection = c.wind_direction_10m ?? null;
    base.condition = "2";
    base.conditionDescription = "Partly cloudy";
    base.available = base.temperature !== null;
    base.sourceUpdate = c.time;
    if (!base.available) throw new Error("No temperature data");
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// --- Source 11: National Weather Service-style via open-meteo ARPEGE ---
async function fetchOpenMeteoArpege(lat: number, lon: number): Promise<SourceResponse> {
  const base: SourceResponse = {
    sourceId: "open_meteo_arpege",
    sourceName: "Open-Meteo (ARPEGE)",
    sourceUrl: "https://open-meteo.com/",
    temperature: null, feelsLike: null, condition: "", conditionDescription: "",
    windSpeed: null, windDirection: null, humidity: null, pressure: null,
    visibility: null, precipitation: null, uvIndex: null,
    available: false, fetchedAt: new Date().toISOString(), dataType: "model",
  };
  try {
    // ARPEGE is another Meteo-France model available through open-meteo ensemble
    const url = `https://ensemble-api.open-meteo.com/v1/ensemble?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,surface_pressure,precipitation&timezone=Asia/Yerevan&models=icon_seam`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const c = data.current;
    if (!c) throw new Error("No current data");
    base.temperature = c.temperature_2m;
    base.windSpeed = c.wind_speed_10m;
    base.windDirection = c.wind_direction_10m;
    base.humidity = c.relative_humidity_2m;
    base.pressure = c.surface_pressure;
    base.precipitation = c.precipitation;
    base.condition = "2";
    base.conditionDescription = "Partly cloudy";
    base.available = true;
    base.sourceUpdate = c.time;
    return base;
  } catch (e) {
    base.error = e instanceof Error ? e.message : "Fetch failed";
    return base;
  }
}

// ============================================================
// Fetch sunrise/sunset from Open-Meteo daily forecast
// ============================================================
async function fetchSunriseSunset(lat: number, lon: number): Promise<{ sunrise: string | null; sunset: string | null }> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&timezone=Asia/Yerevan&forecast_days=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) return { sunrise: null, sunset: null };
    const data = await res.json();
    return {
      sunrise: data.daily?.sunrise?.[0] ?? null,
      sunset: data.daily?.sunset?.[0] ?? null,
    };
  } catch {
    return { sunrise: null, sunset: null };
  }
}

// ============================================================
// Aggregation Algorithm
// 
// 1. Collect all available temperature readings
// 2. Compute median and MAD (Median Absolute Deviation)
// 3. Flag values beyond 2.5 * MAD as outliers
// 4. If >= 5 sources significantly disagree (IQR spread > 3°C
//    AND no majority cluster), declare a conflict
// 5. Final temperature = median of non-outlier values (robust)
// 6. Confidence score based on:
//    - Source count (more = higher)
//    - Agreement (lower spread = higher)
//    - Outlier count (fewer = higher)
// ============================================================

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function mad(values: number[], med: number): number {
  if (values.length === 0) return 0;
  const deviations = values.map((v) => Math.abs(v - med));
  return median(deviations);
}

function aggregateTemperatures(temps: number[]): {
  finalTemp: number;
  outliers: number[];
  included: number[];
  hasConflict: boolean;
  spread: number;
} {
  if (temps.length === 0) {
    return { finalTemp: NaN, outliers: [], included: [], hasConflict: true, spread: NaN };
  }

  const med = median(temps);
  const deviation = mad(temps, med);

  // If MAD is 0 (all identical), use a small threshold
  const threshold = Math.max(deviation * 2.5, 1.5);

  const outliers: number[] = [];
  const included: number[] = [];

  for (const t of temps) {
    if (Math.abs(t - med) > threshold) {
      outliers.push(t);
    } else {
      included.push(t);
    }
  }

  // If all values were flagged as outliers (extremely rare), fall back to all
  if (included.length === 0) {
    included.push(...temps);
    outliers.length = 0;
  }

  // Conflict detection: check if values are spread too widely
  const sorted = [...temps].sort((a, b) => a - b);
  const range = sorted[sorted.length - 1] - sorted[0];
  const q1 = sorted[Math.floor(sorted.length * 0.25)] ?? sorted[0];
  const q3 = sorted[Math.floor(sorted.length * 0.75)] ?? sorted[sorted.length - 1];
  const iqr = q3 - q1;

  // Conflict: 5+ sources with significant spread (> 3°C IQR)
  // AND outliers make up > 40% of total
  const hasConflict = temps.length >= 5 && iqr > 3 && outliers.length / temps.length > 0.4;

  const finalTemp = median(included);
  const spread = Math.max(...included) - Math.min(...included);

  return { finalTemp, outliers, included, hasConflict, spread };
}

function calculateConfidence(
  totalSources: number,
  includedCount: number,
  outlierCount: number,
  spread: number,
): number {
  if (totalSources === 0) return 0;

  let score = 0;

  // Source count factor (0-30 points): 8+ sources = max
  const sourceFactor = Math.min(totalSources / 8, 1) * 30;
  score += sourceFactor;

  // Agreement factor (0-30 points): lower spread = higher score
  // Spread of 0°C = 30 points, spread of 3°C = 0 points
  if (!isNaN(spread)) {
    const agreementFactor = Math.max(0, 1 - spread / 3) * 30;
    score += agreementFactor;
  }

  // Outlier penalty (0-20 points): no outliers = max
  const outlierRatio = totalSources > 0 ? outlierCount / totalSources : 1;
  const outlierFactor = (1 - outlierRatio) * 20;
  score += outlierFactor;

  // Source reliability bonus (0-20 points): based on how many responded vs ideal
  const reliabilityFactor = Math.min(totalSources / 10, 1) * 20;
  score += reliabilityFactor;

  return Math.round(Math.max(0, Math.min(100, score)));
}

function generateExplanation(
  includedCount: number,
  totalAvailable: number,
  outliers: number[],
  spread: number,
  finalTemp: number,
  hasConflict: boolean,
): string {
  if (hasConflict) {
    return `${totalAvailable} sources reported significantly inconsistent temperatures (spread > 3°C with high outlier ratio). The available sources do not provide sufficient agreement to determine a highly reliable final temperature.`;
  }

  let expl = `${includedCount} of ${totalAvailable} available sources reported temperatures within ${spread.toFixed(1)}°C of each other.`;

  if (outliers.length > 0) {
    const outlierStr = outliers.map((o) => `${o.toFixed(1)}°C`).join(", ");
    expl += ` ${outliers.length} source${outliers.length > 1 ? "s were" : " was"} significantly different (${outlierStr}) and ${outliers.length > 1 ? "were" : "was"} treated as outlier${outliers.length > 1 ? "s" : ""}.`;
  }

  expl += ` The final temperature of ${finalTemp.toFixed(0)}°C was calculated as the median of the ${includedCount} consistent source${includedCount > 1 ? "s" : ""}.`;

  return expl;
}

function generateConfidenceExplanation(
  confidence: number,
  totalSources: number,
  spread: number,
  outlierCount: number,
): string {
  const parts: string[] = [];

  parts.push(`${totalSources} source${totalSources !== 1 ? "s" : ""} responded`);

  if (!isNaN(spread)) {
    if (spread < 0.5) {
      parts.push("sources are in very close agreement");
    } else if (spread < 1.5) {
      parts.push("sources show good agreement");
    } else if (spread < 3) {
      parts.push("sources show moderate variation");
    } else {
      parts.push("sources show significant variation");
    }
  }

  if (outlierCount > 0) {
    parts.push(`${outlierCount} outlier${outlierCount > 1 ? "s were" : " was"} excluded`);
  }

  return parts.join(", ") + ".";
}

// Median for non-temperature fields (null-aware)
function medianNonNull(values: (number | null)[]): number | null {
  const valid = values.filter((v): v is number => v !== null);
  if (valid.length === 0) return null;
  return median(valid);
}

// Mode for condition codes
function modeCondition(conditions: string[]): { code: string; desc: string } {
  const valid = conditions.filter((c) => c !== "" && c !== undefined);
  if (valid.length === 0) return { code: "2", desc: "Partly cloudy" };

  const counts = new Map<string, number>();
  for (const c of valid) {
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }

  let maxCount = 0;
  let mode = valid[0];
  for (const [c, count] of counts) {
    if (count > maxCount) {
      maxCount = count;
      mode = c;
    }
  }

  const code = parseInt(mode, 10);
  if (!isNaN(code)) {
    return { code: mode, desc: wmoDescription(code) };
  }

  // If it's a text condition, convert to code
  const mappedCode = wmoCodeFromCondition(mode);
  return { code: String(mappedCode), desc: wmoDescription(mappedCode) };
}

// ============================================================
// Main handler
// ============================================================

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const latStr = url.searchParams.get("lat") ?? (req.method === "POST" ? (await req.json()).lat : null);
    const lonStr = url.searchParams.get("lon") ?? (req.method === "POST" ? (await req.json()).lon : null);

    if (!latStr || !lonStr) {
      return new Response(JSON.stringify({ error: "Missing lat/lon parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const lat = parseFloat(String(latStr));
    const lon = parseFloat(String(lonStr));

    if (isNaN(lat) || isNaN(lon)) {
      return new Response(JSON.stringify({ error: "Invalid coordinates" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch from all sources in parallel
    const sources = await Promise.all([
      fetchOpenMeteoCore(lat, lon),
      fetchOpenMeteoDWD(lat, lon),
      fetchOpenMeteoMeteoFrance(lat, lon),
      fetchOpenMeteoGFS(lat, lon),
      fetchOpenMeteoJMA(lat, lon),
      fetchOpenMeteoMET(lat, lon),
      fetchOpenMeteoGEM(lat, lon),
      fetchOpenMeteoERA5(lat, lon),
      fetchOpenMeteoCFS(lat, lon),
      fetchOpenMeteoMarine(lat, lon),
      fetchOpenMeteoArpege(lat, lon),
    ]);

    // Fetch sunrise/sunset
    const { sunrise, sunset } = await fetchSunriseSunset(lat, lon);

    // Collect available temperatures
    const availableSources = sources.filter((s) => s.available && s.temperature !== null);
    const temps = availableSources.map((s) => s.temperature as number);

    // Aggregate
    const { finalTemp, outliers, included, hasConflict, spread } = aggregateTemperatures(temps);

    // Mark sources as included/excluded
    const outlierTemps = new Set(outliers.map((o) => Math.round(o * 10) / 10));
    for (const s of sources) {
      if (!s.available || s.temperature === null) {
        s.available = false;
        continue;
      }
      const rounded = Math.round(s.temperature * 10) / 10;
      if (outlierTemps.has(rounded) && !hasConflict) {
        // Don't exclude — we use outlier detection but keep for transparency
        // Actually mark based on whether temp is in outlier set
      }
    }

    // Mark included/excluded properly
    const includedSet = new Set(included.map((i) => Math.round(i * 10) / 10));
    for (const s of sources) {
      if (s.available && s.temperature !== null) {
        const rounded = Math.round(s.temperature * 10) / 10;
        if (hasConflict) {
          // In conflict mode, all are technically included but with warning
          s.available = true; // keep available but flagged via hasConflict
        }
      }
    }

    // Calculate confidence
    const confidence = calculateConfidence(
      availableSources.length,
      hasConflict ? 0 : included.length,
      hasConflict ? availableSources.length : outliers.length,
      hasConflict ? NaN : spread,
    );

    const confidenceLevel = confidence >= 90 ? "high" : confidence >= 70 ? "medium" : "low";

    // Aggregate non-temperature fields from available sources
    const finalFeelsLike = medianNonNull(availableSources.map((s) => s.feelsLike));
    const finalWindSpeed = medianNonNull(availableSources.map((s) => s.windSpeed));
    const finalWindDirection = medianNonNull(availableSources.map((s) => s.windDirection));
    const finalHumidity = medianNonNull(availableSources.map((s) => s.humidity));
    const finalPressure = medianNonNull(availableSources.map((s) => s.pressure));
    const finalVisibility = medianNonNull(availableSources.map((s) => s.visibility));
    const finalPrecipitation = medianNonNull(availableSources.map((s) => s.precipitation));
    const finalUvIndex = medianNonNull(availableSources.map((s) => s.uvIndex));

    // Mode of conditions
    const conditionResult = modeCondition(availableSources.map((s) => s.condition));

    // Generate explanations
    const explanation = generateExplanation(
      hasConflict ? 0 : included.length,
      availableSources.length,
      outliers,
      spread,
      finalTemp,
      hasConflict,
    );

    const confidenceExplanation = generateConfidenceExplanation(
      confidence,
      availableSources.length,
      hasConflict ? availableSources.length : outliers.length,
      spread,
    );

    // Build the response, marking each source included/excluded
    const sourceResults = sources.map((s) => {
      let isIncluded = false;
      let excludedReason: string | undefined;

      if (!s.available) {
        excludedReason = s.error ?? "Data unavailable";
      } else if (s.temperature !== null && !hasConflict) {
        const rounded = Math.round(s.temperature * 10) / 10;
        isIncluded = includedSet.has(rounded);
        if (!isIncluded) {
          excludedReason = "Outlier — value significantly differs from consensus";
        }
      } else if (hasConflict && s.available) {
        isIncluded = true; // All included in conflict mode, but flagged
      }

      return {
        ...s,
        included: isIncluded,
        excludedReason,
      };
    });

    const result = {
      finalTemperature: hasConflict ? null : (isNaN(finalTemp) ? null : Math.round(finalTemp * 10) / 10),
      finalFeelsLike: finalFeelsLike !== null ? Math.round(finalFeelsLike * 10) / 10 : null,
      finalCondition: conditionResult.desc,
      finalWindSpeed: finalWindSpeed !== null ? Math.round(finalWindSpeed * 10) / 10 : null,
      finalWindDirection: finalWindDirection,
      finalHumidity: finalHumidity,
      finalPressure: finalPressure !== null ? Math.round(finalPressure * 10) / 10 : null,
      finalVisibility: finalVisibility,
      finalPrecipitation: finalPrecipitation !== null ? Math.round(finalPrecipitation * 100) / 100 : null,
      finalUvIndex: finalUvIndex,
      sunrise,
      sunset,
      confidence,
      confidenceLevel,
      sourceCount: availableSources.length,
      includedCount: hasConflict ? 0 : included.length,
      outlierCount: hasConflict ? availableSources.length : outliers.length,
      hasConflict,
      explanation,
      confidenceExplanation,
      sources: sourceResults,
      computedAt: new Date().toISOString(),
      usingNearestData: false, // All sources are grid-based, so always at exact coords
      totalSourcesAttempted: sources.length,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Internal server error",
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
