/**
 * Production environment health check utilities
 */

interface HealthCheckResult {
  status: 'healthy' | 'warning' | 'error';
  checks: {
    [key: string]: {
      status: 'pass' | 'fail' | 'warn';
      message: string;
      value?: any;
      timestamp: string;
    };
  };
  environment: string;
  buildVersion: string;
  timestamp: string;
}

interface SystemInfo {
  userAgent: string;
  language: string;
  platform: string;
  cookiesEnabled: boolean;
  localStorageAvailable: boolean;
  sessionStorageAvailable: boolean;
  onlineStatus: boolean;
  screenResolution: string;
  colorDepth: number;
  timezone: string;
  connection?: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  };
}

class HealthCheckService {
  private environment: string;
  private buildVersion: string;

  constructor() {
    this.environment = import.meta.env.VITE_APP_ENV || 'development';
    this.buildVersion = __APP_VERSION__ || '1.0.0';
  }

  public async performHealthCheck(): Promise<HealthCheckResult> {
    const timestamp = new Date().toISOString();
    const checks: HealthCheckResult['checks'] = {};

    // Check environment configuration
    checks.environment = this.checkEnvironment();

    // Check browser compatibility
    checks.browserCompatibility = this.checkBrowserCompatibility();

    // Check local storage
    checks.localStorage = this.checkLocalStorage();

    // Check session storage
    checks.sessionStorage = this.checkSessionStorage();

    // Check network connectivity
    checks.networkConnectivity = this.checkNetworkConnectivity();

    // Check JavaScript features
    checks.jsFeatures = this.checkJavaScriptFeatures();

    // Check CSS features
    checks.cssFeatures = this.checkCSSFeatures();

    // Check performance API
    checks.performanceAPI = this.checkPerformanceAPI();

    // Check internationalization
    checks.internationalization = this.checkInternationalization();

    // Check theme support
    checks.themeSupport = this.checkThemeSupport();

    // Determine overall status
    const failedChecks = Object.values(checks).filter(
      check => check.status === 'fail'
    );
    const warningChecks = Object.values(checks).filter(
      check => check.status === 'warn'
    );

    let status: HealthCheckResult['status'] = 'healthy';
    if (failedChecks.length > 0) {
      status = 'error';
    } else if (warningChecks.length > 0) {
      status = 'warning';
    }

    return {
      status,
      checks,
      environment: this.environment,
      buildVersion: this.buildVersion,
      timestamp,
    };
  }

  private checkEnvironment() {
    const timestamp = new Date().toISOString();

    try {
      const requiredEnvVars = [
        'VITE_APP_ENV',
        'VITE_DEFAULT_LANGUAGE',
        'VITE_SUPPORTED_LANGUAGES',
      ];

      const missingVars = requiredEnvVars.filter(
        varName => !import.meta.env[varName]
      );

      if (missingVars.length > 0) {
        return {
          status: 'warn' as const,
          message: `Missing environment variables: ${missingVars.join(', ')}`,
          value: { missing: missingVars },
          timestamp,
        };
      }

      return {
        status: 'pass' as const,
        message: 'Environment configuration is valid',
        value: { environment: this.environment },
        timestamp,
      };
    } catch (error) {
      return {
        status: 'fail' as const,
        message: `Environment check failed: ${error}`,
        timestamp,
      };
    }
  }

  private checkBrowserCompatibility() {
    const timestamp = new Date().toISOString();

    try {
      const requiredFeatures = {
        'ES6 Classes': () => typeof class {} === 'function',
        'Arrow Functions': () => (() => true)(),
        'Template Literals': () => `test` === 'test',
        Destructuring: () => {
          const [a] = [1];
          return a === 1;
        },
        'Async/Await': () => typeof (async () => {})().then === 'function',
        'Fetch API': () => typeof fetch === 'function',
        Promise: () => typeof Promise === 'function',
        Map: () => typeof Map === 'function',
        Set: () => typeof Set === 'function',
        WeakMap: () => typeof WeakMap === 'function',
        Symbol: () => typeof Symbol === 'function',
      };

      const unsupportedFeatures = Object.entries(requiredFeatures)
        .filter(([, test]) => {
          try {
            return !test();
          } catch {
            return true;
          }
        })
        .map(([name]) => name);

      if (unsupportedFeatures.length > 0) {
        return {
          status: 'fail' as const,
          message: `Browser missing required features: ${unsupportedFeatures.join(', ')}`,
          value: { unsupported: unsupportedFeatures },
          timestamp,
        };
      }

      return {
        status: 'pass' as const,
        message: 'Browser compatibility check passed',
        value: { userAgent: navigator.userAgent },
        timestamp,
      };
    } catch (error) {
      return {
        status: 'fail' as const,
        message: `Browser compatibility check failed: ${error}`,
        timestamp,
      };
    }
  }

