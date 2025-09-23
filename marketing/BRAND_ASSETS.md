# LiftFire - Brand Assets & Guidelines

## 🎨 Brand Identity

### Brand Essence
**LiftFire** embodies the fusion of cutting-edge technology with the raw energy of fitness. Our brand represents transformation, community, and the relentless pursuit of personal excellence.

### Brand Personality
- **Energetic**: High-energy, motivating, and inspiring
- **Intelligent**: Smart, data-driven, and insightful
- **Social**: Community-focused, collaborative, and supportive
- **Innovative**: Cutting-edge, forward-thinking, and pioneering
- **Accessible**: User-friendly, inclusive, and welcoming

### Brand Voice
- **Tone**: Encouraging, knowledgeable, and authentic
- **Style**: Direct, energetic, and motivational
- **Language**: Clear, jargon-free, and action-oriented
- **Personality**: Like a knowledgeable gym buddy who's also a tech expert

## 🔥 Logo & Visual Identity

### Primary Logo
```
🔥 LiftFire
```
*Note: The fire emoji (🔥) serves as our primary brand symbol until custom logo creation*

### Logo Variations
- **Primary**: Full logo with fire icon and wordmark
- **Icon Only**: Fire symbol for app icons and favicons
- **Wordmark**: Text-only version for minimal applications
- **Monogram**: "LF" lettermark for compact spaces

### Logo Usage Guidelines
- **Minimum Size**: 24px height for digital, 0.5" for print
- **Clear Space**: Minimum 1x logo height on all sides
- **Backgrounds**: Works on light, dark, and colored backgrounds
- **Don'ts**: Never stretch, rotate, or modify the logo proportions

## 🎨 Color Palette

### Primary Colors
```css
/* Electric Blue - Energy & Technology */
--primary: #3B82F6;
--primary-rgb: 59, 130, 246;
--primary-hsl: 217, 91%, 60%;

/* Vibrant Purple - Premium & Innovation */
--secondary: #8B5CF6;
--secondary-rgb: 139, 92, 246;
--secondary-hsl: 258, 90%, 66%;
```

### Accent Colors
```css
/* Success Green - Achievement & Growth */
--success: #10B981;
--success-rgb: 16, 185, 129;
--success-hsl: 160, 84%, 39%;

/* Warning Orange - Energy & Motivation */
--warning: #F59E0B;
--warning-rgb: 245, 158, 11;
--warning-hsl: 38, 92%, 50%;

/* Error Red - Alerts & Challenges */
--error: #EF4444;
--error-rgb: 239, 68, 68;
--error-hsl: 0, 84%, 60%;
```

### Neutral Colors
```css
/* Light Theme */
--background-light: #FFFFFF;
--foreground-light: #0F172A;
--muted-light: #F1F5F9;
--border-light: #E2E8F0;

/* Dark Theme */
--background-dark: #0F172A;
--foreground-dark: #F8FAFC;
--muted-dark: #1E293B;
--border-dark: #334155;
```

### Color Psychology
- **Blue**: Trust, reliability, technology, progress
- **Purple**: Premium, innovation, creativity, transformation
- **Green**: Success, growth, health, achievement
- **Orange**: Energy, enthusiasm, motivation, warmth

## 📝 Typography

### Primary Font Family
**Inter** - Modern, clean, and highly readable
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Weights
- **Light (300)**: Subtle text, captions
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Subheadings, emphasis
- **Semibold (600)**: Section headers, navigation
- **Bold (700)**: Main headings, CTAs
- **Extrabold (800)**: Hero text, major headings

### Typography Scale
```css
/* Headings */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Typography Usage
- **Hero Headlines**: text-4xl or text-5xl, font-bold
- **Section Headers**: text-2xl or text-3xl, font-semibold
- **Subheadings**: text-lg or text-xl, font-medium
- **Body Text**: text-base, font-regular
- **Captions**: text-sm or text-xs, font-light

## 🖼️ Visual Style

### Design Principles
1. **Clarity**: Clean, uncluttered layouts with clear hierarchy
2. **Consistency**: Uniform spacing, colors, and typography
3. **Accessibility**: High contrast, readable fonts, proper sizing
4. **Responsiveness**: Mobile-first, adaptive design
5. **Performance**: Optimized images and efficient layouts

### Visual Elements

#### Gradients
```css
/* Primary Gradient */
background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);

