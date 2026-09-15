import { useLanguage } from '@/context/LanguageContext';
import type { AggregatedWeather } from '@/types';
import { Info, Thermometer, ShieldCheck } from 'lucide-react';

interface ExplanationProps {
  weather: AggregatedWeather;
}

export function Explanation({ weather }: ExplanationProps) {
  const { t } = useLanguage();

  if (weather.hasConflict) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-400" />
        <div className="space-y-3">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <Thermometer className="h-4 w-4 text-sky-400" />
              {t.finalTemperature}: {weather.finalTemperature !== null ? `${weather.finalTemperature > 0 ? '+' : ''}${Math.round(weather.finalTemperature)}${t.celsius}` : '—'}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">{weather.explanation}</p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-sky-400" />
              {t.confidence}: {weather.confidence}%
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">{weather.confidenceExplanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
