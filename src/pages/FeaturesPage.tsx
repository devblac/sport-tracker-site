import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTranslations } from '../hooks/useTranslations';
import {
  createWebPageSchema,
  createSoftwareApplicationSchema,
} from '../utils/structuredData';
import {
  ALL_FEATURES,
  FEATURE_CATEGORIES,
  type Feature as ImportedFeature,
  type FeatureStatus,
  type FeatureCategory,
} from '../data/features';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Award,
  Brain,
  Camera,
  CheckCircle,
  Clock,
  Database,
  Flame,
  Shield,
  Share2,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Wifi,
  Zap,
} from 'lucide-react';

interface StatusBadgeProps {
  status: FeatureStatus;
}

const STATUS_CONFIG: Record<
  FeatureStatus,
  {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    className: string;
    iconClassName: string;
  }
> = {
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    className:
      'bg-emerald-500/10 text-emerald-200 ring-1 ring-inset ring-emerald-400/30',
    iconClassName: 'text-emerald-600',
  },
  'in-progress': {
    icon: Clock,
    label: 'In progress',
    className:
      'bg-amber-500/10 text-amber-200 ring-1 ring-inset ring-amber-400/30',
    iconClassName: 'text-amber-600',
  },
  planned: {
    icon: AlertCircle,
    label: 'Planned',
    className: 'bg-sky-500/10 text-sky-200 ring-1 ring-inset ring-sky-400/30',
    iconClassName: 'text-blue-600',
  },
  experimental: {
    icon: Sparkles,
    label: 'Experimental',
    className:
      'bg-purple-500/10 text-purple-200 ring-1 ring-inset ring-purple-400/30',
    iconClassName: 'text-purple-600',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${config.className}`}
    >
      <Icon className={`h-3.5 w-3.5 ${config.iconClassName}`} />
      {config.label}
    </span>
  );
};

interface FeatureCardProps {
  feature: ImportedFeature;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const featureIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  'pwa-core': Smartphone,
  'exercise-database': Database,
  'offline-functionality': Wifi,
  authentication: Shield,
  'design-system': Sparkles,
  'workout-system': Activity,
  'gamification-system': Trophy,
  'social-features': Users,
  'user-profiles': UserCheck,
  'ai-recommendations': Brain,
  'progress-analytics': TrendingUp,
  'community-features': Share2,
  'advanced-challenges': Flame,
  'mentorship-program': Award,
  'advanced-ai': Brain,
  'third-party-integrations': Target,
  'native-mobile-apps': Smartphone,
  'ar-vr-integration': Camera,
  'blockchain-features': Shield,
};

const categoryIconMap: Record<
  FeatureCategory,
  React.ComponentType<{ className?: string }>
> = {
  core: Activity,
  gamification: Trophy,
  social: Users,
  ai: Brain,
  technical: Shield,
};

const getFeatureIcon = (feature: ImportedFeature) =>
  featureIconMap[feature.id] || categoryIconMap[feature.category] || Sparkles;

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  isExpanded,
  onToggleExpand,
}) => {
  const Icon = getFeatureIcon(feature);

  return (
    <Card
      variant="glow"
      padding="lg"
      className="group text-left backdrop-blur-xl transition-all duration-500 hover:shadow-xl hover:border-blue-500/50"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-foreground shadow-lg group-hover:scale-110 transition-transform">
            <Icon className="h-6 w-6" />
          </span>
          <div className="space-y-2">
            <Typography
              variant="h3"
              className="text-lg font-semibold text-foreground group-hover:text-blue-600 transition-colors"
            >
              {feature.title}
            </Typography>
            <StatusBadge status={feature.status} />
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpand}
          className="rounded-full border border-border bg-muted/50 p-0 hover:bg-muted group"
          aria-expanded={isExpanded}
          aria-label={
            isExpanded ? 'Collapse feature details' : 'Expand feature details'
          }
        >
          {isExpanded ? (
            <span className="flex h-8 w-8 items-center justify-center text-lg text-foreground">
              -
            </span>
          ) : (
            <span className="flex h-8 w-8 items-center justify-center text-lg text-foreground">
              +
            </span>
          )}
        </Button>
      </div>

      <Typography variant="body" className="mt-6 text-sm text-muted-foreground">
        {feature.description}
      </Typography>

      {isExpanded && (
        <div className="mt-6 space-y-5 rounded-2xl border border-border bg-muted/50 p-5 animate-slide-up">
          {feature.keyPoints && feature.keyPoints.length > 0 && (
            <div className="space-y-3">
              <Typography
                variant="h4"
                className="text-base font-semibold text-foreground"
              >
                Key benefits
              </Typography>
              <ul className="space-y-2">
                {feature.keyPoints.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-foreground/90 hover:text-foreground transition-colors group"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {feature.longDescription && (
            <div className="space-y-2">
              <Typography
                variant="h4"
                className="text-base font-semibold text-foreground"
              >
                Technical notes
              </Typography>
              <Typography
                variant="small"
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {feature.longDescription}
              </Typography>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

interface CategoryFilterProps {
  categories: { key: FeatureCategory; label: string }[];
  activeCategory: FeatureCategory | 'all';
  onCategoryChange: (category: FeatureCategory | 'all') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const baseButtonClasses =
    'rounded-full border border-border px-5 py-2 text-sm font-medium transition-all duration-200';

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onCategoryChange('all')}
        className={`${baseButtonClasses} ${
          activeCategory === 'all'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-foreground shadow-lg hover:shadow-xl border-transparent'
            : 'text-foreground hover:bg-muted'
        }`}
      >
        All features
      </button>
      {categories.map(category => (
        <button
          key={category.key}
          type="button"
          onClick={() => onCategoryChange(category.key)}
          className={`${baseButtonClasses} ${
            activeCategory === category.key
              ? 'bg-blue-500 text-foreground shadow-lg hover:shadow-xl border-transparent'
              : 'text-foreground hover:bg-muted'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

const heroHighlights = [
  {
    icon: Activity,
    title: 'Offline-first logging',
    description: 'Log every set even when the gym has no signal.',
  },
  {
    icon: Trophy,
    title: 'Gamified motivation',
    description: 'Earn XP, streaks, and medals that keep you returning.',
  },
  {
    icon: Brain,
    title: 'AI-powered insight',
    description: 'Smart recommendations adapt to your fatigue and goals.',
  },
];

export const FeaturesPage: React.FC = () => {
  const { t } = useTranslations('features');
  const { t: tCommon, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [activeCategory, setActiveCategory] = useState<FeatureCategory | 'all'>(
    'all'
  );
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(
    new Set()
  );

  const categories = useMemo(
    () =>
      Object.entries(FEATURE_CATEGORIES).map(([key, label]) => ({
        key: key as FeatureCategory,
        label: t(`categories.${key}`) || label,
      })),
    [t]
  );

  const features = useMemo(
    () =>
      ALL_FEATURES.map(feature => ({
        ...feature,
      })),
    []
  );

  const filteredFeatures = useMemo(
    () =>
      activeCategory === 'all'
        ? features
        : features.filter(feature => feature.category === activeCategory),
    [activeCategory, features]
  );

  const statusSummary = useMemo(() => {
    const summary: Record<FeatureStatus, number> = {
      completed: 0,
      'in-progress': 0,
      planned: 0,
      experimental: 0,
    };

    features.forEach(feature => {
      summary[feature.status] += 1;
    });

    return summary;
  }, [features]);

  const toggleFeatureExpansion = (featureId: string) => {
    setExpandedFeatures(prev => {
      const next = new Set(prev);
      if (next.has(featureId)) {
        next.delete(featureId);
      } else {
        next.add(featureId);
      }
      return next;
    });
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      createSoftwareApplicationSchema(currentLanguage),
      createWebPageSchema(
        tCommon('seo.featuresPage.title'),
        tCommon('seo.featuresPage.description'),
        typeof window !== 'undefined'
          ? window.location.href
          : 'https://liftfire.app/features',
        currentLanguage
      ),
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <SEO
        title={tCommon('seo.featuresPage.title')}
        description={tCommon('seo.featuresPage.description')}
        keywords={tCommon('seo.defaultKeywords').split(',')}
        structuredData={structuredData}
        type="website"
      />

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 pb-32 pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl animate-pulse" />
          <div
            className="absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute -right-36 top-24 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>
        <Container size="xl" padding="lg" className="relative z-10">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] shadow-lg backdrop-blur animate-slide-up">
                <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                <span className="text-foreground">Product capabilities</span>
              </div>

              <div className="space-y-6">
                <Typography
                  variant="h1"
                  className="max-w-3xl text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl animate-slide-up"
                  style={{ animationDelay: '0.1s' }}
                >
                  Discover everything that makes{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    LiftFire unbeatable
                  </span>
                </Typography>
                <Typography
                  variant="lead"
                  className="max-w-2xl text-lg text-muted-foreground sm:text-xl animate-slide-up"
                  style={{ animationDelay: '0.2s' }}
                >
                  From offline-first logging to AI coaching, explore the systems
                  that turn serious lifters into unstoppable forces.
                </Typography>
              </div>

              <div
                className="grid gap-4 sm:grid-cols-3 animate-slide-up"
                style={{ animationDelay: '0.3s' }}
              >
                {heroHighlights.map(highlight => {
                  const Icon = highlight.icon;
                  return (
                    <div
                      key={highlight.title}
                      className="rounded-2xl border border-border bg-card/50 backdrop-blur p-5 hover:bg-card hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 group"
                    >
                      <Icon className="mb-3 h-6 w-6 text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all" />
                      <p className="text-sm font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                        {highlight.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {highlight.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                className="flex flex-col items-start gap-4 sm:flex-row sm:items-center animate-slide-up"
                style={{ animationDelay: '0.4s' }}
              >
                <Button
                  variant="gradient"
                  size="lg"
                  asChild
                  className="group px-8"
                >
                  <Link to="/contact" className="flex items-center gap-3">
                    {t('cta.primary', { defaultValue: 'Talk to the team' })}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="px-8">
                  <Link to="/roadmap">
                    {t('cta.secondary', { defaultValue: 'View roadmap' })}
                  </Link>
                </Button>
              </div>
            </div>

            <div
              className="rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-8 shadow-2xl animate-fade-in hover:shadow-blue-500/20 transition-shadow duration-500"
              style={{ animationDelay: '0.5s' }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                Shipping velocity
              </p>
              <div className="mt-6 space-y-5">
                {Object.entries(statusSummary).map(([status, count]) => {
                  const config = STATUS_CONFIG[status as FeatureStatus];
                  return (
                    <div
                      key={status}
                      className="flex items-center justify-between rounded-2xl border border-border bg-muted/50 px-4 py-3 hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <config.icon
                          className={`h-5 w-5 ${config.iconClassName} group-hover:scale-110 transition-transform`}
                        />
                        <span className="text-sm font-semibold text-foreground">
                          {config.label}
                        </span>
                      </div>
                      <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-sm text-foreground hover:shadow-lg transition-shadow">
                We track every milestone publicly. Follow along in the roadmap
                as we roll new capabilities into beta each month.
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 -mt-20 pb-24">
        <Container size="xl" padding="lg">
          <div className="rounded-3xl border border-border bg-card backdrop-blur-xl p-10 shadow-2xl">
            <div className="mb-10 space-y-6 text-center">
              <Typography
                variant="h2"
                className="text-3xl font-semibold text-foreground sm:text-4xl"
              >
                {t('title')}
              </Typography>
              <Typography
                variant="lead"
                className="mx-auto max-w-3xl text-base text-muted-foreground sm:text-lg"
              >
                {t('subtitle')}
              </Typography>
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredFeatures.map(feature => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  isExpanded={expandedFeatures.has(feature.id)}
                  onToggleExpand={() => toggleFeatureExpansion(feature.id)}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative pb-24">
        <Container
          size="xl"
          padding="lg"
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_0.9fr]"
        >
          <Card
            variant="glass"
            padding="lg"
            className="border-border bg-muted/50 p-10 text-foreground backdrop-blur-xl"
          >
            <Typography
              variant="h2"
              className="text-3xl font-semibold text-foreground"
            >
              {t('techStack.title')}
            </Typography>
            <Typography
              variant="body"
              className="mt-4 text-base text-muted-foreground"
            >
              {t('techStack.subtitle')}
            </Typography>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted/50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-semibold text-foreground">
                    Frontend
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('techStack.frontend')}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Database className="h-6 w-6 text-purple-600" />
                  <span className="text-sm font-semibold text-foreground">
                    Backend
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('techStack.backend')}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-emerald-600" />
                  <span className="text-sm font-semibold text-foreground">
                    Security
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('techStack.security')}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-muted/50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Zap className="h-6 w-6 text-amber-600" />
                  <span className="text-sm font-semibold text-foreground">
                    Deployment
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('techStack.deployment')}
                </p>
              </div>
            </div>
          </Card>

          <Card
            variant="glass"
            padding="lg"
            className="border-border bg-muted/50 p-10 text-foreground backdrop-blur-xl"
          >
            <Typography
              variant="h2"
              className="text-3xl font-semibold text-foreground"
            >
              Development momentum
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6 text-center">
                <p className="text-3xl font-bold text-foreground">
                  {statusSummary.completed}
                </p>
                <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Completed features
                </p>
              </div>
              <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-6 text-center">
                <p className="text-3xl font-bold text-foreground">
                  {statusSummary['in-progress']}
                </p>
                <p className="mt-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                  In development
                </p>
              </div>
              <div className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-6 text-center">
                <p className="text-3xl font-bold text-foreground">
                  {statusSummary.planned}
                </p>
                <p className="mt-2 text-sm font-medium text-sky-600 dark:text-sky-400">
                  Planned next
                </p>
              </div>
            </div>
            <Typography
              variant="body"
              className="mt-6 text-sm text-muted-foreground"
            >
              Every release sharpens the training experienceï¿½from deeper
              analytics to smarter community tools. Follow our public roadmap to
              see exactly what ships next.
            </Typography>
          </Card>
        </Container>
      </section>
    </main>
  );
};
