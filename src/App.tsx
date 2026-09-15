import { useState, useCallback } from 'react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { LocationSelector, SelectedLocationBadge } from '@/components/LocationSelector';
import { WeatherCard, WeatherSkeleton } from '@/components/WeatherCard';
import { SourcesList } from '@/components/SourcesList';
import { Explanation } from '@/components/Explanation';
import { WeatherMap } from '@/components/WeatherMap';
import { fetchWeather } from '@/lib/weatherService';
import type { Settlement, AggregatedWeather } from '@/types';
import { MapPin, Search } from 'lucide-react';

function WeatherApp() {
  const { t } = useLanguage();
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);
  const [weather, setWeather] = useState<AggregatedWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const loadWeather = useCallback(async (settlement: Settlement) => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchWeather(settlement.lat, settlement.lon, settlement.nameEn);
      setWeather(data);
      setLastChecked(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectSettlement = useCallback((settlement: Settlement) => {
    setSelectedSettlement(settlement);
    loadWeather(settlement);
  }, [loadWeather]);

  const handleRefresh = useCallback(() => {
    if (selectedSettlement) {
      loadWeather(selectedSettlement);
    }
  }, [selectedSettlement, loadWeather]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Search and selection section */}
        <div className="space-y-4">
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-slate-400">
              <Search className="h-4 w-4" />
              {t.selectLocation}
            </h2>
            <SearchBar onSelect={handleSelectSettlement} selectedId={selectedSettlement?.id} />
          </div>

          <LocationSelector onSelect={handleSelectSettlement} selectedId={selectedSettlement?.id} />

          {selectedSettlement && (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <SelectedLocationBadge settlement={selectedSettlement} />
            </div>
          )}
        </div>

        {/* Weather display section */}
        <div className="mt-8 space-y-6">
          {!selectedSettlement && (
            <EmptyState />
          )}

          {selectedSettlement && loading && (
            <WeatherSkeleton />
          )}

          {selectedSettlement && !loading && error && (
            <ErrorState onRetry={handleRefresh} />
          )}

          {selectedSettlement && !loading && !error && weather && (
            <>
              <WeatherCard
                weather={weather}
                settlement={selectedSettlement}
                onRefresh={handleRefresh}
                isRefreshing={loading}
                lastChecked={lastChecked}
              />

              <Explanation weather={weather} />

              <SourcesList weather={weather} />

              <WeatherMap settlement={selectedSettlement} weather={weather} />
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        {t.appName} — {t.appTagline}
      </footer>
    </div>
  );
}

function EmptyState() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/20">
        <MapPin className="h-8 w-8 text-sky-400" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{t.noLocationSelected}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-400">{t.selectLocationPrompt}</p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
        <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{t.errorOccurred}</h3>
      <button
        onClick={onRetry}
        className="mt-4 rounded-xl bg-red-500/20 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/30"
      >
        {t.retry}
      </button>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <WeatherApp />
    </LanguageProvider>
  );
}
