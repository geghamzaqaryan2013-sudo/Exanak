import { useLanguage } from '@/context/LanguageContext';
import { Cloud, Languages } from 'lucide-react';

export function Header() {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-[1000] border-b border-white/10 bg-slate-900/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/20">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-white sm:text-xl">
              {t.appName}
            </h1>
            <p className="hidden text-xs text-slate-400 sm:block">
              {t.appTagline}
            </p>
          </div>
        </div>

        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition-all hover:bg-white/10 hover:text-white active:scale-95"
          aria-label={t.language}
        >
          <Languages className="h-4 w-4" />
          <span>{language === 'en' ? 'Հայերեն' : 'English'}</span>
        </button>
      </div>
    </header>
  );
}
