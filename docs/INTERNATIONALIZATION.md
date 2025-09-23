# Internationalization (i18n) Guide

This guide covers the complete internationalization workflow for the LiftFire Marketing Website, including adding new languages, managing translations, and maintaining multilingual content.

## 🌍 Overview

The website supports multiple languages with automatic detection and manual switching:

- **Current Languages**: English (default), Spanish (Latin America)
- **Future Languages**: Portuguese (Brazil), French, Chinese (Simplified)
- **URL Structure**: Language-based routing (`/es/`, `/pt/`, etc.)
- **Fallback**: English for missing translations
- **Detection**: Browser language with localStorage persistence

## 🏗️ Architecture

### Technology Stack

- **React i18next**: Main internationalization library
- **i18next-browser-languagedetector**: Automatic language detection
- **i18next-http-backend**: Dynamic translation loading
- **Language Context**: React context for language state management

### File Structure

```
public/locales/                 # Translation files
├── en/                        # English (default)
│   ├── common.json           # Navigation, buttons, common UI
│   ├── homepage.json         # Homepage content
│   ├── features.json         # Features page
│   ├── pricing.json          # Pricing page
│   └── roadmap.json          # Roadmap page
├── es/                       # Spanish (Latin America)
│   ├── common.json
│   ├── homepage.json
│   ├── features.json
│   ├── pricing.json
│   └── roadmap.json
└── [future languages]/

src/i18n/                     # i18n configuration
├── config.ts                 # Main i18n setup
└── utils.ts                  # i18n utility functions

src/contexts/
└── LanguageContext.tsx       # Language state management
```

## 🚀 Adding a New Language

### Step 1: Update Language Configuration

Add the new language to `src/i18n/config.ts`:

```typescript
export const supportedLanguages: LanguageConfig[] = [
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
  // Add new language
  {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
    rtl: false,
    dateFormat: 'DD/MM/YYYY',
    numberFormat: 'pt-BR',
  },
];
```

### Step 2: Create Translation Files

Create translation files in `public/locales/pt/`:

```bash
mkdir -p public/locales/pt
```

Copy English files as templates:
```bash
cp public/locales/en/*.json public/locales/pt/
```

### Step 3: Translate Content

Translate each JSON file:

```json
// public/locales/pt/common.json
{
  "navigation": {
    "home": "Início",
    "features": "Recursos",
    "pricing": "Preços",
    "roadmap": "Roteiro",
    "community": "Comunidade",
    "contact": "Contato"
  },
  "buttons": {
    "startJourney": "Comece sua Jornada",
    "watchDemo": "Assistir Demo",
    "learnMore": "Saiba Mais",
    "getStarted": "Começar",
    "contactUs": "Entre em Contato"
  }
}
```

### Step 4: Update Environment Variables

Add the new language to supported languages:

```bash
# .env.local
VITE_SUPPORTED_LANGUAGES=en,es,pt
```

### Step 5: Configure URL Routing

Add URL redirects in `netlify.toml`:

```toml
# Portuguese routing
[[redirects]]
  from = "/pt/*"
  to = "/pt/:splat"
  status = 200
  force = false
```

### Step 6: Update SEO Configuration

Add hreflang tags for the new language in `src/components/SEO.tsx`:

```typescript
const hreflangTags = [
  { hreflang: 'en', href: `https://liftfire.app${englishPath}` },
  { hreflang: 'es', href: `https://liftfire.app/es${cleanPath}` },
  { hreflang: 'pt', href: `https://liftfire.app/pt${cleanPath}` },
  { hreflang: 'x-default', href: `https://liftfire.app${englishPath}` },
];
```

### Step 7: Test the New Language

1. **Start development server**: `npm run dev`
2. **Test language switching**: Use language switcher in header
3. **Test URL routing**: Navigate to `/pt/` URLs
4. **Verify translations**: Check all pages load correctly
5. **Test fallbacks**: Ensure missing translations fall back to English

## 📝 Translation Workflow

### Translation File Structure

Each namespace corresponds to a page or feature:

```json
// Hierarchical structure with nested objects
{
  "hero": {
    "title": "Transform Your Fitness Journey",
    "subtitle": "The gamified gym tracker that works offline",
    "cta": {
      "primary": "Start Your Journey",
      "secondary": "Watch Demo"
    }
  },
  "features": {
    "offline": {
      "title": "100% Offline",
      "description": "Track workouts without internet"
    }
  }
}
```

### Using Translations in Components

```typescript
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation('homepage');
  
  return (
    <section>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('hero.cta.primary')}</button>
    </section>
  );
}
```

### Advanced Translation Features

#### Pluralization
```json
{
  "users": "{{count}} user",
  "users_plural": "{{count}} users"
}
```

```typescript
const { t } = useTranslation();
// Automatically selects singular/plural
t('users', { count: 1 }); // "1 user"
t('users', { count: 5 }); // "5 users"
```

#### Interpolation
```json
{
  "welcome": "Welcome back, {{name}}!",
  "progress": "You've completed {{completed}} of {{total}} workouts"
}
```

```typescript
t('welcome', { name: 'John' }); // "Welcome back, John!"
t('progress', { completed: 15, total: 20 }); // "You've completed 15 of 20 workouts"
```

#### Context-based Translations
```json
{
  "button": "Submit",
  "button_loading": "Submitting...",
  "button_error": "Try Again"
}
```

```typescript
t('button', { context: 'loading' }); // "Submitting..."
t('button', { context: 'error' }); // "Try Again"
```

### Translation Best Practices

#### Key Naming
- Use descriptive, hierarchical keys
- Group related translations
- Use consistent naming patterns

```json
// ✅ Good
{
  "pricing": {
    "plans": {
      "free": {
        "title": "Free Plan",
        "price": "$0",
        "features": ["Basic tracking", "Offline mode"]
      }
    }
  }
}

