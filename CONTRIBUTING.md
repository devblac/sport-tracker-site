# Contributing to LiftFire Marketing Website

Thank you for your interest in contributing to the LiftFire Marketing Website! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm** (comes with Node.js)
- **Git** for version control
- **Code Editor** (VS Code recommended with extensions)

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### Development Setup

1. **Fork and clone the repository:**
```bash
git clone https://github.com/your-username/liftfire-marketing-website.git
cd liftfire-marketing-website
```

2. **Install dependencies:**
```bash
npm ci
```

3. **Set up environment:**
```bash
cp .env.example .env.local
```

4. **Start development server:**
```bash
npm run dev
```

5. **Verify setup:**
   - Open [http://localhost:5173](http://localhost:5173)
   - Run tests: `npm run test:run`
   - Check code quality: `npm run ci:quality`

## 🔄 Development Workflow

### Branch Strategy

- **`main`**: Production-ready code, protected branch
- **`develop`**: Integration branch for features
- **`feature/feature-name`**: Individual feature development
- **`fix/issue-description`**: Bug fixes
- **`docs/documentation-update`**: Documentation changes

### Creating a Feature

1. **Create a feature branch:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

2. **Make your changes** following the coding standards

3. **Test your changes:**
```bash
npm run ci:quality
npm run test:coverage
npm run build
```

4. **Commit your changes:**
```bash
git add .
git commit -m "feat: add your feature description"
```

5. **Push and create PR:**
```bash
git push origin feature/your-feature-name
```

### Pull Request Process

1. **Create PR** against `develop` branch
2. **Fill out PR template** with clear description
3. **Ensure all checks pass** (CI/CD pipeline)
4. **Request review** from maintainers
5. **Address feedback** and update as needed
6. **Merge** after approval (squash and merge preferred)

## 📝 Coding Standards

### TypeScript Guidelines

- **Strict mode**: All TypeScript strict checks enabled
- **Explicit types**: Prefer explicit typing over `any`
- **Interface naming**: Use PascalCase (e.g., `UserProfile`)
- **Enum naming**: Use PascalCase with descriptive names
- **Generic constraints**: Use meaningful constraint names

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

// ❌ Avoid
interface Props {
  type: string;
  data: any;
}
```

### React Component Guidelines

- **Functional components**: Use function declarations
- **Props interface**: Define explicit props interface
- **Default props**: Use default parameters
- **Event handlers**: Use descriptive names with `handle` prefix
- **Conditional rendering**: Use logical operators or ternary

```typescript
// ✅ Good
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType;
  status?: 'completed' | 'in-progress' | 'planned';
}

function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  status = 'planned' 
}: FeatureCardProps) {
  const handleClick = () => {
    // Handle click logic
  };

  return (
    <div className="feature-card" onClick={handleClick}>
      <Icon className="feature-icon" />
      <h3>{title}</h3>
      <p>{description}</p>
      {status === 'completed' && <Badge variant="success">✅</Badge>}
    </div>
  );
}
```

### CSS and Styling Guidelines

- **Tailwind first**: Use Tailwind utilities for styling
- **Custom CSS**: Only when Tailwind is insufficient
- **Responsive design**: Mobile-first approach
- **Dark mode**: Support both light and dark themes
- **Accessibility**: Maintain proper contrast ratios

```typescript
// ✅ Good - Tailwind utilities
<button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
  Click me
</button>

// ✅ Good - Custom component with variants
<Button variant="primary" size="md">
  Click me
</Button>
```

### File and Folder Naming

- **Components**: PascalCase (e.g., `FeatureCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTheme.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `ApiResponse.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)
- **Folders**: kebab-case (e.g., `feature-cards/`)

### Import Organization

Organize imports in this order with blank lines between groups:

```typescript
// 1. React and external libraries
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// 2. Internal components and hooks
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useTheme } from '../../hooks/useTheme';

// 3. Types and interfaces
import type { FeatureStatus } from '../../types/Feature';

// 4. Utilities and constants
import { formatDate } from '../../utils/dateUtils';
import { FEATURE_CATEGORIES } from '../../data/constants';

// 5. Styles and assets (if needed)
import './FeatureCard.css';
```

## 🧪 Testing Guidelines

### Test Structure

- **Co-location**: Tests next to components in `__tests__/` folders
- **Naming**: `ComponentName.test.tsx` for components
- **Coverage**: Minimum 80% code coverage required
- **Types**: Unit, integration, and accessibility tests

### Writing Tests

```typescript
// ✅ Good test structure
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-500');
  });
});
```

### Test Categories

1. **Unit Tests**: Individual components and functions
2. **Integration Tests**: Component interactions and page flows
3. **Accessibility Tests**: Screen reader and keyboard navigation
4. **Visual Tests**: Component rendering and styling
5. **i18n Tests**: Translation loading and language switching

### Running Tests

```bash
# Watch mode during development
npm run test

# Single run with coverage
npm run test:coverage

# Specific test file
npm run test -- Button.test.tsx

# UI interface for debugging
npm run test:ui
```

## 🌍 Internationalization (i18n)

### Adding Translations

1. **Add translation keys** to JSON files in `public/locales/`:

```json
// public/locales/en/features.json
{
  "title": "Features",
  "subtitle": "Everything you need for your fitness journey",
  "categories": {
    "core": "Core Features",
    "gamification": "Gamification",
    "social": "Social Features"
  }
}
```

2. **Use translations** in components:

```typescript
import { useTranslation } from 'react-i18next';

