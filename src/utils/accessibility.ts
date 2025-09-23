// Accessibility utilities and helpers

export interface AccessibilityOptions {
  announcePageChanges?: boolean;
  manageFocus?: boolean;
  enableKeyboardNavigation?: boolean;
}

export class AccessibilityManager {
  private options: AccessibilityOptions;
  private announcer?: HTMLElement;

  constructor(options: AccessibilityOptions = {}) {
    this.options = {
      announcePageChanges: true,
      manageFocus: true,
      enableKeyboardNavigation: true,
      ...options,
    };

    this.initialize();
  }

  private initialize(): void {
    if (this.options.announcePageChanges) {
      this.createScreenReaderAnnouncer();
    }

    if (this.options.enableKeyboardNavigation) {
      this.setupKeyboardNavigation();
    }
  }

  private createScreenReaderAnnouncer(): void {
    this.announcer = document.createElement('div');
    this.announcer.setAttribute('aria-live', 'polite');
    this.announcer.setAttribute('aria-atomic', 'true');
    this.announcer.className = 'sr-only';
    this.announcer.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    document.body.appendChild(this.announcer);
  }

  private setupKeyboardNavigation(): void {
    // Skip to main content link
    this.createSkipLink();

    // Focus management for modals and overlays
    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
  }

  private createSkipLink(): void {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 9999;
      border-radius: 4px;
      transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  private handleGlobalKeydown(event: KeyboardEvent): void {
    // Escape key handling for modals
    if (event.key === 'Escape') {
      const activeModal = document.querySelector(
        '[role="dialog"][aria-modal="true"]'
      );
      if (activeModal) {
        const closeButton = activeModal.querySelector(
          '[data-close-modal]'
        ) as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      }
    }

    // Tab trapping for modals
    if (event.key === 'Tab') {
      const activeModal = document.querySelector(
        '[role="dialog"][aria-modal="true"]'
      );
      if (activeModal) {
        this.trapFocus(event, activeModal as HTMLElement);
      }
    }
  }

  private trapFocus(event: KeyboardEvent, container: HTMLElement): void {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  public announce(
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
  ): void {
    if (this.announcer) {
      this.announcer.setAttribute('aria-live', priority);
      this.announcer.textContent = message;

      // Clear after announcement
      setTimeout(() => {
        if (this.announcer) {
          this.announcer.textContent = '';
        }
      }, 1000);
    }
  }

  public announcePageChange(pageTitle: string): void {
    this.announce(`Navigated to ${pageTitle}`);
  }

  public manageFocus(element: HTMLElement | string): void {
    if (!this.options.manageFocus) return;

    const targetElement =
      typeof element === 'string'
        ? (document.querySelector(element) as HTMLElement)
        : element;

    if (targetElement) {
      // Add tabindex if not focusable
      if (
        !targetElement.hasAttribute('tabindex') &&
        !this.isFocusable(targetElement)
      ) {
        targetElement.setAttribute('tabindex', '-1');
      }

      targetElement.focus();
    }
  }

  private isFocusable(element: HTMLElement): boolean {
    const focusableSelectors = [
      'button',
      'input',
      'select',
      'textarea',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]',
    ];

    return focusableSelectors.some(selector => element.matches(selector));
  }
}

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // Simple luminance calculation (would need a proper color parsing library for production)
    // This is a simplified version for demonstration
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;

    const [r, g, b] = rgb.map(c => {
      const val = parseInt(c) / 255;
      return val <= 0.03928
        ? val / 12.92
        : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

export const meetsWCAGContrast = (
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  const ratio = getContrastRatio(color1, color2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

// ARIA utilities
export const generateId = (prefix: string = 'element'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export const setAriaExpanded = (
  element: HTMLElement,
  expanded: boolean
): void => {
  element.setAttribute('aria-expanded', expanded.toString());
};

export const setAriaHidden = (element: HTMLElement, hidden: boolean): void => {
  element.setAttribute('aria-hidden', hidden.toString());
};

export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.style.cssText = `
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  `;

  document.body.appendChild(announcer);
  announcer.textContent = message;

  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
};

// Initialize accessibility manager
let accessibilityManager: AccessibilityManager | null = null;

export const initializeAccessibility = (
  options?: AccessibilityOptions
): AccessibilityManager => {
  if (!accessibilityManager) {
    accessibilityManager = new AccessibilityManager(options);
  }
  return accessibilityManager;
};

export const getAccessibilityManager = (): AccessibilityManager | null => {
  return accessibilityManager;
};
