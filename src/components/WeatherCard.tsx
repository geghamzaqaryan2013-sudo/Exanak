import { useLanguage } from '@/context/LanguageContext';
import type { AggregatedWeather, Settlement } from '@/types';
import { getWeatherCondition, conditionStringToCode } from '@/lib/wmoCodes';
import {
  Sun, Cloud, CloudSun, CloudRain, CloudDrizzle, CloudFog,
  CloudLightning, Snowflake, Wind, Droplets, Gauge, Eye,
  Sunrise, Sunset, Compass, RefreshCw, AlertTriangle, ShieldCheck,
  Thermometer, MapPin, Info,
} from 'lucide-react';

interface WeatherCardProps {
  weather: AggregatedWeather;
  settlement: Settlement;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastChecked: Date | null;
}

function getIcon(iconName: string) {
  const map: Record<string, typeof Sun> = {
    Sun, Cloud, CloudSun, CloudRain, CloudDrizzle, CloudFog,
    CloudLightning, Snowflake,
  };
  return map[iconName] ?? Cloud;
}

function windDirectionLabel(deg: number | null, lang: 'en' | 'hy'): string {
  if (deg === null) return '—';
  const dirs = lang === 'en'
    ? ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    : ['Հ', 'ՀԱ', 'Ա', 'ՀՎ', 'Հ', 'ՀԱ', 'Ա', 'ՀՎ'];
  const idx = Math.round(deg / 45) % 8;
  return dirs[idx];
}

