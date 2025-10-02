/**
 * Analytics and tracking utilities for production
 */

interface AnalyticsEvent {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

interface PageView {
  page: string;
  title: string;
  referrer?: string;
  userAgent: string;
  timestamp: string;
  sessionId: string;
}

class AnalyticsService {
  private isEnabled: boolean;
  private sessionId: string;
  private environment: string;
  private userId?: string;

  constructor() {
    this.environment = import.meta.env.VITE_APP_ENV || 'development';
    this.isEnabled =
      this.environment === 'production' &&
      import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
    this.sessionId = this.generateSessionId();

    if (this.isEnabled) {
      this.initializeAnalytics();
    }
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeAnalytics(): void {
    // Initialize Google Analytics if tracking ID is provided
    const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (gaTrackingId) {
      this.initializeGoogleAnalytics(gaTrackingId);
    }

    // Initialize other analytics services
    this.initializeCustomAnalytics();
  }

  private initializeGoogleAnalytics(trackingId: string): void {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    const gtag = (...args: any[]) => {
      (window as any).dataLayer.push(args);
    };
    (window as any).gtag = gtag;

    gtag('js', new Date());
    gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        custom_parameter_1: 'session_id',
        custom_parameter_2: 'app_version',
      },
    });

    // Set custom parameters
    gtag('config', trackingId, {
      session_id: this.sessionId,
      app_version: __APP_VERSION__ || '1.0.0',
      environment: this.environment,
    });
  }

  private initializeCustomAnalytics(): void {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.trackEvent({
          name: 'page_hidden',
          category: 'engagement',
          action: 'visibility_change',
          label: window.location.pathname,
        });
      } else {
        this.trackEvent({
          name: 'page_visible',
          category: 'engagement',
          action: 'visibility_change',
          label: window.location.pathname,
        });
      }
    });

    // Track scroll depth
    this.initializeScrollTracking();

    // Track click events on important elements
    this.initializeClickTracking();
  }

  private initializeScrollTracking(): void {
    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 90, 100];
    const trackedThresholds = new Set<number>();

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      maxScroll = Math.max(maxScroll, scrollPercent);

      scrollThresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
          trackedThresholds.add(threshold);
          this.trackEvent({
            name: 'scroll_depth',
            category: 'engagement',
            action: 'scroll',
            label: `${threshold}%`,
            value: threshold,
          });
        }
      });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          trackScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  private initializeClickTracking(): void {
    // Track CTA button clicks
    document.addEventListener('click', event => {
      const target = event.target as HTMLElement;

      // Track CTA buttons
      if (
        target.matches('[data-analytics="cta"]') ||
        target.closest('[data-analytics="cta"]')
      ) {
        const button = target.closest('[data-analytics="cta"]') as HTMLElement;
        this.trackEvent({
          name: 'cta_click',
          category: 'conversion',
          action: 'click',
          label: button.textContent?.trim() || 'Unknown CTA',
          customParameters: {
            button_id: button.id,
            page: window.location.pathname,
          },
        });
      }

      // Track navigation links
      if (target.matches('a[href]') || target.closest('a[href]')) {
        const link = target.closest('a[href]') as HTMLAnchorElement;
        const isExternal = link.hostname !== window.location.hostname;

        if (isExternal) {
          this.trackEvent({
            name: 'external_link_click',
            category: 'navigation',
            action: 'click',
            label: link.href,
            customParameters: {
              link_text: link.textContent?.trim(),
              page: window.location.pathname,
            },
          });
        }
      }

      // Track feature card interactions
      if (
        target.matches('[data-analytics="feature-card"]') ||
        target.closest('[data-analytics="feature-card"]')
      ) {
        const card = target.closest(
          '[data-analytics="feature-card"]'
        ) as HTMLElement;
        this.trackEvent({
          name: 'feature_card_click',
          category: 'engagement',
          action: 'click',
          label: card.dataset.featureName || 'Unknown Feature',
          customParameters: {
            page: window.location.pathname,
          },
        });
      }
    });
  }

  // Public methods
  public trackPageView(page: string, title?: string): void {
    if (!this.isEnabled) return;

    const pageView: PageView = {
      page,
      title: title || document.title,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
    };

    // Send to Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
        page_title: pageView.title,
        page_location: window.location.href,
      });
    }

    // Send to custom analytics
    this.sendCustomAnalytics('pageview', pageView);
  }

  public trackEvent(event: AnalyticsEvent): void {
    if (!this.isEnabled) return;

    // Send to Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameter_1: this.sessionId,
        custom_parameter_2: __APP_VERSION__ || '1.0.0',
        ...event.customParameters,
      });
    }

    // Send to custom analytics
    this.sendCustomAnalytics('event', {
      ...event,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    });
  }

  public trackConversion(conversionName: string, value?: number): void {
    this.trackEvent({
      name: 'conversion',
      category: 'conversion',
      action: conversionName,
      value,
      customParameters: {
        conversion_name: conversionName,
      },
    });
  }

  public trackError(
    errorMessage: string,
    errorType: string = 'javascript'
  ): void {
    this.trackEvent({
      name: 'error',
      category: 'error',
      action: errorType,
      label: errorMessage,
      customParameters: {
        error_message: errorMessage,
        error_type: errorType,
      },
    });
  }

  public setUserId(userId: string): void {
    this.userId = userId;

    if ((window as any).gtag) {
      (window as any).gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
        user_id: userId,
      });
    }
  }

  public getUserId(): string | undefined {
    return this.userId;
  }

  private async sendCustomAnalytics(type: string, data: any): Promise<void> {
    try {
      // In a real implementation, send to your analytics service
      console.log(`Analytics ${type}:`, data);

      // Example: Send to custom analytics endpoint
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, data }),
      // });

      // Store locally for debugging
      this.storeAnalyticsLocally(type, data);
    } catch (error) {
      console.error('Failed to send analytics:', error);
    }
  }

  private storeAnalyticsLocally(type: string, data: any): void {
    try {
      const analytics = JSON.parse(
        localStorage.getItem('liftfire_analytics') || '[]'
      );
      analytics.push({ type, data, timestamp: new Date().toISOString() });

      // Keep only last 50 analytics events
      if (analytics.length > 50) {
        analytics.splice(0, analytics.length - 50);
      }

      localStorage.setItem('liftfire_analytics', JSON.stringify(analytics));
    } catch {
      // localStorage might be full or unavailable
    }
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public isAnalyticsEnabled(): boolean {
    return this.isEnabled;
  }
}

// Create singleton instance
export const analytics = new AnalyticsService();

// Export types for external use
export type { AnalyticsEvent, PageView };
