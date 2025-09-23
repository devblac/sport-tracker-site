# Troubleshooting Guide

This guide helps you resolve common issues when developing, building, or deploying the LiftFire Marketing Website.

## 🚨 Common Issues

### Development Server Issues

#### Port Already in Use
```bash
Error: Port 5173 is already in use
```

**Solutions:**
```bash
# Find and kill process using port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000

# Or set port in environment
PORT=3000 npm run dev
```

#### Module Resolution Errors
```bash
Error: Cannot resolve module './Component'
```

**Solutions:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm ci

# Clear Vite cache
rm -rf node_modules/.vite

# Restart with clean cache
npm run dev -- --force
```

#### Hot Reload Not Working
```bash
# Changes not reflecting in browser
```

**Solutions:**
```bash
# Check file watching limits (Linux/macOS)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Restart development server
npm run dev -- --force

# Check browser cache (hard refresh)
Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (macOS)
```

### Build Issues

#### TypeScript Compilation Errors
```bash
Error: Type 'string' is not assignable to type 'number'
```

**Solutions:**
```bash
# Run type checking to see all errors
npm run type-check

# Fix type errors in your code
# Example: Ensure proper typing
interface Props {
  count: number; // Not string
}

# Check tsconfig.json for strict settings
```

#### ESLint Errors
```bash
Error: 'React' must be in scope when using JSX
```

**Solutions:**
```bash
# Auto-fix ESLint issues
npm run lint:fix

# Common fixes:
# 1. Import React in JSX files
import React from 'react';

# 2. Use proper TypeScript types
import type { FC } from 'react';

# 3. Follow naming conventions
const MyComponent: FC = () => { ... };
```

#### Build Size Too Large
```bash
Warning: Bundle size exceeds recommended limit
```

**Solutions:**
```bash
# Analyze bundle size
npm run build:analyze

# Common optimizations:
# 1. Implement code splitting
const LazyComponent = lazy(() => import('./Component'));

# 2. Remove unused dependencies
npx depcheck

# 3. Optimize images
# Use WebP format and proper sizing

# 4. Tree shake unused code
# Import only what you need
import { specific } from 'library';
```

### Testing Issues

#### Tests Failing After Changes
```bash
Error: Test suite failed to run
```

**Solutions:**
```bash
# Run tests with verbose output
npm run test -- --verbose

# Update snapshots if UI changed
npm run test -- --update-snapshots

# Clear test cache
npm run test -- --clear-cache

# Run specific test file
npm run test -- Button.test.tsx
```

#### Mock Issues
```bash
Error: Cannot find module in test
```

**Solutions:**
```bash
# Check test setup in src/test/setup.ts
# Ensure mocks are properly configured

# For i18n issues:
# Check src/test/i18n-setup.ts

# For component testing:
# Wrap components in test providers
render(
  <ThemeProvider>
    <LanguageProvider>
      <Component />
    </LanguageProvider>
  </ThemeProvider>
);
```

#### Coverage Issues
```bash
Error: Coverage threshold not met
```

**Solutions:**
```bash
# Check coverage report
npm run test:coverage

# Add tests for uncovered code
# Focus on:
# - Component interactions
# - Error handling
# - Edge cases

# Update coverage thresholds if needed
# In vitest.config.ts
```

### Internationalization Issues

#### Translations Not Loading
```bash
Error: Translation key not found
```

**Solutions:**
```bash
# Check translation files exist
ls public/locales/en/
ls public/locales/es/

# Verify JSON syntax
npx jsonlint public/locales/en/common.json

# Check i18n configuration
# In src/i18n/config.ts

# Restart development server
npm run dev
```

#### Language Switching Not Working
```bash
# URL changes but content doesn't update
```

**Solutions:**
```bash
# Check LanguageContext implementation
# Verify useLanguage hook usage

# Check URL routing configuration
# In src/contexts/LanguageContext.tsx

# Clear localStorage
localStorage.removeItem('i18nextLng');

