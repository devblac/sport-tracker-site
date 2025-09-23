/**
 * Global type definitions for the application
 */

// Vite global constants
declare const __APP_VERSION__: string;
declare const __BUILD_TIME__: string;
declare const __COMMIT_SHA__: string;
declare const __APP_ENV__: string;

// Environment variables
interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  readonly VITE_DEFAULT_LANGUAGE: string;
  readonly VITE_SUPPORTED_LANGUAGES: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_ERROR_REPORTING: string;
  readonly VITE_ENABLE_PERFORMANCE_MONITORING: string;
  readonly VITE_GA_TRACKING_ID?: string;
  readonly VITE_HOTJAR_ID?: string;
  readonly VITE_DISCORD_INVITE_URL?: string;
  readonly VITE_GITHUB_REPO_URL?: string;
  readonly VITE_SUPPORT_EMAIL?: string;
  readonly VITE_DEBUG_MODE: string;
  readonly VITE_MOCK_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Window extensions for analytics and monitoring
interface Window {
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
}

// Navigator extensions for connection info
interface Navigator {
  connection?: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  };
}

// CSS.supports for feature detection
interface CSS {
  supports(property: string, value: string): boolean;
}

declare var CSS: CSS;
