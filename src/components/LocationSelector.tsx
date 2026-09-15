import { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getRegions, getCommunities, getSettlements } from '@/data/armeniaLocations';
import type { Settlement } from '@/types';
import { ChevronDown, MapPin } from 'lucide-react';

interface LocationSelectorProps {
  onSelect: (settlement: Settlement) => void;
  selectedId?: string;
}

export function LocationSelector({ onSelect, selectedId }: LocationSelectorProps) {
  const { t, language } = useLanguage();
  const [regionKey, setRegionKey] = useState('');
  const [communityKey, setCommunityKey] = useState('');

  const regions = useMemo(() => getRegions(language), [language]);
  const communities = useMemo(
    () => (regionKey ? getCommunities(regionKey, language) : []),
    [regionKey, language],
  );
  const settlements = useMemo(
    () => (regionKey && communityKey ? getSettlements(regionKey, communityKey, language) : []),
    [regionKey, communityKey, language],
  );

  function handleRegionChange(value: string) {
    setRegionKey(value);
    setCommunityKey('');
  }

  function handleSettlementChange(id: string) {
    const settlement = settlements.find((s) => s.id === id);
    if (settlement) onSelect(settlement);
  }

  const selectClass =
    'w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-10 text-sm text-white outline-none transition-all focus:border-sky-400/50 focus:bg-white/10 focus:ring-2 focus:ring-sky-400/20';

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {/* Region */}
      <div className="relative">
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
          {t.region}
        </label>
        <select
          value={regionKey}
          onChange={(e) => handleRegionChange(e.target.value)}
          className={selectClass}
        >
          <option value="" className="bg-slate-800">{t.selectRegion}</option>
          {regions.map((r) => (
            <option key={r.key} value={r.key} className="bg-slate-800">
              {r.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-[38px] h-4 w-4 text-slate-400" />
      </div>

      {/* Community */}
      <div className="relative">
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
          {t.community}
        </label>
        <select
          value={communityKey}
          onChange={(e) => setCommunityKey(e.target.value)}
          disabled={!regionKey}
          className={`${selectClass} disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <option value="" className="bg-slate-800">{t.selectCommunity}</option>
          {communities.map((c) => (
            <option key={c.key} value={c.key} className="bg-slate-800">
              {c.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-[38px] h-4 w-4 text-slate-400" />
      </div>

      {/* Settlement */}
      <div className="relative">
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
          {t.settlement}
        </label>
        <select
          value={selectedId ?? ''}
          onChange={(e) => handleSettlementChange(e.target.value)}
          disabled={!communityKey}
          className={`${selectClass} disabled:cursor-not-allowed disabled:opacity-40`}
        >
          <option value="" className="bg-slate-800">{t.selectSettlement}</option>
          {settlements.map((s) => {
            const name = language === 'hy' ? s.nameHy : s.nameEn;
            return (
              <option key={s.id} value={s.id} className="bg-slate-800">
                {name} ({t.settlementType[s.type]})
              </option>
            );
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-[38px] h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
}

export function SelectedLocationBadge({ settlement }: { settlement: Settlement }) {
  const { language } = useLanguage();
  const name = language === 'hy' ? settlement.nameHy : settlement.nameEn;
  const community = language === 'hy' ? settlement.communityHy : settlement.communityEn;
  const region = language === 'hy' ? settlement.regionHy : settlement.regionEn;

  return (
    <div className="flex items-center gap-2 text-sm text-slate-300">
      <MapPin className="h-4 w-4 text-sky-400" />
      <span className="font-medium text-white">{name}</span>
      <span className="text-slate-500">—</span>
      <span>{community}</span>
      <span className="text-slate-500">—</span>
      <span>{region}</span>
      <span className="ml-2 rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400">
        {settlement.lat.toFixed(4)}°, {settlement.lon.toFixed(4)}°
      </span>
    </div>
  );
}
