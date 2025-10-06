<div align="center">

# 🚀 LiftFire Marketing Website

**A modern, high-performance marketing website for LiftFire - the gamified gym tracker PWA**

[![Build Status](https://github.com/liftfire/marketing-website/workflows/CI/badge.svg)](https://github.com/liftfire/marketing-website/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/12345678-1234-1234-1234-123456789012/deploy-status)](https://app.netlify.com/sites/liftfire/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Hackathon Project](https://img.shields.io/badge/Hackathon-Project-orange?logo=rocket)](https://github.com/topics/hackathon)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple?logo=pwa)](https://web.dev/progressive-web-apps/)

[🌐 Live Demo](https://liftfire.app) • [📚 Documentation](docs/) • [🤝 Contributing](CONTRIBUTING.md) • [💬 Discord](https://discord.gg/liftfire)

</div>

---

## ✨ Features

🎯 **Modern Tech Stack** - React 19, TypeScript, Tailwind CSS v4  
🌍 **Internationalization** - English, Spanish with automatic detection  
🎨 **Dark/Light Themes** - System preference detection + manual toggle  
⚡ **Hackathon Optimized** - Fast builds, flexible deployment, minimal configuration
♿ **Accessible Design** - Built with accessibility best practices  
📱 **Mobile Responsive** - Mobile-first design, works on all devices  
🔍 **SEO Optimized** - Structured data, meta tags, sitemap generation  
🧪 **Flexible Testing** - Essential component tests with Vitest + React Testing Library  
🚀 **CI/CD Ready** - GitHub Actions, automated deployment to Netlify  
🔒 **Security Focused** - Security headers, CSP, vulnerability scanning

## 🚀 Tech Stack

- **React 19** with TypeScript for type safety and modern development
- **Vite** with SWC for fast development and optimized builds
- **Tailwind CSS v4** for utility-first styling with custom design system
- **React i18next** for internationalization (English, Spanish)
- **Framer Motion** for smooth animations and micro-interactions
- **React Router** for client-side routing with language support
- **Vitest** with React Testing Library for comprehensive testing
- **ESLint + Prettier** for code quality and consistent formatting
- **Netlify** for deployment with GitHub Actions CI/CD

## 🛠️ Development

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm** (comes with Node.js)
- **Git** for version control

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/liftfire/marketing-website.git
cd marketing-website
```

2. **Install dependencies:**
```bash
npm ci
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser:**
   - Navigate to [http://localhost:5173](http://localhost:5173)
   - The site will automatically reload when you make changes

### Environment Configuration

Create a `.env.local` file based on `.env.example`:

```bash
# Application Environment
VITE_APP_ENV=development
NODE_ENV=development

# Internationalization
VITE_DEFAULT_LANGUAGE=en
VITE_SUPPORTED_LANGUAGES=en,es

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false
VITE_ENABLE_PERFORMANCE_MONITORING=false

# Development Settings
VITE_DEBUG_MODE=true
VITE_MOCK_API=false
```

### Available Scripts

#### Development
- `npm run dev` - Start development server with hot reload
- `npm run preview` - Preview production build locally

#### Building
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run build:analyze` - Build and analyze bundle size

#### Code Quality
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint with TypeScript rules
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changes

#### Testing
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ui` - Run tests with UI interface

#### SEO & Performance (Hackathon Mode)
- `npm run generate:seo` - Generate sitemap and robots.txt
- `npm run lighthouse` - Run Lighthouse performance audit (optional)
- `npm run lighthouse:server` - Start Lighthouse CI server (optional)

#### CI/CD
- `npm run ci:quality` - Run all quality checks (TypeScript, ESLint, Prettier, tests)
- `npm run ci:build` - Build and analyze for CI/CD
- `npm run deploy:test` - Test deployment configuration
- `npm run deploy:verify` - Verify deployment health

## 📁 Project Structure

```
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       ├── deploy.yml         # Main deployment workflow
│       └── pr-check.yml       # Pull request checks
├── .kiro/                     # Kiro configuration
│   ├── specs/                 # Feature specifications
│   └── steering/              # Development guidelines
├── docs/                      # Documentation
│   ├── DEPLOYMENT.md          # Detailed deployment guide
│   └── PRODUCTION_CHECKLIST.md # Pre-launch checklist
├── marketing/                 # Marketing content and assets
├── public/                    # Static assets
│   ├── locales/              # Translation files
│   │   ├── en/               # English translations
│   │   └── es/               # Spanish translations
│   ├── robots.txt            # Search engine directives
│   └── sitemap.xml           # Generated sitemap
├── scripts/                   # Build and deployment scripts
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── ui/              # Base UI components (Button, Card, etc.)
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   └── sections/        # Page section components
│   ├── contexts/            # React Context providers
│   │   ├── LanguageContext.tsx # Language switching
│   │   └── ThemeContext.tsx    # Dark/light theme
│   ├── data/                # Static data and constants
│   ├── hooks/               # Custom React hooks
│   ├── i18n/                # Internationalization configuration
│   ├── pages/               # Page components and routing
│   ├── styles/              # Global styles and theme
│   ├── test/                # Test utilities and setup
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── .env.example             # Environment variables template
├── netlify.toml             # Netlify deployment configuration
├── lighthouserc.js          # Lighthouse CI configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build configuration
```

## 🌍 Internationalization

The website supports multiple languages with automatic detection and manual switching:

### Supported Languages
- **English (en)** - Default language
- **Spanish (es)** - Latin America Spanish

### URL Structure
- English: `https://liftfire.app/` (default)
- Spanish: `https://liftfire.app/es/`

### Adding New Languages

1. **Add language configuration** in `src/i18n/config.ts`:
```typescript
{
  code: 'pt',
  name: 'Português',
  flag: '🇧🇷',
  rtl: false,
  dateFormat: 'DD/MM/YYYY',
  numberFormat: 'pt-BR',
}
```

2. **Create translation files** in `public/locales/pt/`:
```
public/locales/pt/
├── common.json      # Navigation, buttons, common UI
├── homepage.json    # Homepage content
├── features.json    # Features page
├── pricing.json     # Pricing page
└── roadmap.json     # Roadmap page
```

3. **Update environment variables**:
```bash
VITE_SUPPORTED_LANGUAGES=en,es,pt
```

4. **Add URL redirects** in `netlify.toml`:
```toml
[[redirects]]
  from = "/pt/*"
  to = "/pt/:splat"
  status = 200
```

### Translation Workflow

1. **Extract translatable strings** using the `useTranslation` hook
2. **Add keys to translation files** in `public/locales/`
3. **Test translations** with language switcher
4. **Verify URL routing** works for all languages

## 🎨 Design System

### Brand Colors
- **Primary Blue**: `#3B82F6` (blue-500) - CTAs, links, active states
- **Secondary Purple**: `#8B5CF6` (purple-500) - Gamification elements
- **Success Green**: `#10B981` (emerald-500) - Achievements, progress
- **Warning Orange**: `#F59E0B` (amber-500) - Alerts, warnings
- **Error Red**: `#EF4444` (red-500) - Errors, validation

### Theme System
- **Light Theme**: Default with white backgrounds
- **Dark Theme**: Dark backgrounds with proper contrast
- **System Detection**: Automatically detects user preference
- **Manual Toggle**: Theme switcher in header
- **Persistence**: Saves preference in localStorage

### Typography Scale
- **Display**: 48px+ for hero sections
- **Heading 1-3**: 36px, 30px, 24px for page structure
- **Body**: 16px standard, 18px large, 14px small
- **Font**: Inter with system font fallbacks

### Component Variants
- **Buttons**: Primary, secondary, ghost, destructive
- **Cards**: Default, elevated, bordered
- **Badges**: Status indicators with color coding

## 🧪 Testing

### Test Structure
```
src/
├── components/
│   └── __tests__/          # Component tests
├── hooks/
│   └── __tests__/          # Hook tests
├── pages/
│   └── __tests__/          # Page tests
├── utils/
│   └── __tests__/          # Utility tests
└── test/
    ├── setup.ts            # Test configuration
    ├── utils.tsx           # Test utilities
    └── i18n-setup.ts       # i18n mocks
```

### Testing Guidelines
- **Unit Tests**: All components, hooks, and utilities
- **Integration Tests**: Page-level functionality
- **Accessibility Tests**: WCAG compliance
- **Performance Tests**: Lighthouse CI integration
- **i18n Tests**: Translation loading and switching

### Running Tests
```bash
# Watch mode for development
npm run test

# Single run with coverage
npm run test:coverage

# UI interface for debugging
npm run test:ui

# Run specific test file
npm run test -- Button.test.tsx
```

## 🚀 Deployment

### Automatic Deployment

The project uses GitHub Actions for continuous deployment:

1. **Push to `main`** → Production deployment to `liftfire.app`
2. **Push to `develop`** → Preview deployment to `develop--liftfire.netlify.app`
3. **Pull Requests** → Quality checks and build verification

### Manual Deployment

1. **Build the project:**
```bash
npm run build
```

2. **Test the build locally:**
```bash
npm run preview
```

3. **Deploy to Netlify:**
```bash
# Using Netlify CLI
netlify deploy --prod --dir=dist
```

### Environment Variables

Configure these secrets in GitHub repository settings:

```bash
# Netlify Configuration
NETLIFY_SITE_ID=your-production-site-id
NETLIFY_PREVIEW_SITE_ID=your-preview-site-id
NETLIFY_AUTH_TOKEN=your-netlify-auth-token

# Optional: Lighthouse CI (disabled for hackathon)
# LHCI_GITHUB_APP_TOKEN=your-lighthouse-token

# Optional: Slack Notifications (disabled for hackathon)
# SLACK_WEBHOOK_URL=your-slack-webhook
```

### Performance Requirements (Hackathon Mode)

For hackathon projects, we prioritize fast development over strict performance thresholds:
- **Performance**: No strict requirements (focus on functionality)
- **Accessibility**: Built with best practices (no strict enforcement)
- **Best Practices**: 90+
- **SEO**: 90+

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check TypeScript errors
npm run type-check

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm ci
```

#### Development Server Issues
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Check port availability
lsof -ti:5173 | xargs kill -9

# Restart with clean cache
npm run dev -- --force
```

#### Translation Issues
```bash
# Verify translation files exist
ls public/locales/en/
ls public/locales/es/

# Check i18n configuration
npm run type-check src/i18n/

# Test language switching
npm run test -- LanguageContext
```

#### Performance Issues
```bash
# Analyze bundle size
npm run build:analyze

# Run Lighthouse audit (optional)
npm run lighthouse

# Check for unused dependencies
npx depcheck
```

### Getting Help

- **Documentation**: Check `docs/` folder for detailed guides
- **Issues**: Create GitHub issue with reproduction steps
- **Discussions**: Use GitHub Discussions for questions
- **Community**: Join Discord server for real-time help

## 🤝 Contributing

### Development Workflow

1. **Fork the repository** and create a feature branch
2. **Install dependencies**: `npm ci`
3. **Make your changes** following the coding standards
4. **Run quality checks**: `npm run ci:quality`
5. **Test your changes**: `npm run test:coverage`
6. **Create a pull request** with clear description

### Coding Standards

- **TypeScript**: Strict mode enabled, proper typing required
- **ESLint**: React hooks and TypeScript rules enforced
- **Prettier**: Consistent formatting across all files
- **Testing**: Minimum 80% code coverage required
- **Accessibility**: WCAG 2.1 AA compliance mandatory

### Commit Convention

Use conventional commits for clear history:
```bash
feat: add new pricing tier component
fix: resolve mobile navigation issue
docs: update deployment guide
test: add coverage for theme switching
```

## 📊 Performance Monitoring (Hackathon Mode)

### Lighthouse CI (Disabled for Hackathon)
- Performance monitoring disabled for faster deployments
- Can be enabled later for production optimization
- Accessibility compliance verification
- SEO optimization monitoring

### Bundle Analysis (Disabled for Hackathon)
- Bundle analysis disabled for faster builds
- Dependency analysis and optimization
- Code splitting effectiveness tracking

### Error Monitoring
- Runtime error tracking (when enabled)
- Performance regression detection
- User experience monitoring

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or helping with translations, your contributions are valued.

### Quick Start for Contributors

1. **Fork the repository** and clone your fork
2. **Install dependencies**: `npm ci`
3. **Create a feature branch**: `git checkout -b feature/amazing-feature`
4. **Make your changes** following our [coding standards](CONTRIBUTING.md#coding-standards)
5. **Run tests**: `npm run ci:quality`
6. **Submit a pull request** with a clear description

### Ways to Contribute

- 🐛 **Report bugs** or suggest features via [GitHub Issues](https://github.com/liftfire/marketing-website/issues)
- 💻 **Submit code** improvements or new features
- 📖 **Improve documentation** or write tutorials
- 🌍 **Add translations** for new languages
- 🎨 **Enhance UI/UX** design and accessibility
- 🧪 **Write tests** to improve coverage

See our [Contributing Guide](CONTRIBUTING.md) for detailed information and [Contributors](CONTRIBUTORS.md) for recognition.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[React Team](https://reactjs.org/)** for the amazing framework
- **[Tailwind CSS](https://tailwindcss.com/)** for the utility-first CSS framework
- **[Vite](https://vitejs.dev/)** for the lightning-fast build tool
- **[Netlify](https://netlify.com/)** for seamless deployment and hosting
- **Open Source Community** for the incredible ecosystem of tools and libraries

## 📞 Support & Community

- 🌐 **Website**: [liftfire.app](https://liftfire.app)
- 💬 **Discord**: [discord.gg/liftfire](https://discord.gg/liftfire)
- 🐙 **GitHub**: [github.com/liftfire](https://github.com/liftfire)
- 🐦 **Twitter**: [@LiftFireApp](https://twitter.com/LiftFireApp)
- 📧 **Email**: [contact@liftfire.app](mailto:contact@liftfire.app)

## 🔗 Related Projects

- **[LiftFire App](https://github.com/liftfire/app)** - The main PWA application
- **[LiftFire API](https://github.com/liftfire/api)** - Backend API and services
- **[LiftFire Design System](https://github.com/liftfire/design-system)** - Shared UI components

---

<div align="center">

**Made with ❤️ by the LiftFire Team**

[⭐ Star this repo](https://github.com/liftfire/marketing-website) • [🍴 Fork it](https://github.com/liftfire/marketing-website/fork) • [📢 Share it](https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20marketing%20website%20for%20LiftFire!&url=https://github.com/liftfire/marketing-website)

</div>