  private checkLocalStorage() {
    const timestamp = new Date().toISOString();

    try {
      const testKey = 'liftfire_health_check';
      const testValue = 'test';

      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);

      if (retrieved !== testValue) {
        return {
          status: 'fail' as const,
          message: 'localStorage is not working correctly',
          timestamp,
        };
      }

      return {
        status: 'pass' as const,
        message: 'localStorage is working correctly',
        timestamp,
      };
    } catch (error) {
      return {
        status: 'fail' as const,
        message: `localStorage check failed: ${error}`,
        timestamp,
      };
    }
  }

  private checkSessionStorage() {
    const timestamp = new Date().toISOString();

    try {
      const testKey = 'liftfire_session_health_check';
      const testValue = 'test';

      sessionStorage.setItem(testKey, testValue);
      const retrieved = sessionStorage.getItem(testKey);
      sessionStorage.removeItem(testKey);

      if (retrieved !== testValue) {
        return {
          status: 'fail' as const,
          message: 'sessionStorage is not working correctly',
          timestamp,
        };
      }

      return {
        status: 'pass' as const,
        message: 'sessionStorage is working correctly',
        timestamp,
      };
    } catch (error) {
      return {
        status: 'fail' as const,
        message: `sessionStorage check failed: ${error}`,
        timestamp,
      };
    }
  }

  private checkNetworkConnectivity() {
    const timestamp = new Date().toISOString();

    try {
      const isOnline = navigator.onLine;
      const connection = (navigator as any).connection;

      if (!isOnline) {
        return {
          status: 'warn' as const,
          message: 'Device appears to be offline',
          value: { online: false },
          timestamp,
        };
      }

      return {
        status: 'pass' as const,
        message: 'Network connectivity is available',
        value: {
          online: true,
          connection: connection
            ? {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
              }
            : null,
        },
        timestamp,
      };
    } catch (error) {
      return {
        status: 'warn' as const,
        message: `Network connectivity check failed: ${error}`,
        timestamp,
      };
    }
  }

  private checkJavaScriptFeatures() {
    const timestamp = new Date().toISOString();

    try {
      const features = {
        'Intersection Observer': 'IntersectionObserver' in window,
        'Resize Observer': 'ResizeObserver' in window,
        'Performance Observer': 'PerformanceObserver' in window,
        'Web Workers': 'Worker' in window,
        'Service Workers': 'serviceWorker' in navigator,
        Geolocation: 'geolocation' in navigator,
        'Device Motion': 'DeviceMotionEvent' in window,
        'Touch Events': 'ontouchstart' in window,
      };

      const unsupportedFeatures = Object.entries(features)
        .filter(([, supported]) => !supported)
        .map(([name]) => name);

      if (unsupportedFeatures.length > 3) {
        return {
          status: 'warn' as const,
          message: `Some JavaScript features not supported: ${unsupportedFeatures.join(', ')}`,
          value: { unsupported: unsupportedFeatures },
          timestamp,
        };
      }

      return {
        status: 'pass' as const,
        message: 'JavaScript features check passed',
        value: {
          supported: Object.keys(features).filter(
            name => features[name as keyof typeof features]
          ),
        },
        timestamp,
      };
    } catch (error) {
      return {
        status: 'fail' as const,
        message: `JavaScript features check failed: ${error}`,
        timestamp,
      };
    }
  }

  private checkCSSFeatures() {
    const timestamp = new Date().toISOString();

    try {
      const features = {
        'CSS Grid': CSS.supports('display', 'grid'),
        'CSS Flexbox': CSS.supports('display', 'flex'),
        'CSS Custom Properties': CSS.supports('--test', 'value'),
        'CSS Transforms': CSS.supports('transform', 'translateX(1px)'),
        'CSS Transitions': CSS.supports('transition', 'all 1s'),
        'CSS Animations': CSS.supports('animation', 'test 1s'),
        'CSS Filters': CSS.supports('filter', 'blur(1px)'),
      };

      const unsupportedFeatures = Object.entries(features)
        .filter(([, supported]) => !supported)
        .map(([name]) => name);

      if (unsupportedFeatures.length > 2) {
        return {
          status: 'warn' as const,
          message: `Some CSS features not supported: ${unsupportedFeatures.join(', ')}`,
          value: { unsupported: unsupportedFeatures },
          timestamp,
        };
      }

      return {
        status: 'pass' as const,
        message: 'CSS features check passed',
        value: {
          supported: Object.keys(features).filter(
            name => features[name as keyof typeof features]
          ),
        },
        timestamp,
      };
    } catch (error) {
      return {
        status: 'warn' as const,
        message: `CSS features check failed: ${error}`,
        timestamp,
      };
    }
  }

  private checkPerformanceAPI() {
    const timestamp = new Date().toISOString();

    try {
      const hasPerformance = 'performance' in window;
      const hasNavigationTiming =
        hasPerformance && 'getEntriesByType' in performance;
      const hasResourceTiming =
        hasNavigationTiming &&
        performance.getEntriesByType('resource').length >= 0;

      if (!hasPerformance) {
        return {
          status: 'warn' as const,
          message: 'Performance API not available',
          timestamp,
        };
      }

      return {
        status: 'pass' as const,
        message: 'Performance API is available',
        value: {
          navigationTiming: hasNavigationTiming,
          resourceTiming: hasResourceTiming,
        },
        timestamp,
      };
    } catch (error) {
      return {
        status: 'warn' as const,
        message: `Performance API check failed: ${error}`,
        timestamp,
      };
    }
  }

  private checkInternationalization() {
    const timestamp = new Date().toISOString();

    try {
      const hasIntl = 'Intl' in window;
      const supportedLanguages =
        import.meta.env.VITE_SUPPORTED_LANGUAGES?.split(',') || ['en'];
      const browserLanguage = navigator.language;

      if (!hasIntl) {
        return {
          status: 'warn' as const,
          message: 'Internationalization API not available',
          timestamp,
        };
      }

      return {
        status: 'pass' as const,
        message: 'Internationalization support is available',
        value: {
          browserLanguage,
          supportedLanguages,
          intlSupport: hasIntl,
        },
        timestamp,
      };
    } catch (error) {
      return {
        status: 'warn' as const,
        message: `Internationalization check failed: ${error}`,
        timestamp,
      };
    }
  }

  private checkThemeSupport() {
    const timestamp = new Date().toISOString();

    try {
      const supportsColorScheme =
        window.matchMedia('(prefers-color-scheme: dark)').matches !== undefined;
      const supportsReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches !==
        undefined;

      return {
        status: 'pass' as const,
        message: 'Theme support check passed',
        value: {
          colorScheme: supportsColorScheme,
          reducedMotion: supportsReducedMotion,
          prefersDark: window.matchMedia('(prefers-color-scheme: dark)')
            .matches,
          prefersReducedMotion: window.matchMedia(
            '(prefers-reduced-motion: reduce)'
          ).matches,
        },
        timestamp,
      };
    } catch (error) {
      return {
        status: 'warn' as const,
        message: `Theme support check failed: ${error}`,
        timestamp,
      };
    }
  }

  public getSystemInfo(): SystemInfo {
    const connection = (navigator as any).connection;

    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      localStorageAvailable: this.isStorageAvailable('localStorage'),
      sessionStorageAvailable: this.isStorageAvailable('sessionStorage'),
      onlineStatus: navigator.onLine,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      connection: connection
        ? {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
          }
        : undefined,
    };
  }

  private isStorageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
    try {
      const storage = window[type];
      const testKey = '__storage_test__';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
}

// Create singleton instance
export const healthCheck = new HealthCheckService();

// Export types for external use
export type { HealthCheckResult, SystemInfo };