# Test in incognito mode
```

#### Missing Translations
```bash
Warning: Translation key 'key' not found
```

**Solutions:**
```bash
# Add missing keys to translation files
# public/locales/[lang]/[namespace].json

# Use fallback namespace
# Check fallbackNS in i18n config

# Implement translation validation
npm run test -- i18n
```

### Styling Issues

#### Tailwind Classes Not Working
```bash
# Styles not applying in browser
```

**Solutions:**
```bash
# Check Tailwind configuration
# tailwind.config.js

# Verify content paths include your files
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]

# Restart development server
npm run dev

# Check for typos in class names
# Use Tailwind CSS IntelliSense extension
```

#### Dark Mode Not Working
```bash
# Theme toggle not switching styles
```

**Solutions:**
```bash
# Check ThemeContext implementation
# Verify dark: prefixes in classes

# Check CSS custom properties
# In src/styles/globals.css

# Test theme persistence
# Check localStorage for theme preference

# Verify theme provider wraps app
# In src/main.tsx
```

#### Responsive Design Issues
```bash
# Layout breaks on mobile/tablet
```

**Solutions:**
```bash
# Test different screen sizes
# Use browser dev tools

# Check responsive breakpoints
# sm: 640px, md: 768px, lg: 1024px, xl: 1280px

# Use mobile-first approach
# Base styles for mobile, then larger screens

# Test on real devices
# Use browser device emulation
```

### Performance Issues

#### Slow Development Server
```bash
# Dev server takes long to start/reload
```

**Solutions:**
```bash
# Clear all caches
rm -rf node_modules/.vite
rm -rf node_modules/.cache

# Update dependencies
npm update

# Check system resources
# Close unnecessary applications

# Use faster disk (SSD recommended)
```

#### Poor Lighthouse Scores
```bash
# Performance/Accessibility scores below threshold
```

**Solutions:**
```bash
# Run Lighthouse locally
npm run lighthouse

# Common fixes:
# 1. Optimize images
#    - Use WebP format
#    - Proper sizing
#    - Lazy loading

# 2. Reduce bundle size
#    - Code splitting
#    - Tree shaking
#    - Remove unused dependencies

# 3. Improve accessibility
#    - Alt text for images
#    - Proper heading hierarchy
#    - Keyboard navigation

# 4. SEO optimization
#    - Meta tags
#    - Structured data
#    - Semantic HTML
```

### Deployment Issues

#### GitHub Actions Failing
```bash
Error: Build failed in CI/CD pipeline
```

**Solutions:**
```bash
# Check GitHub Actions logs
# Look for specific error messages

# Common issues:
# 1. Environment variables missing
#    - Check repository secrets
#    - Verify variable names

# 2. Node version mismatch
#    - Ensure Node 18+ in workflow

# 3. Test failures
#    - Run tests locally first
#    - Fix failing tests

# 4. Build errors
#    - Run npm run build locally
#    - Fix TypeScript/ESLint errors
```

#### Netlify Deployment Failing
```bash
Error: Deploy failed
```

**Solutions:**
```bash
# Check Netlify deploy logs
# Look for build errors

# Common fixes:
# 1. Build command issues
#    - Verify netlify.toml configuration
#    - Check build scripts in package.json

# 2. Environment variables
#    - Set in Netlify dashboard
#    - Match variable names exactly

# 3. File path issues
#    - Check publish directory (dist)
#    - Verify file case sensitivity

# 4. Dependency issues
#    - Use npm ci instead of npm install
#    - Lock Node version in netlify.toml
```

#### SSL/HTTPS Issues
```bash
Error: Mixed content warnings
```

**Solutions:**
```bash
# Ensure all resources use HTTPS
# Check external links and assets

# Update Netlify configuration
# Force HTTPS redirects

# Check CSP headers
# In netlify.toml headers section

# Verify custom domain SSL
# In Netlify domain settings
```

### Browser Compatibility Issues

#### Internet Explorer Support
```bash
# Site not working in older browsers
```

**Solutions:**
```bash
# Check browser support targets
# In package.json browserslist

# Add polyfills if needed
# For older browser support

