// ============================================================
// Core domain types for the Armenia Weather application
// ============================================================

/** A single settlement in Armenia */
export interface Settlement {
  /** Unique identifier: `${nameEn}__${communityEn}__${regionEn}` */
  id: string;
  /** English name of the settlement */
  nameEn: string;
  /** Armenian name of the settlement */
  nameHy: string;
  /** English name of the community */
  communityEn: string;
  /** Armenian name of the community */
  communityHy: string;
  /** English name of the region (Marz) */
  regionEn: string;
  /** Armenian name of the region (Marz) */
  regionHy: string;
  /** Settlement type */
  type: SettlementType;
  /** Latitude */
  lat: number;
  /** Longitude */
  lon: number;
}

export type SettlementType = 'city' | 'town' | 'village' | 'community';

/** Supported UI languages */
export type Language = 'en' | 'hy';

/** Normalized weather observation from a single source */
export interface WeatherSourceResult {
  /** Source identifier (e.g., 'open_meteo_core') */
  sourceId: string;
  /** Human-readable source name */
  sourceName: string;
  /** URL to the source's website or API docs */
  sourceUrl: string;
  /** Temperature in degrees Celsius */
  temperature: number | null;
  /** Feels-like temperature in degrees Celsius */
  feelsLike: number | null;
  /** Weather condition code (WMO or source-specific, normalized) */
  condition: string;
  /** Weather condition description in English */
  conditionDescription: string;
  /** Wind speed in km/h */
  windSpeed: number | null;
  /** Wind direction in degrees (0-360) */
  windDirection: number | null;
  /** Humidity percentage (0-100) */
  humidity: number | null;
  /** Atmospheric pressure in hPa */
  pressure: number | null;
  /** Visibility in meters */
  visibility: number | null;
  /** Precipitation in mm */
  precipitation: number | null;
  /** UV index (0-12) */
  uvIndex: number | null;
  /** Whether this source's data was included in the final calculation */
  included: boolean;
  /** Reason for exclusion, if any */
  excludedReason?: string;
  /** Error message if the source failed */
  error?: string;
  /** Whether the source responded successfully */
  available: boolean;
  /** ISO timestamp of when this data was fetched */
  fetchedAt: string;
  /** ISO timestamp of the source's last update, if known */
  sourceUpdate?: string;
  /** Distance in km from the requested point to the data point */
  distanceKm?: number;
  /** Type of data: 'station', 'grid', 'model' */
  dataType: string;
}

/** Aggregated weather result returned by the backend */
export interface AggregatedWeather {
  /** Final consensus temperature in degrees Celsius */
  finalTemperature: number | null;
  /** Final feels-like temperature in degrees Celsius */
  finalFeelsLike: number | null;
  /** Final weather condition description */
  finalCondition: string;
  /** Final wind speed in km/h */
  finalWindSpeed: number | null;
  /** Final wind direction in degrees */
  finalWindDirection: number | null;
  /** Final humidity percentage */
  finalHumidity: number | null;
  /** Final pressure in hPa */
  finalPressure: number | null;
  /** Final visibility in meters */
  finalVisibility: number | null;
  /** Final precipitation in mm */
  finalPrecipitation: number | null;
  /** Final UV index */
  finalUvIndex: number | null;
  /** Sunrise time (ISO) */
  sunrise: string | null;
  /** Sunset time (ISO) */
  sunset: string | null;
  /** Confidence score (0-100) */
  confidence: number;
  /** Confidence level */
  confidenceLevel: 'high' | 'medium' | 'low';
  /** Number of sources that responded */
  sourceCount: number;
  /** Number of sources included in the calculation */
  includedCount: number;
  /** Number of outliers detected */
  outlierCount: number;
  /** Whether sources significantly disagree (conflict) */
  hasConflict: boolean;
  /** Dynamic explanation of the final result */
  explanation: string;
  /** Dynamic explanation of the confidence score */
  confidenceExplanation: string;
  /** All source results */
  sources: WeatherSourceResult[];
  /** ISO timestamp of when the aggregation was computed */
  computedAt: string;
  /** Whether the nearest data point was used (no direct observation) */
  usingNearestData: boolean;
  /** Distance to the nearest data point in km, if applicable */
  nearestDataDistanceKm?: number;
}

/** Weather request sent to the Edge Function */
export interface WeatherRequest {
  lat: number;
  lon: number;
  settlementName: string;
}