export function WeatherCard({ weather, settlement, onRefresh, isRefreshing, lastChecked }: WeatherCardProps) {
  const { t, language } = useLanguage();
  const name = language === 'hy' ? settlement.nameHy : settlement.nameEn;
  const region = language === 'hy' ? settlement.regionHy : settlement.regionEn;

  const conditionCode = conditionStringToCode(weather.finalCondition);
  const condition = getWeatherCondition(conditionCode);
  const Icon = getIcon(condition.icon);
  const conditionText = language === 'hy' ? condition.descriptionHy : condition.descriptionEn;

  const confidenceColor =
    weather.confidence >= 90 ? 'text-emerald-400' :
    weather.confidence >= 70 ? 'text-amber-400' :
    'text-red-400';

  const confidenceBg =
    weather.confidence >= 90 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
    weather.confidence >= 70 ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
    'bg-red-500/20 text-red-300 border-red-500/30';

  const confidenceDot =
    weather.confidence >= 90 ? 'bg-emerald-400' :
    weather.confidence >= 70 ? 'bg-amber-400' :
    'bg-red-400';

  const localTime = new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Yerevan',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${condition.gradient} p-6 shadow-2xl sm:p-8`}>
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-black/10 blur-3xl" />

      <div className="relative">
        {/* Location + time */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-white/80" />
              <h2 className="text-xl font-bold text-white sm:text-2xl">{name}, {region}</h2>
            </div>
            <p className="mt-1 text-sm text-white/70">
              {localTime} — {t.localTime}
            </p>
          </div>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? t.refreshing : t.checkAgain}
          </button>
        </div>

        {weather.hasConflict ? (
          /* Conflict state */
          <div className="mt-8 flex flex-col items-center py-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <AlertTriangle className="h-10 w-10 text-white" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-white">{t.dataInconsistent}</h3>
            <p className="mt-2 max-w-md text-sm text-white/80">{t.dataInconsistentDesc}</p>
          </div>
        ) : weather.finalTemperature === null ? (
          /* No data state */
          <div className="mt-8 flex flex-col items-center py-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Info className="h-10 w-10 text-white" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-white">{t.dataUnavailable}</h3>
          </div>
        ) : (
          <>
            {/* Main temperature display */}
            <div className="mt-6 flex flex-col items-center sm:flex-row sm:items-center sm:gap-8">
              <div className="flex flex-col items-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm sm:h-32 sm:w-32">
                  <Icon className="h-14 w-14 text-white sm:h-16 sm:w-16" />
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center sm:mt-0 sm:items-start">
                <div className="flex items-start">
                  <span className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
                    {weather.finalTemperature > 0 ? '+' : ''}{Math.round(weather.finalTemperature)}
                  </span>
                  <span className="mt-2 text-3xl font-bold text-white/80">{t.celsius}</span>
                </div>
                <p className="mt-1 text-lg font-medium text-white/90">{conditionText}</p>
                {weather.finalFeelsLike !== null && (
                  <p className="mt-1 text-sm text-white/70">
                    {t.feelsLike}: {weather.finalFeelsLike > 0 ? '+' : ''}{Math.round(weather.finalFeelsLike)}{t.celsius}
                  </p>
                )}
              </div>
            </div>

            {/* Weather details grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              <DetailItem icon={Wind} label={t.windSpeed}
                value={weather.finalWindSpeed !== null ? `${Math.round(weather.finalWindSpeed)} ${t.kmh}` : '—'} />
              <DetailItem icon={Compass} label={t.windDirection}
                value={weather.finalWindDirection !== null ? windDirectionLabel(weather.finalWindDirection, language) : '—'} />
              <DetailItem icon={Droplets} label={t.humidity}
                value={weather.finalHumidity !== null ? `${Math.round(weather.finalHumidity)}${t.percent}` : '—'} />
              <DetailItem icon={Gauge} label={t.pressure}
                value={weather.finalPressure !== null ? `${Math.round(weather.finalPressure)} ${t.hpa}` : '—'} />
              {weather.finalVisibility !== null && (
                <DetailItem icon={Eye} label={t.visibility}
                  value={`${Math.round(weather.finalVisibility / 100) / 10} ${t.kmh === 'km/h' ? 'km' : 'կմ'}`} />
              )}
              {weather.finalPrecipitation !== null && weather.finalPrecipitation > 0 && (
                <DetailItem icon={CloudRain} label={t.precipitation}
                  value={`${weather.finalPrecipitation} ${t.mm}`} />
              )}
              {weather.finalUvIndex !== null && (
                <DetailItem icon={Sun} label={t.uvIndex}
                  value={String(Math.round(weather.finalUvIndex))} />
              )}
            </div>

            {/* Sunrise / Sunset */}
            <div className="mt-4 flex flex-wrap gap-4">
              {weather.sunrise && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                  <Sunrise className="h-4 w-4 text-amber-200" />
                  <div>
                    <span className="text-xs text-white/60">{t.sunrise}: </span>
                    <span className="text-sm font-medium text-white">
                      {new Date(weather.sunrise).toLocaleTimeString('en-GB', { timeZone: 'Asia/Yerevan', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              )}
              {weather.sunset && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                  <Sunset className="h-4 w-4 text-orange-200" />
                  <div>
                    <span className="text-xs text-white/60">{t.sunset}: </span>
                    <span className="text-sm font-medium text-white">
                      {new Date(weather.sunset).toLocaleTimeString('en-GB', { timeZone: 'Asia/Yerevan', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Confidence + sources summary */}
        {!weather.hasConflict && weather.finalTemperature !== null && (
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/15 pt-4">
            <div className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 ${confidenceBg}`}>
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm font-semibold">{t.confidence}: {weather.confidence}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span className={`h-2 w-2 rounded-full ${confidenceDot}`} />
              {weather.includedCount} {t.sourcesAgree}
              {weather.outlierCount > 0 && (
                <span className="text-white/50">· {weather.outlierCount} outlier{weather.outlierCount > 1 ? 's' : ''}</span>
              )}
            </div>
          </div>
        )}

        {/* Partial data notice */}
        {weather.sourceCount < (weather.sources?.length ?? 0) && weather.sourceCount > 0 && (
          <div className="mt-3 rounded-lg bg-black/20 px-3 py-2 text-xs text-white/70">
            {t.dataAvailable} {weather.sourceCount} {t.availableSources}.
          </div>
        )}

        {/* Last checked */}
        {lastChecked && (
          <p className="mt-4 text-xs text-white/50">
            {t.lastChecked}: {lastChecked.toLocaleTimeString('en-GB', { timeZone: 'Asia/Yerevan', hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: typeof Sun; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur-sm">
      <Icon className="h-4 w-4 flex-shrink-0 text-white/70" />
      <div className="min-w-0">
        <p className="text-xs text-white/60">{label}</p>
        <p className="truncate text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

export function WeatherSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 p-8 shadow-2xl">
      <div className="flex justify-between">
        <div>
          <div className="h-7 w-48 rounded-lg bg-white/10" />
          <div className="mt-2 h-4 w-32 rounded-lg bg-white/5" />
        </div>
        <div className="h-10 w-28 rounded-xl bg-white/10" />
      </div>
      <div className="mt-8 flex items-center justify-center gap-8">
        <div className="h-32 w-32 rounded-full bg-white/10" />
        <div>
          <div className="h-16 w-32 rounded-lg bg-white/10" />
          <div className="mt-2 h-5 w-24 rounded-lg bg-white/5" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="mt-6 h-12 rounded-lg bg-white/5" />
    </div>
  );
}