# Test in different browsers
# Chrome, Firefox, Safari, Edge

# Use progressive enhancement
# Ensure basic functionality works everywhere
```

#### Safari-Specific Issues
```bash
# Features working in Chrome but not Safari
```

**Solutions:**
```bash
# Check Safari-specific CSS issues
# Test flexbox, grid, custom properties

# Verify JavaScript compatibility
# Use supported ES features

# Test on actual Safari
# Not just Chrome dev tools

# Check iOS Safari separately
# Mobile Safari has different behavior
```

## 🔧 Debugging Tools

### Development Tools

#### Browser DevTools
```bash
# Chrome DevTools shortcuts
F12 - Open DevTools
Ctrl+Shift+C - Inspect element
Ctrl+Shift+I - Toggle DevTools
Ctrl+Shift+J - Console
Ctrl+Shift+P - Command palette
```

#### VS Code Debugging
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/vite",
      "args": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

#### Network Debugging
```bash
# Check network requests
# Browser DevTools > Network tab

# Common issues:
# - 404 errors for assets
# - CORS issues
# - Slow loading resources
# - Failed API calls
```

### Performance Debugging

#### Bundle Analysis
```bash
# Analyze bundle size
npm run build:analyze

# Check for:
# - Large dependencies
# - Duplicate code
# - Unused imports
# - Missing code splitting
```

#### Memory Leaks
```bash
# Chrome DevTools > Memory tab
# Look for:
# - Growing heap size
# - Detached DOM nodes
# - Event listener leaks
# - Unclosed subscriptions
```

#### Performance Profiling
```bash
# Chrome DevTools > Performance tab
# Record and analyze:
# - JavaScript execution time
# - Rendering performance
# - Layout thrashing
# - Paint operations
```

## 📞 Getting Help

### Before Asking for Help

1. **Search existing issues** on GitHub
2. **Check documentation** in docs/ folder
3. **Try debugging steps** in this guide
4. **Create minimal reproduction** of the issue
5. **Gather environment information**

### Information to Include

When reporting issues, include:

```bash
# System information
OS: [macOS 12.0 / Windows 11 / Ubuntu 20.04]
Node.js: [18.17.0]
npm: [9.6.7]
Browser: [Chrome 96.0.4664.110]

# Project information
Branch: [main / develop / feature-name]
Last working commit: [commit-hash]
Recent changes: [description]

# Error information
Error message: [full error text]
Stack trace: [if available]
Console errors: [browser console errors]
Network errors: [failed requests]

# Steps to reproduce
1. Step one
2. Step two
3. Expected vs actual behavior
```

### Support Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general help
- **Discord**: Real-time community support
- **Email**: Direct contact for urgent issues

### Response Times

- **Critical bugs**: Within 24 hours
- **Build/deployment issues**: Within 48 hours
- **General questions**: Within 1 week
- **Feature requests**: Within 2 weeks

## 🚀 Prevention Tips

### Best Practices

1. **Regular updates**: Keep dependencies updated
2. **Code quality**: Run linting and tests before commits
3. **Documentation**: Keep docs updated with changes
4. **Testing**: Write tests for new features
5. **Performance**: Monitor bundle size and performance
6. **Accessibility**: Test with screen readers and keyboard
7. **Cross-browser**: Test in multiple browsers
8. **Mobile**: Test responsive design on real devices

### Automated Checks

```bash
# Pre-commit hooks (recommended)
# Install husky and lint-staged
npm install --save-dev husky lint-staged

# Add to package.json
"lint-staged": {
  "*.{ts,tsx}": ["npm run lint:fix", "npm run test:related"],
  "*.{ts,tsx,json,css,md}": ["npm run format"]
}
```

### Monitoring

- **GitHub Actions**: Automated CI/CD checks
- **Lighthouse CI**: Performance monitoring
- **Dependabot**: Security and dependency updates
- **Bundle size**: Automated bundle analysis

Remember: Most issues have been encountered before. Search existing solutions first, and don't hesitate to ask for help when needed! 🤝