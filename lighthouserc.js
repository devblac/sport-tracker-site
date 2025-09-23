module.exports = {
  ci: {
    collect: {
      // URLs to audit
      url: [
        'http://localhost:3000',
        'http://localhost:3000/features',
        'http://localhost:3000/pricing',
        'http://localhost:3000/roadmap',
        'http://localhost:3000/es',
        'http://localhost:3000/es/features'
      ],
      // Lighthouse settings
      settings: {
        chromeFlags: '--no-sandbox --headless',
        preset: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        skipAudits: ['uses-http2'] // Skip HTTP/2 audit for local testing
      },
      numberOfRuns: 3 // Run multiple times for more accurate results
    },
    assert: {
      // Performance thresholds
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        
        // Core Web Vitals thresholds
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        
        // Resource optimization
        'unused-css-rules': ['warn', { maxLength: 0 }],
        'unused-javascript': ['warn', { maxLength: 0 }],
        'modern-image-formats': ['error', { maxLength: 0 }],
        'offscreen-images': ['warn', { maxLength: 0 }],
        
        // Accessibility requirements
        'color-contrast': ['error', { maxLength: 0 }],
        'heading-order': ['error', { maxLength: 0 }],
        'link-name': ['error', { maxLength: 0 }],
        'button-name': ['error', { maxLength: 0 }],
        
        // SEO requirements
        'meta-description': ['error', { maxLength: 0 }],
        'document-title': ['error', { maxLength: 0 }],
        'hreflang': ['warn', { maxLength: 0 }],
        'canonical': ['warn', { maxLength: 0 }]
      }
    },
    upload: {
      // Upload results to Lighthouse CI server if configured
      target: 'temporary-public-storage',
      // Uncomment and configure if using LHCI server
      // serverBaseUrl: process.env.LHCI_SERVER_BASE_URL,
      // token: process.env.LHCI_SERVER_TOKEN
    },
    server: {
      // Local server configuration for testing
      port: 9001,
      storage: {
        storageMethod: 'sql',
        sqlDialect: 'sqlite',
        sqlDatabasePath: './lhci.db'
      }
    }
  }
};