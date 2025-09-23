/**
 * Production monitoring and error reporting utilities
 */

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  userId?: string;
  sessionId: string;
  buildVersion: string;
  environment: string;
}

interface PerformanceMetrics {
  url: string;
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
  timestamp: string;
  userAgent: string;
  connection?: string;
}

class MonitoringService {
  private sessionId: string;
  private isEnabled: boolean;
  private environment: string;
  private buildVersion: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.environment = import.meta.env.VITE_APP_ENV || 'development';
    this.buildVersion = __APP_VERSION__ || '1.0.0';
    this.isEnabled =
      this.environment === 'production' &&
      import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true';

    if (this.isEnabled) {
      this.initializeErrorReporting();
      this.initializePerformanceMonitoring();
    }
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeErrorReporting(): void {
    // Global error handler
    window.addEventListener('error', event => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        buildVersion: this.buildVersion,
        environment: this.environment,
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', event => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        buildVersion: this.buildVersion,
        environment: this.environment,
      });
    });
  }

  private initializePerformanceMonitoring(): void {
    // Wait for page load to collect metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.collectPerformanceMetrics();
      }, 1000);
    });

    // Collect Core Web Vitals
    this.collectWebVitals();
  }

  private async reportError(error: ErrorReport): Promise<void> {
    if (!this.isEnabled) return;

    try {
      // In a real implementation, you would send this to your error reporting service
      // For now, we'll log it and could send to a service like Sentry, LogRocket, etc.
      console.error('Error reported:', error);

      // Example: Send to error reporting service
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(error),
      // });

      // Store locally for debugging
      this.storeErrorLocally(error);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }

  private collectPerformanceMetrics(): void {
    if (!this.isEnabled || !('performance' in window)) return;

    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');

    const metrics: PerformanceMetrics = {
      url: window.location.href,
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      connection: (navigator as any).connection?.effectiveType || 'unknown',
    };

    // Add paint metrics
    paint.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        metrics.firstContentfulPaint = entry.startTime;
      }
    });

    this.reportPerformanceMetrics(metrics);
  }

  private collectWebVitals(): void {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          this.reportWebVital('LCP', lastEntry.startTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // PerformanceObserver not supported
      }

      // First Input Delay
      try {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            this.reportWebVital(
              'FID',
              (entry as any).processingStart - entry.startTime
            );
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // PerformanceObserver not supported
      }

      // Cumulative Layout Shift
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          });
          this.reportWebVital('CLS', clsValue);
        });
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // PerformanceObserver not supported
      }
    }
  }

  private async reportPerformanceMetrics(
    metrics: PerformanceMetrics
  ): Promise<void> {
    if (!this.isEnabled) return;

    try {
      console.log('Performance metrics:', metrics);

      // Example: Send to analytics service
      // await fetch('/api/performance', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(metrics),
      // });

      // Store locally for debugging
      this.storeMetricsLocally(metrics);
    } catch (error) {
      console.error('Failed to report performance metrics:', error);
    }
  }

  private reportWebVital(name: string, value: number): void {
    console.log(`Web Vital - ${name}:`, value);

    // Store web vitals
    const webVitals = JSON.parse(
      localStorage.getItem('liftfire_web_vitals') || '{}'
    );
    webVitals[name] = {
      value,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };
    localStorage.setItem('liftfire_web_vitals', JSON.stringify(webVitals));
  }

  private storeErrorLocally(error: ErrorReport): void {
    try {
      const errors = JSON.parse(
        localStorage.getItem('liftfire_errors') || '[]'
      );
      errors.push(error);

      // Keep only last 10 errors
      if (errors.length > 10) {
        errors.splice(0, errors.length - 10);
      }

      localStorage.setItem('liftfire_errors', JSON.stringify(errors));
    } catch (e) {
      // localStorage might be full or unavailable
    }
  }

  private storeMetricsLocally(metrics: PerformanceMetrics): void {
    try {
      const allMetrics = JSON.parse(
        localStorage.getItem('liftfire_performance') || '[]'
      );
      allMetrics.push(metrics);

      // Keep only last 5 performance reports
      if (allMetrics.length > 5) {
        allMetrics.splice(0, allMetrics.length - 5);
      }

      localStorage.setItem('liftfire_performance', JSON.stringify(allMetrics));
    } catch (e) {
      // localStorage might be full or unavailable
    }
  }

  // Public methods for manual reporting
  public reportCustomError(
    message: string,
    context?: Record<string, any>
  ): void {
    this.reportError({
      message: `Custom Error: ${message}`,
      stack: new Error().stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      buildVersion: this.buildVersion,
      environment: this.environment,
      ...context,
    });
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public isMonitoringEnabled(): boolean {
    return this.isEnabled;
  }
}

// Create singleton instance
export const monitoring = new MonitoringService();

// Export types for external use
export type { ErrorReport, PerformanceMetrics };
