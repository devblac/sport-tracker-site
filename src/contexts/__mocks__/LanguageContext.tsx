import React from 'react';

export const mockLanguageContext = {
  currentLanguage: 'en',
  languageConfig: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    rtl: false,
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'en-US',
  },
  supportedLanguages: [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      rtl: false,
      dateFormat: 'MM/DD/YYYY',
      numberFormat: 'en-US',
    },
    {
      code: 'es',
      name: 'Español',
      flag: '🇲🇽',
      rtl: false,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'es-MX',
    },
  ],
  changeLanguage: vi.fn(),
  isLoading: false,
  error: null,
};

export const useLanguage = () => mockLanguageContext;

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <div>{children}</div>;
