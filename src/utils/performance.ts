// Performance monitoring utilities

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observer?: PerformanceObserver;

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // Observe paint metrics
    if ('PerformanceObserver' in window) {
      try {
        // FCP and LCP
        this.observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint') {
              if (entry.name === 'first-contentful-paint') {
                this.metrics.fcp = entry.startTime;
              }
            } else if (entry.entryType === 'largest-contentful-paint') {
              this.metrics.lcp = entry.startTime;
            } else if (entry.entryType === 'first-input') {
              this.metrics.fid =
                (entry as any).processingStart - entry.startTime;
            } else if (entry.entryType === 'layout-shift') {
              if (!(entry as any).hadRecentInput) {
                this.metrics.cls =
                  (this.metrics.cls || 0) + (entry as any).value;
              }
            }
          }
        });

        this.observer.observe({
          entryTypes: [
            'paint',
            'largest-contentful-paint',
            'first-input',
            'layout-shift',
          ],
        });
      } catch (error) {
        console.warn('Performance Observer not supported:', error);
      }
    }

    // TTFB from Navigation Timing
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType(
        'navigation'
      ) as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const navigation = navigationEntries[0];
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
      }
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public logMetrics(): void {
    console.group('🚀 Performance Metrics');
    console.log(
      'First Contentful Paint (FCP):',
      this.metrics.fcp ? `${this.metrics.fcp.toFixed(2)}ms` : 'Not available'
    );
    console.log(
      'Largest Contentful Paint (LCP):',
      this.metrics.lcp ? `${this.metrics.lcp.toFixed(2)}ms` : 'Not available'
    );
    console.log(
      'First Input Delay (FID):',
      this.metrics.fid ? `${this.metrics.fid.toFixed(2)}ms` : 'Not available'
    );
    console.log(
      'Cumulative Layout Shift (CLS):',
      this.metrics.cls ? this.metrics.cls.toFixed(4) : 'Not available'
    );
    console.log(
      'Time to First Byte (TTFB):',
      this.metrics.ttfb ? `${this.metrics.ttfb.toFixed(2)}ms` : 'Not available'
    );
    console.groupEnd();
  }

  public dispose(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Utility functions for performance optimization
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(preloadImage));
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Resource hints for performance
export const addResourceHint = (
  href: string,
  rel: 'preload' | 'prefetch' | 'preconnect',
  as?: string
): void => {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  if (as) link.setAttribute('as', as);
  document.head.appendChild(link);
};

// Critical resource preloading
export const preloadCriticalResources = (): void => {
  // Preconnect to external domains
  addResourceHint('https://fonts.googleapis.com', 'preconnect');
  addResourceHint('https://fonts.gstatic.com', 'preconnect');

  // Preload critical fonts (if using web fonts)
  // addResourceHint('/fonts/inter-var.woff2', 'preload', 'font');
};

// Initialize performance monitoring
let performanceMonitor: PerformanceMonitor | null = null;

export const initializePerformanceMonitoring = (): PerformanceMonitor => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();

    // Log metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        performanceMonitor?.logMetrics();
      }, 1000);
    });
  }

  return performanceMonitor;
};

export const getPerformanceMonitor = (): PerformanceMonitor | null => {
  return performanceMonitor;
};
