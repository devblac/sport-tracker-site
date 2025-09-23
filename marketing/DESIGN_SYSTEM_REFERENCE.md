# LiftFire - Design System Reference for Website

## 🎨 Design System Overview

This document provides the exact design system specifications from the LiftFire app to ensure the marketing website maintains perfect visual consistency.

## 🎯 CSS Custom Properties (Design Tokens)

### Light Theme
```css
:root {
  /* Primary Colors */
  --background: 0 0% 100%;
  --foreground: 222.8571 84.0000% 4.9020%;
  --card: 0 0% 100%;
  --card-foreground: 222.8571 84.0000% 4.9020%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.8571 84.0000% 4.9020%;
  
  /* Brand Colors */
  --primary: 221.2121 83.1933% 53.3333%;
  --primary-foreground: 0 0% 98.0392%;
  --secondary: 210.0000 40.0000% 96.0784%;
  --secondary-foreground: 222.2222 47.3684% 11.1765%;
  
  /* Semantic Colors */
  --muted: 210.0000 40.0000% 96.0784%;
  --muted-foreground: 215.3846 16.3180% 46.8627%;
  --accent: 210.0000 40.0000% 96.0784%;
  --accent-foreground: 222.2222 47.3684% 11.1765%;
  --destructive: 0 84.2365% 60.1961%;
  --destructive-foreground: 0 0% 98.0392%;
  
  /* UI Elements */
  --border: 214.2857 31.8182% 91.3725%;
  --input: 214.2857 31.8182% 91.3725%;
  --ring: 215.0000 20.2247% 65.0980%;
  
  /* Chart Colors */
  --chart-1: 221.2121 83.1933% 53.3333%;
  --chart-2: 217.2193 91.2195% 59.8039%;
  --chart-3: 213.1169 93.9024% 67.8431%;
  --chart-4: 211.6981 96.3636% 78.4314%;
  --chart-5: 213.3333 96.9231% 87.2549%;
}
```

### Dark Theme
```css
.dark {
  --background: 20 14.2857% 4.1176%;
  --foreground: 0 0% 98.0392%;
  --card: 240 5.8824% 10%;
  --card-foreground: 0 0% 98.0392%;
  --popover: 240 5.8824% 10%;
  --popover-foreground: 0 0% 98.0392%;
  
  --primary: 217.2193 91.2195% 59.8039%;
  --primary-foreground: 0 0% 98.0392%;
  --secondary: 240 3.7037% 15.8824%;
  --secondary-foreground: 0 0% 98.0392%;
  
  --muted: 240 3.7037% 15.8824%;
  --muted-foreground: 240 5.0279% 64.9020%;
  --accent: 215.0000 27.9070% 16.8627%;
  --accent-foreground: 210 20.0000% 98.0392%;
  --destructive: 0 84.2365% 60.1961%;
  --destructive-foreground: 0 0% 98.0392%;
  
  --border: 240 3.7037% 15.8824%;
  --input: 240 3.7037% 15.8824%;
  --ring: 217.2193 91.2195% 59.8039%;
}
```

### OLED Theme
```css
.oled {
  --background: 0 0% 0%;
  --foreground: 0 0% 96.0784%;
  --card: 0 0% 5.0980%;
  --card-foreground: 0 0% 96.0784%;
  --popover: 0 0% 7.8431%;
  --popover-foreground: 0 0% 96.0784%;
  
  --primary: 180 100% 50%;
  --primary-foreground: 0 0% 0%;
  --secondary: 308.7958 100% 62.5490%;
  --secondary-foreground: 0 0% 0%;
  
  --muted: 0 0% 36.0784%;
  --muted-foreground: 0 0% 63.9216%;
  --accent: 112.7273 100% 67.6471%;
  --accent-foreground: 0 0% 0%;
  --destructive: 0 100% 62.5490%;
  --destructive-foreground: 0 0% 100%;
  
  --border: 0 0% 32.9412%;
  --input: 0 0% 10.1961%;
  --ring: 180 100% 50%;
}
```

### Halloween Theme
```css
.halloween {
  --background: 240 12.0000% 4.9020%;
  --foreground: 0 0% 94.1176%;
  --card: 240 5.4545% 10.7843%;
  --card-foreground: 0 0% 94.1176%;
  --popover: 240 4.6154% 12.7451%;
  --popover-foreground: 0 0% 94.1176%;
  
  --primary: 18.8060 88.5463% 55.4902%;
  --primary-foreground: 0 0% 100%;
  --secondary: 275.7143 58.3333% 57.6471%;
  --secondary-foreground: 0 0% 100%;
  
  --muted: 240 2.7027% 36.2745%;
  --muted-foreground: 240 2.9586% 66.8627%;
  --accent: 0 73.6000% 49.0196%;
  --accent-foreground: 0 0% 100%;
  --destructive: 0 73.6000% 49.0196%;
  --destructive-foreground: 0 0% 100%;
  
  --border: 240 7.3684% 18.6275%;
  --input: 240 7.3684% 18.6275%;
  --ring: 18.8060 88.5463% 55.4902%;
}
```

## 📝 Typography System