function FeaturesPage() {
  const { t } = useTranslation('features');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

### Translation Guidelines

- **Namespace organization**: Separate by page/feature
- **Key naming**: Use descriptive, hierarchical keys
- **Pluralization**: Use i18next pluralization rules
- **Interpolation**: For dynamic content
- **Context**: For conditional translations

### Adding New Languages

1. **Update language config** in `src/i18n/config.ts`
2. **Create translation files** in `public/locales/[lang]/`
3. **Add URL routing** in `netlify.toml`
4. **Test language switching** functionality

## 🎨 Design System

### Component Development

- **Base components**: In `src/components/ui/`
- **Variants**: Support multiple visual styles
- **Sizes**: Provide size options (sm, md, lg)
- **States**: Handle loading, disabled, error states
- **Accessibility**: WCAG 2.1 AA compliance

### Theme System

- **CSS Variables**: Use for theme-aware properties
- **Dark mode**: Support with `dark:` prefixes
- **Color palette**: Follow brand guidelines
- **Typography**: Consistent scale and hierarchy

### Animation Guidelines

- **Performance**: Use CSS transforms over layout changes
- **Accessibility**: Respect `prefers-reduced-motion`
- **Duration**: 150ms for micro-interactions, 300ms for transitions
- **Easing**: Use consistent easing functions

## 🚀 Performance Guidelines

### Code Optimization

- **Bundle size**: Monitor and optimize bundle size
- **Code splitting**: Implement route and component-based splitting
- **Tree shaking**: Ensure unused code is eliminated
- **Lazy loading**: For images and non-critical components

### Runtime Performance

- **React optimization**: Use `useMemo`, `useCallback` appropriately
- **Image optimization**: WebP format with fallbacks
- **Font loading**: Optimize font loading strategy
- **Caching**: Implement proper caching strategies

### Performance Monitoring

- **Lighthouse CI**: Automated performance audits
- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Bundle analysis**: Regular bundle size monitoring

## 🔍 Code Review Guidelines

### For Authors

- **Self-review**: Review your own PR before requesting review
- **Description**: Provide clear PR description and context
- **Screenshots**: Include visual changes screenshots
- **Testing**: Ensure all tests pass and coverage is maintained
- **Documentation**: Update docs if needed

### For Reviewers

- **Functionality**: Verify feature works as intended
- **Code quality**: Check for adherence to standards
- **Performance**: Consider performance implications
- **Accessibility**: Verify accessibility compliance
- **Security**: Check for potential security issues

### Review Checklist

- [ ] Code follows established patterns and conventions
- [ ] Tests are comprehensive and pass
- [ ] Documentation is updated if needed
- [ ] Performance impact is considered
- [ ] Accessibility requirements are met
- [ ] i18n considerations are addressed
- [ ] No console errors or warnings
- [ ] Mobile responsiveness is maintained

## 🐛 Bug Reports

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Test in latest version** to ensure bug still exists
3. **Reproduce consistently** with clear steps
4. **Check browser compatibility** across different browsers

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. macOS 12.0]
- Browser: [e.g. Chrome 96.0]
- Device: [e.g. iPhone 13, Desktop]
- Screen size: [e.g. 1920x1080, 375x667]

## Screenshots
If applicable, add screenshots

## Additional Context
Any other context about the problem
```

## 🎯 Feature Requests

### Before Requesting

1. **Check existing issues** and discussions
2. **Consider scope** and alignment with project goals
3. **Think about implementation** complexity
4. **Provide use cases** and user stories

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this feature work?

## User Stories
- As a [user type], I want [goal] so that [benefit]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Additional Context
Mockups, examples, or related features
```

## 📚 Documentation

### Documentation Types

- **README**: Project overview and quick start
- **API Documentation**: Component props and usage
- **Guides**: Step-by-step tutorials
- **Architecture**: Technical design decisions
- **Deployment**: Production deployment guide

### Writing Guidelines

- **Clear and concise**: Use simple, direct language
- **Code examples**: Include practical examples
- **Screenshots**: Visual aids for complex processes
- **Up-to-date**: Keep documentation current with code
- **Searchable**: Use descriptive headings and keywords

## 🏆 Recognition

Contributors who make significant contributions will be:

- **Listed in CONTRIBUTORS.md** with their contributions
- **Mentioned in release notes** for major features
- **Invited to maintainer discussions** for regular contributors
- **Given credit** in project documentation

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Discord**: Real-time chat and community support
- **Email**: Direct contact for sensitive issues

### Response Times

- **Critical bugs**: Within 24 hours
- **Feature requests**: Within 1 week
- **General questions**: Within 3 days
- **Pull requests**: Within 1 week

## 📋 Checklist for Contributors

Before submitting a contribution:

- [ ] Code follows project conventions and standards
- [ ] All tests pass and coverage is maintained
- [ ] Documentation is updated if needed
- [ ] Commit messages follow conventional commit format
- [ ] PR description is clear and complete
- [ ] Changes are tested across different browsers/devices
- [ ] Accessibility requirements are met
- [ ] Performance impact is considered
- [ ] i18n considerations are addressed

Thank you for contributing to LiftFire! Your efforts help make fitness tracking better for everyone. 🚀