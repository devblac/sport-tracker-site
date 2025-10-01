import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCommonTranslations } from '../../hooks/useTranslations';
import { Button } from './Button';
import { cn } from '../../utils/cn';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-4 w-4', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('h-4 w-4', className)}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
);

export interface LanguageSwitcherProps {
  variant?: 'button' | 'dropdown';
  showLabel?: boolean;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  showLabel = true,
  className,
}) => {
  const {
    currentLanguage,
    languageConfig,
    supportedLanguages,
    changeLanguage,
    isLoading,
  } = useLanguage();
  const { labels } = useCommonTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = async (languageCode: string) => {
    if (languageCode !== currentLanguage) {
      await changeLanguage(languageCode);
      setIsOpen(false);
    }
  };

  if (variant === 'button') {
    const handleCycleLanguage = () => {
      const currentIndex = supportedLanguages.findIndex(lang => lang.code === currentLanguage);
      const nextIndex = (currentIndex + 1) % supportedLanguages.length;
      const nextLanguage = supportedLanguages[nextIndex];
      handleLanguageChange(nextLanguage.code);
    };

    return (
      <Button
        variant="glass"
        size="sm"
        onClick={handleCycleLanguage}
        disabled={isLoading}
        className={cn(
          'flex items-center gap-2 rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20',
          className
        )}
        aria-label={`${labels.language}: ${languageConfig.name}`}
      >
        <GlobeIcon className="text-white/80" />
        <span className="text-sm font-medium">
          {languageConfig.flag} {showLabel && languageConfig.name}
        </span>
      </Button>
    );
  }

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <Button
        variant="glass"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20"
        aria-label={`${labels.language}: ${languageConfig.name}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <GlobeIcon className="text-white/80" />
        <span className="text-sm font-medium">
          {languageConfig.flag} {showLabel && languageConfig.name}
        </span>
        <ChevronDownIcon
          className={cn(
            'transition-transform duration-200 text-white/70',
            isOpen && 'rotate-180'
          )}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur">
          <div className="py-2" role="listbox" aria-label={labels.language}>
            {supportedLanguages.map(language => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-slate-200 transition-colors hover:bg-white/10',
                  currentLanguage === language.code && 'bg-white/10 text-white'
                )}
                role="option"
                aria-selected={currentLanguage === language.code}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
                {currentLanguage === language.code && (
                  <span className="ml-auto text-blue-400">?</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
