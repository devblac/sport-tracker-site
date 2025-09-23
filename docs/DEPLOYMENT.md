# Deployment Guide

This document outlines the deployment setup and CI/CD pipeline for the LiftFire Marketing Website.

## Overview

The project uses GitHub Actions for continuous integration and deployment to Netlify. The pipeline includes:

- Code quality checks (TypeScript, ESLint, Prettier)
- Automated testing with coverage reports
- Build optimization and asset compression
- Lighthouse CI for performance monitoring
- Automated deployment to Netlify
- Slack notifications for deployment status

## Required Secrets

Configure the following secrets in your GitHub repository settings:

### Netlify Configuration
```
NETLIFY_SITE_ID=your-netlify-site-id
NETLIFY_PREVIEW_SITE_ID=your-preview-site-id
NETLIFY_AUTH_TOKEN=your-netlify-auth-token
```

### Lighthouse CI (Optional)
```
LHCI_GITHUB_APP_TOKEN=your-lighthouse-github-app-token
LHCI_SERVER_BASE_URL=your-lighthouse-server-url
```

### Slack Notifications (Optional)
```
SLACK_WEBHOOK_URL=your-slack-webhook-url
```

### Code Coverage (Optional)
```
CODECOV_TOKEN=your-codecov-token
```

## Netlify Setup

### 1. Create Netlify Sites

1. **Production Site**: Connect your `main` branch
   - Site name: `liftfire-app`
   - Custom domain: `liftfire.app`
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Preview Site**: Connect your `develop` branch
   - Site name: `liftfire-preview`
   - Domain: `develop--liftfire.netlify.app`
   - Build command: `npm run build`
   - Publish directory: `dist`

### 2. Environment Variables

Set the following environment variables in Netlify:

```
NODE_VERSION=18
NODE_ENV=production
VITE_APP_ENV=production
```

### 3. Build Settings

The `netlify.toml` file configures:
- Build optimization
- Security headers
- Caching strategies
- Redirects for internationalization
- Plugin configuration

## GitHub Actions Workflows

### Main Deployment Workflow (`.github/workflows/deploy.yml`)

Triggers on:
- Push to `main` branch (production deployment)
- Push to `develop` branch (preview deployment)

Jobs:
1. **Quality Check**: TypeScript, ESLint, Prettier, Tests
2. **Build & Deploy**: Build optimization, Netlify deployment
3. **Lighthouse CI**: Performance monitoring
4. **Notifications**: Slack alerts for deployment status

### Pull Request Workflow (`.github/workflows/pr-check.yml`)

Triggers on:
- Pull requests to `main` or `develop` branches

Jobs:
1. **Quality Check**: Code quality and testing
2. **Build Verification**: Ensure the application builds successfully
3. **PR Comments**: Automated feedback on pull requests

## Performance Monitoring

### Lighthouse CI Configuration

The `lighthouserc.js` file defines:
- Performance thresholds (90+ scores required)
- Core Web Vitals limits
- Accessibility compliance checks
- SEO optimization verification

### Thresholds
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 90+

### Core Web Vitals
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 300ms

## Build Optimization

### Asset Optimization
- Image compression with imagemin
- Gzip compression for text assets
- Bundle analysis and size monitoring
- Tree shaking and code splitting

### Caching Strategy
- Static assets: 1 year cache
- HTML files: No cache (always fresh)
- API responses: No cache
- Fonts: 1 year cache with CORS headers

## Deployment Process

### Production Deployment
1. Push to `main` branch
2. GitHub Actions triggers deployment workflow
3. Quality checks run (TypeScript, ESLint, tests)
4. Application builds with optimizations
5. Assets are compressed and optimized
6. Deployment to Netlify production site
7. Lighthouse CI runs performance audit
8. Slack notification sent with results

### Preview Deployment
1. Push to `develop` branch
2. Same process as production but deploys to preview site
3. Useful for testing features before production

### Pull Request Checks
1. Create pull request to `main` or `develop`
2. Quality checks run automatically
3. Build verification ensures no breaking changes
4. Automated comment added to PR with results

## Monitoring and Alerts

### Deployment Notifications
- ✅ Success: Deployment URL and Lighthouse results
- ❌ Failure: Error details and logs link
- ⚠️ Performance: Lighthouse threshold failures

### Performance Alerts
- Automatic alerts when Lighthouse scores drop below thresholds
- Bundle size monitoring and alerts
- Core Web Vitals tracking

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors: `npm run type-check`
   - Verify ESLint issues: `npm run lint`
   - Test locally: `npm run build`

2. **Deployment Failures**
   - Verify Netlify secrets are configured
   - Check build logs in GitHub Actions
   - Ensure `netlify.toml` is properly configured

3. **Lighthouse Failures**
   - Run locally: `npm run lighthouse`
   - Check performance optimizations
   - Verify accessibility compliance

4. **Test Failures**
   - Run tests locally: `npm run test:coverage`
   - Check for breaking changes
   - Update snapshots if needed

### Local Development

```bash
# Install dependencies
npm ci

# Run quality checks
npm run ci:quality

# Build and analyze
npm run ci:build

# Run Lighthouse locally
npm run lighthouse
```

## Security Considerations

### Headers Configuration
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: Restricted camera, microphone, geolocation

### Environment Variables
- Never commit secrets to repository
- Use GitHub Secrets for sensitive data
- Separate production and preview configurations

## Performance Best Practices

### Build Optimization
- Code splitting by route and component
- Tree shaking to eliminate unused code
- Asset compression and optimization
- Bundle size monitoring

### Runtime Performance
- Lazy loading for images and components
- Service worker for caching
- Preloading critical resources
- Optimized font loading

### Monitoring
- Lighthouse CI for continuous performance monitoring
- Core Web Vitals tracking
- Bundle size analysis
- Coverage reporting

This deployment setup ensures reliable, performant, and secure deployments while maintaining high code quality standards.