### Font Family
```css
body {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### Font Scale
```css
/* Typography Scale */
.text-xs { font-size: 0.75rem; line-height: 1rem; }      /* 12px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }  /* 14px */
.text-base { font-size: 1rem; line-height: 1.5rem; }     /* 16px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }  /* 18px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }   /* 20px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }      /* 24px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* 30px */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }   /* 36px */
.text-5xl { font-size: 3rem; line-height: 1; }           /* 48px */
.text-6xl { font-size: 3.75rem; line-height: 1; }        /* 60px */
.text-7xl { font-size: 4.5rem; line-height: 1; }         /* 72px */
.text-8xl { font-size: 6rem; line-height: 1; }           /* 96px */
.text-9xl { font-size: 8rem; line-height: 1; }           /* 128px */
```

### Font Weights
```css
.font-thin { font-weight: 100; }
.font-extralight { font-weight: 200; }
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-black { font-weight: 900; }
```

## 🎨 Color Usage Guidelines

### Primary Colors (HSL Format)
```css
/* Convert HSL to RGB for web use */
--primary-rgb: 59, 130, 246;        /* #3B82F6 */
--secondary-rgb: 139, 92, 246;      /* #8B5CF6 */
--success-rgb: 16, 185, 129;        /* #10B981 */
--warning-rgb: 245, 158, 11;        /* #F59E0B */
--error-rgb: 239, 68, 68;           /* #EF4444 */
```

### Usage Examples
```css
/* Background colors */
.bg-background { background-color: hsl(var(--background)); }
.bg-card { background-color: hsl(var(--card)); }
.bg-primary { background-color: hsl(var(--primary)); }

/* Text colors */
.text-foreground { color: hsl(var(--foreground)); }
.text-muted-foreground { color: hsl(var(--muted-foreground)); }
.text-primary { color: hsl(var(--primary)); }

/* Border colors */
.border-border { border-color: hsl(var(--border)); }
.border-primary { border-color: hsl(var(--primary)); }
```

## 📐 Spacing System

### Spacing Scale
```css
/* Spacing values (rem) */
.p-0 { padding: 0; }
.p-1 { padding: 0.25rem; }    /* 4px */
.p-2 { padding: 0.5rem; }     /* 8px */
.p-3 { padding: 0.75rem; }    /* 12px */
.p-4 { padding: 1rem; }       /* 16px */
.p-5 { padding: 1.25rem; }    /* 20px */
.p-6 { padding: 1.5rem; }     /* 24px */
.p-8 { padding: 2rem; }       /* 32px */
.p-10 { padding: 2.5rem; }    /* 40px */
.p-12 { padding: 3rem; }      /* 48px */
.p-16 { padding: 4rem; }      /* 64px */
.p-20 { padding: 5rem; }      /* 80px */
.p-24 { padding: 6rem; }      /* 96px */
```

## 🔘 Border Radius System

```css
.rounded-none { border-radius: 0; }
.rounded-sm { border-radius: 0.125rem; }    /* 2px */
.rounded { border-radius: 0.25rem; }        /* 4px */
.rounded-md { border-radius: 0.375rem; }    /* 6px */
.rounded-lg { border-radius: 0.5rem; }      /* 8px */
.rounded-xl { border-radius: 0.75rem; }     /* 12px */
.rounded-2xl { border-radius: 1rem; }       /* 16px */
.rounded-3xl { border-radius: 1.5rem; }     /* 24px */
.rounded-full { border-radius: 9999px; }
```

## 🌟 Shadow System

```css
/* Shadow utilities */
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
.shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }
```

## 🎭 Component Styles

### Button Styles
```css
/* Primary Button */
.btn-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: hsl(var(--primary) / 0.9);
}

/* Secondary Button */
.btn-secondary {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

/* Outline Button */
.btn-outline {
  background-color: transparent;
  color: hsl(var(--primary));
  border: 1px solid hsl(var(--border));
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-outline:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
```

### Card Styles
```css
.card {
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.card-header {
  padding: 1.5rem 1.5rem 0;
}

.card-content {
  padding: 1.5rem;
}

.card-footer {
  padding: 0 1.5rem 1.5rem;
}
```

### Input Styles
```css
.input {
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## 🎨 Gradient Definitions

```css
/* Brand Gradients */
.gradient-primary {
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%);
}

.gradient-success {
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
}

.gradient-warning {
  background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
}

/* Subtle Background Gradients */
.gradient-subtle {
  background: linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%);
}
```

## 🎬 Animation System

```css
/* Transition Utilities */
.transition-all { transition: all 0.15s ease-in-out; }
.transition-colors { transition: color, background-color, border-color 0.15s ease-in-out; }
.transition-transform { transition: transform 0.15s ease-in-out; }

/* Animation Keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Animation Classes */
.animate-fade-in { animation: fadeIn 0.3s ease-out; }
.animate-slide-up { animation: slideUp 0.3s ease-out; }
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
```

## 📱 Responsive Breakpoints

```css
/* Breakpoint System */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

## 🎯 Theme Switching Implementation

```javascript
// Theme switching function
function setTheme(theme) {
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
}

// Available themes
const themes = ['', 'dark', 'oled', 'halloween'];

// Initialize theme from localStorage or system preference
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (systemDark) {
    setTheme('dark');
  }
}
```

## 🎨 Usage Examples for Website

### Hero Section
```html
<section class="bg-gradient-primary text-primary-foreground py-20">
  <div class="container mx-auto px-4">
    <h1 class="text-4xl md:text-6xl font-bold mb-6">
      Transform Your Fitness Journey
    </h1>
    <p class="text-xl mb-8 text-primary-foreground/90">
      The gamified gym tracker that works offline
    </p>
    <button class="btn-primary text-lg px-8 py-3">
      Start Your Journey
    </button>
  </div>
</section>
```

### Feature Card
```html
<div class="card p-6 hover:shadow-lg transition-all">
  <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
    <svg class="w-6 h-6 text-primary">...</svg>
  </div>
  <h3 class="text-xl font-semibold mb-2">Works Offline Always</h3>
  <p class="text-muted-foreground">
    Never miss a rep due to poor gym WiFi. LiftFire works 100% offline.
  </p>
</div>
```

This design system reference ensures the marketing website maintains perfect visual consistency with the LiftFire app across all themes and components.