// ❌ Avoid
{
  "freePlanTitle": "Free Plan",
  "freePlanPrice": "$0",
  "freePlanFeature1": "Basic tracking"
}
```

#### Content Guidelines
- Keep translations natural and culturally appropriate
- Consider text length differences between languages
- Use gender-neutral language when possible
- Maintain consistent tone and voice

#### Technical Considerations
- Escape special characters properly
- Use HTML entities for special symbols
- Consider RTL languages for future expansion
- Test with longer/shorter text lengths

## 🔧 Language Switching

### Language Switcher Component

The language switcher is located in the header and provides:

- **Flag icons**: Visual language identification
- **Native names**: Language names in their native script
- **URL preservation**: Maintains current page when switching
- **Accessibility**: Proper ARIA labels and keyboard navigation

```typescript
// src/components/layout/LanguageSwitcher.tsx
function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  
  return (
    <select 
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value)}
      aria-label="Select language"
    >
      {availableLanguages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
}
```

### URL Structure

The website uses language-based URL routing:

- **English (default)**: `https://liftfire.app/`
- **Spanish**: `https://liftfire.app/es/`
- **Portuguese**: `https://liftfire.app/pt/`

### Language Detection Priority

1. **URL path**: `/es/` prefix takes precedence
2. **localStorage**: Previously selected language
3. **Browser language**: `navigator.language`
4. **Default**: Falls back to English

## 🧪 Testing Internationalization

### Manual Testing

1. **Language switching**: Test all language combinations
2. **URL routing**: Verify language-specific URLs work
3. **Content loading**: Check all translations load correctly
4. **Fallback behavior**: Test with missing translations
5. **Browser detection**: Test automatic language detection
6. **Persistence**: Verify language preference saves

### Automated Testing

```typescript
// src/components/__tests__/LanguageSwitcher.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { LanguageProvider } from '../../contexts/LanguageContext';

describe('LanguageSwitcher', () => {
  it('switches language when option selected', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );
    
    const select = screen.getByLabelText('Select language');
    fireEvent.change(select, { target: { value: 'es' } });
    
    expect(select.value).toBe('es');
  });
});
```

### Translation Validation

Create a script to validate translations:

```typescript
// scripts/validate-translations.ts
import fs from 'fs';
import path from 'path';

const validateTranslations = () => {
  const localesDir = 'public/locales';
  const languages = fs.readdirSync(localesDir);
  const baseLanguage = 'en';
  
  // Get all keys from base language
  const baseKeys = getTranslationKeys(baseLanguage);
  
  languages.forEach(lang => {
    if (lang === baseLanguage) return;
    
    const langKeys = getTranslationKeys(lang);
    const missingKeys = baseKeys.filter(key => !langKeys.includes(key));
    
    if (missingKeys.length > 0) {
      console.warn(`Missing translations in ${lang}:`, missingKeys);
    }
  });
};
```

## 🚀 Deployment Considerations

### Build Process

The build process automatically:
- Validates translation files
- Generates language-specific sitemaps
- Creates hreflang meta tags
- Optimizes translation loading

### SEO Optimization

Each language version includes:
- **Localized meta tags**: Title, description, keywords
- **Hreflang tags**: Language and regional targeting
- **Structured data**: Localized JSON-LD markup
- **Sitemap entries**: Language-specific URLs

### Performance Optimization

- **Lazy loading**: Translations load on demand
- **Caching**: Translation files cached in browser
- **Bundle splitting**: Language-specific chunks
- **Preloading**: Default language preloaded

## 🔮 Future Enhancements

### Planned Languages

1. **Portuguese (Brazil)**: Large fitness market
2. **French**: European expansion
3. **Chinese (Simplified)**: Asian market entry
4. **German**: European fitness enthusiasts
5. **Japanese**: Tech-savvy fitness community

### Advanced Features

- **RTL support**: For Arabic and Hebrew
- **Regional variants**: Different Spanish/Portuguese variants
- **Dynamic content**: CMS-driven translations
- **Translation management**: Professional translation workflow
- **A/B testing**: Language-specific feature testing

### Translation Management Tools

Consider integrating:
- **Crowdin**: Community-driven translations
- **Lokalise**: Professional translation management
- **Weblate**: Open-source translation platform
- **Custom CMS**: Internal translation management

## 📊 Analytics and Monitoring

### Language Usage Tracking

Monitor language usage with analytics:
- **Page views by language**: Track popular languages
- **User engagement**: Compare metrics across languages
- **Conversion rates**: Language-specific performance
- **Geographic distribution**: User locations by language

### Translation Quality

Track translation quality:
- **User feedback**: Language-specific feedback forms
- **Error reporting**: Missing or incorrect translations
- **Performance impact**: Translation loading times
- **SEO performance**: Search rankings by language

## 🤝 Contributing Translations

### For Contributors

1. **Check existing translations**: Avoid duplicating work
2. **Follow style guide**: Maintain consistent tone
3. **Test thoroughly**: Verify translations in context
4. **Cultural sensitivity**: Consider local customs
5. **Technical accuracy**: Maintain technical terminology

### Translation Review Process

1. **Initial translation**: Native speaker creates translations
2. **Technical review**: Developer checks implementation
3. **Cultural review**: Local expert reviews content
4. **User testing**: Test with target audience
5. **Final approval**: Maintainer approves changes

### Getting Help

- **Translation questions**: GitHub Discussions
- **Technical issues**: GitHub Issues
- **Style guidelines**: Check CONTRIBUTING.md
- **Community support**: Discord #translations channel

Remember: Good internationalization is about more than just translation—it's about creating an inclusive experience for users worldwide! 🌍