import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { searchSettlements } from '@/data/armeniaLocations';
import type { Settlement } from '@/types';
import { Search, MapPin, X } from 'lucide-react';

interface SearchBarProps {
  onSelect: (settlement: Settlement) => void;
  selectedId?: string;
}

export function SearchBar({ onSelect, selectedId }: SearchBarProps) {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Settlement[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const found = searchSettlements(query, language);
    setResults(found);
    setIsOpen(found.length > 0);
    setHighlightedIndex(-1);
  }, [query, language]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(settlement: Settlement) {
    onSelect(settlement);
    const displayName = language === 'hy' ? settlement.nameHy : settlement.nameEn;
    setQuery(displayName);
    setIsOpen(false);
    inputRef.current?.blur();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < results.length) {
        handleSelect(results[highlightedIndex]);
      } else if (results.length > 0) {
        handleSelect(results[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  function clearSearch() {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-10 text-base text-white placeholder-slate-400 outline-none transition-all focus:border-sky-400/50 focus:bg-white/10 focus:ring-2 focus:ring-sky-400/20"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition-colors hover:text-white"
            aria-label="Clear"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-[1001] mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-white/10 bg-slate-800 shadow-2xl shadow-black/50">
          {results.map((settlement, idx) => {
            const name = language === 'hy' ? settlement.nameHy : settlement.nameEn;
            const community = language === 'hy' ? settlement.communityHy : settlement.communityEn;
            const region = language === 'hy' ? settlement.regionHy : settlement.regionEn;
            const typeLabel = t.settlementType[settlement.type];
            const isSelected = settlement.id === selectedId;
            const isHighlighted = idx === highlightedIndex;

            return (
              <button
                key={settlement.id}
                onClick={() => handleSelect(settlement)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                  isHighlighted ? 'bg-white/10' : 'hover:bg-white/5'
                } ${isSelected ? 'border-l-2 border-sky-400' : ''}`}
              >
                <MapPin className="h-4 w-4 flex-shrink-0 text-sky-400" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium text-white">{name}</span>
                    <span className="flex-shrink-0 rounded-md bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-300">
                      {typeLabel}
                    </span>
                  </div>
                  <p className="truncate text-sm text-slate-400">
                    {community} — {region}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {isOpen && results.length === 0 && query.trim().length >= 1 && (
        <div className="absolute z-[1001] mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-slate-400 shadow-2xl">
          {t.noResults}
        </div>
      )}
    </div>
  );
}
