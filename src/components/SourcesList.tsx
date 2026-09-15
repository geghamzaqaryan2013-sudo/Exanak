import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import type { AggregatedWeather, WeatherSourceResult } from '@/types';
import {
  ChevronDown, ChevronUp, ExternalLink, Check, X, AlertCircle,
  Thermometer, Clock, Database, Link2,
} from 'lucide-react';

interface SourcesListProps {
  weather: AggregatedWeather;
}

export function SourcesList({ weather }: SourcesListProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  if (!weather.sources || weather.sources.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 backdrop-blur-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-base font-semibold text-white">
          {t.viewAllSources}
          <span className="ml-2 text-sm font-normal text-slate-400">
            ({weather.sourceCount}/{weather.sources.length} {t.sourcesResponded})
          </span>
        </h3>
        {expanded ? (
          <ChevronUp className="h-5 w-5 flex-shrink-0 text-slate-400" />
        ) : (
          <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400" />
        )}
      </button>

      {expanded && (
        <div className="mt-4 space-y-2">
          {weather.sources.map((source) => (
            <SourceRow key={source.sourceId} source={source} />
          ))}
        </div>
      )}
    </div>
  );
}

function SourceRow({ source }: { source: WeatherSourceResult }) {
  const { t, language } = useLanguage();

  const updateTime = source.sourceUpdate
    ? new Date(source.sourceUpdate).toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Yerevan',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '—';

  if (!source.available) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
          <div>
            <p className="text-sm font-medium text-white">{source.sourceName}</p>
            <p className="text-xs text-red-300/70">{t.dataUnavailableSource}</p>
          </div>
        </div>
        <span className="rounded-md bg-red-500/20 px-2 py-1 text-xs font-medium text-red-300">
          {t.excluded}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 rounded-lg border px-4 py-3 transition-colors sm:flex-row sm:items-center sm:justify-between ${
      source.included
        ? 'border-emerald-500/20 bg-emerald-500/5'
        : 'border-amber-500/20 bg-amber-500/5'
    }`}>
      <div className="flex items-center gap-3">
        <Thermometer className={`h-4 w-4 flex-shrink-0 ${source.included ? 'text-emerald-400' : 'text-amber-400'}`} />
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-white">{source.sourceName}</p>
            {source.sourceUrl && (
              <a
                href={source.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-sky-400"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {t.updated} {updateTime}
            </span>
            <span className="flex items-center gap-1">
              <Database className="h-3 w-3" />
              {source.dataType}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-white">
          {source.temperature !== null
            ? `${source.temperature > 0 ? '+' : ''}${source.temperature.toFixed(1)}°C`
            : '—'}
        </span>
        {source.included ? (
          <span className="flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300">
            <Check className="h-3 w-3" />
            {t.included}
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-1 text-xs font-medium text-amber-300">
            <X className="h-3 w-3" />
            {t.excluded}
          </span>
        )}
      </div>

      {!source.included && source.excludedReason && (
        <div className="w-full text-xs text-amber-300/60 sm:absolute sm:-bottom-1 sm:left-4">
          {source.excludedReason}
        </div>
      )}
    </div>
  );
}