/* Success Gradient */
background: linear-gradient(135deg, #10B981 0%, #059669 100%);

/* Warm Gradient */
background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
```

#### Shadows
```css
/* Subtle Shadow */
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

/* Medium Shadow */
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Large Shadow */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
```

#### Border Radius
```css
--radius-sm: 0.25rem;   /* 4px - Small elements */
--radius-md: 0.375rem;  /* 6px - Buttons, inputs */
--radius-lg: 0.5rem;    /* 8px - Cards, modals */
--radius-xl: 0.75rem;   /* 12px - Large containers */
--radius-2xl: 1rem;     /* 16px - Hero sections */
```

## 📱 App Icon Design

### Icon Specifications
- **iOS**: 1024x1024px (App Store), various sizes for device
- **Android**: 512x512px (Play Store), adaptive icon support
- **PWA**: 192x192px, 512x512px for manifest
- **Favicon**: 32x32px, 16x16px for web browsers

### Icon Design Elements
- **Background**: Gradient from primary to secondary
- **Symbol**: Stylized fire icon or dumbbell with flame
- **Style**: Modern, minimal, recognizable at small sizes
- **Colors**: Primary brand colors with high contrast

## 🎬 Motion & Animation

### Animation Principles
- **Purposeful**: Every animation serves a functional purpose
- **Smooth**: 60fps performance with hardware acceleration
- **Quick**: Fast enough to feel responsive (<300ms for micro-interactions)
- **Natural**: Easing curves that feel organic and intuitive

### Animation Library
```css
/* Easing Functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Duration Scale */
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Common Animations
- **Hover Effects**: Subtle scale (1.05x) or color transitions
- **Button Press**: Quick scale down (0.95x) with bounce back
- **Page Transitions**: Slide or fade effects
- **Loading States**: Pulse or skeleton animations
- **Success States**: Celebration animations with confetti

## 📸 Photography Style

### Image Guidelines
- **Style**: High-energy, authentic gym and fitness photography
- **Lighting**: Bright, natural lighting with high contrast
- **Composition**: Dynamic angles, action shots, diverse representation
- **Color Grading**: Enhance brand colors, maintain natural skin tones
- **Subjects**: Real people, diverse demographics, authentic emotions

### Image Types
- **Hero Images**: Inspiring workout scenes, achievement moments
- **Feature Screenshots**: Clean app interface captures
- **Lifestyle Photos**: People using the app in real gym environments
- **Product Shots**: Device mockups showing the app interface
- **Community Images**: Groups working out, social interactions

## 🎯 Marketing Materials

### Website Assets
- **Hero Banners**: 1920x1080px, mobile variants
- **Feature Cards**: 400x300px with consistent styling
- **Screenshots**: Device mockups (iPhone, Android, Desktop)
- **Icons**: Feature icons in brand colors
- **Backgrounds**: Subtle patterns or gradients

### Social Media Assets
- **Profile Pictures**: Consistent logo across all platforms
- **Cover Photos**: Brand message with visual elements
- **Post Templates**: Consistent layout and color scheme
- **Story Templates**: Vertical format with brand elements
- **Video Thumbnails**: High-contrast, readable text

### Print Materials
- **Business Cards**: Minimal design with key contact info
- **Flyers**: High-impact visuals with clear value proposition
- **Banners**: Large format for events and trade shows
- **Merchandise**: T-shirts, water bottles, gym accessories

## 🔤 Voice & Messaging

### Key Messages
- **Primary**: "Transform your fitness journey with gamified tracking"
- **Secondary**: "The smart gym tracker that works offline"
- **Tertiary**: "Join the community that makes fitness addictive"

### Taglines
- "Your Fitness Journey, Gamified"
- "Level Up Your Workouts"
- "Fitness That Never Goes Offline"
- "Where Strength Meets Smart"
- "Ignite Your Fitness Potential"

### Content Tone Examples
- **Motivational**: "Every rep counts, every set matters, every workout brings you closer to your goals."
- **Technical**: "Advanced AI algorithms analyze your progress and suggest optimal training strategies."
- **Community**: "Join thousands of fitness enthusiasts who are crushing their goals together."
- **Achievement**: "Unlock achievements, earn XP, and celebrate every milestone on your fitness journey."

## 📋 Brand Application Guidelines

### Do's
- ✅ Use consistent colors across all materials
- ✅ Maintain proper logo spacing and sizing
- ✅ Follow typography hierarchy guidelines
- ✅ Use high-quality, on-brand imagery
- ✅ Maintain consistent voice and tone

### Don'ts
- ❌ Modify logo colors or proportions
- ❌ Use low-resolution or pixelated images
- ❌ Mix different font families
- ❌ Use colors outside the brand palette
- ❌ Create cluttered or confusing layouts

### Quality Standards
- **Resolution**: Minimum 300 DPI for print, optimized for web
- **File Formats**: SVG for logos, WebP for web images, PNG for transparency
- **Accessibility**: WCAG 2.1 AA compliance for all visual elements
- **Performance**: Optimized file sizes without quality loss

This comprehensive brand guide ensures consistent, professional representation of LiftFire across all touchpoints and marketing materials.