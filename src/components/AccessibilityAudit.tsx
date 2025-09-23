import React, { useEffect, useState } from 'react';
import { Typography } from './ui/Typography';
import { Card } from './ui/Card';

interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  element?: string;
  suggestion?: string;
}

interface AccessibilityAuditProps {
  enabled?: boolean;
}

export const AccessibilityAudit: React.FC<AccessibilityAuditProps> = ({
  enabled = process.env.NODE_ENV === 'development',
}) => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const runAudit = () => {
      const foundIssues: AccessibilityIssue[] = [];

      // Check for missing alt attributes
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.hasAttribute('alt')) {
          foundIssues.push({
            type: 'error',
            message: `Image missing alt attribute`,
            element: `img[${index}]`,
            suggestion: 'Add descriptive alt text for screen readers',
          });
        } else if (img.getAttribute('alt') === '') {
          foundIssues.push({
            type: 'warning',
            message: `Image has empty alt attribute`,
            element: `img[${index}]`,
            suggestion: 'Consider if this is decorative or needs description',
          });
        }
      });

      // Check for missing form labels
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach((input, index) => {
        const id = input.getAttribute('id');
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledBy = input.getAttribute('aria-labelledby');

        if (!id && !ariaLabel && !ariaLabelledBy) {
          const label =
            input.closest('label') ||
            document.querySelector(`label[for="${id}"]`);
          if (!label) {
            foundIssues.push({
              type: 'error',
              message: `Form control missing label`,
              element: `${input.tagName.toLowerCase()}[${index}]`,
              suggestion: 'Add a label element or aria-label attribute',
            });
          }
        }
      });

      // Check for missing heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      headings.forEach((heading, index) => {
        const currentLevel = parseInt(heading.tagName.charAt(1));
        if (currentLevel > previousLevel + 1) {
          foundIssues.push({
            type: 'warning',
            message: `Heading level skipped from h${previousLevel} to h${currentLevel}`,
            element: `${heading.tagName.toLowerCase()}[${index}]`,
            suggestion:
              'Use sequential heading levels for proper document structure',
          });
        }
        previousLevel = currentLevel;
      });

      // Check for missing focus indicators
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusableElements.forEach((element, index) => {
        const computedStyle = window.getComputedStyle(element, ':focus');
        const outline = computedStyle.outline;
        const boxShadow = computedStyle.boxShadow;

        if (outline === 'none' && boxShadow === 'none') {
          foundIssues.push({
            type: 'warning',
            message: `Focusable element may lack visible focus indicator`,
            element: `${element.tagName.toLowerCase()}[${index}]`,
            suggestion:
              'Ensure focus indicators are visible for keyboard users',
          });
        }
      });

      // Check for color contrast (simplified check)
      const textElements = document.querySelectorAll(
        'p, span, div, h1, h2, h3, h4, h5, h6, a, button'
      );
      textElements.forEach(element => {
        const style = window.getComputedStyle(element);
        const color = style.color;
        const backgroundColor = style.backgroundColor;

        // This is a simplified check - in production, you'd use a proper contrast calculation
        if (
          color &&
          backgroundColor &&
          color !== 'rgba(0, 0, 0, 0)' &&
          backgroundColor !== 'rgba(0, 0, 0, 0)'
        ) {
          // Add contrast checking logic here
          // For now, we'll skip this as it requires complex color parsing
        }
      });

      // Check for missing ARIA landmarks
      const main = document.querySelector('main');
      const nav = document.querySelector('nav');

      if (!main) {
        foundIssues.push({
          type: 'error',
          message: 'Missing main landmark',
          suggestion:
            'Add a <main> element or role="main" to identify the main content area',
        });
      }

      if (!nav) {
        foundIssues.push({
          type: 'info',
          message: 'No navigation landmark found',
          suggestion: 'Consider adding <nav> elements for navigation areas',
        });
      }

      setIssues(foundIssues);
    };

    // Run audit after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(runAudit, 1000);

    return () => clearTimeout(timeoutId);
  }, [enabled]);

  if (!enabled || issues.length === 0) {
    return null;
  }

  const errorCount = issues.filter(issue => issue.type === 'error').length;
  const warningCount = issues.filter(issue => issue.type === 'warning').length;
  const infoCount = issues.filter(issue => issue.type === 'info').length;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm opacity-75 hover:opacity-100"
        aria-label={`Accessibility audit: ${errorCount} errors, ${warningCount} warnings`}
      >
        A11y ({errorCount + warningCount + infoCount})
      </button>

      {isVisible && (
        <Card className="absolute bottom-12 left-0 w-96 max-h-96 overflow-y-auto p-4 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h3" className="font-semibold">
              Accessibility Audit
            </Typography>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close audit panel"
            >
              ×
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-red-600">Errors: {errorCount}</span>
              <span className="text-yellow-600">Warnings: {warningCount}</span>
              <span className="text-blue-600">Info: {infoCount}</span>
            </div>
          </div>

          <div className="space-y-3">
            {issues.map((issue, index) => (
              <div
                key={index}
                className={`p-3 rounded border-l-4 ${
                  issue.type === 'error'
                    ? 'border-red-500 bg-red-50'
                    : issue.type === 'warning'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="font-medium text-sm">{issue.message}</div>
                {issue.element && (
                  <div className="text-xs text-gray-600 mt-1">
                    Element: {issue.element}
                  </div>
                )}
                {issue.suggestion && (
                  <div className="text-xs text-gray-700 mt-2">
                    💡 {issue.suggestion}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
