import React, { useState } from 'react';
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
  Database,
  Wifi,
  BarChart3,
  Trophy,
  Target,
  Flame,
  Award,
  Users,
  Share2,
  UserCheck,
  Brain,
  TrendingUp,
  Camera,
  Smartphone,
  Zap,
  Shield,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

// Local Feature interface for the component
interface Feature extends Omit<ImportedFeature, 'icon'> {
  icon: React.ComponentType<{ className?: string }>;
  benefits?: string[];
  details?: string;
}

interface StatusBadgeProps {
  status: FeatureStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    completed: {
      icon: CheckCircle,
      text: 'Completed',
      className:
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      iconClassName: 'text-green-600 dark:text-green-400',
    },
    'in-progress': {
      icon: Clock,
      text: 'In Progress',
      className:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      iconClassName: 'text-yellow-600 dark:text-yellow-400',
    },
    planned: {
      icon: AlertCircle,
      text: 'Planned',
      className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      iconClassName: 'text-red-600 dark:text-red-400',
    },
    experimental: {
      icon: Sparkles,
      text: 'Experimental',
      className:
        'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      iconClassName: 'text-purple-600 dark:text-purple-400',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.className}`}
    >
      <Icon className={`w-4 h-4 ${config.iconClassName}`} />
      {config.text}
    </div>
  );
};

interface FeatureCardProps {
  feature: Feature;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  isExpanded,
  onToggleExpand,
}) => {
  const Icon = feature.icon;

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <Typography variant="h3" className="font-semibold text-lg">
              {feature.title}
            </Typography>
            <StatusBadge status={feature.status} />
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpand}
          className="flex-shrink-0"
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      <Typography
        variant="body"
        className="text-slate-600 dark:text-slate-300 mb-4"
      >
        {feature.description}
      </Typography>

      {isExpanded && (
        <div className="space-y-4 border-t pt-4">
          {feature.benefits && feature.benefits.length > 0 && (
            <div>
              <Typography variant="h4" className="font-medium mb-2">
                Key Benefits
              </Typography>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <Typography
                      variant="small"
                      className="text-slate-600 dark:text-slate-300"
                    >
                      {benefit}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {feature.details && (
            <div>
              <Typography variant="h4" className="font-medium mb-2">
                Technical Details
              </Typography>
              <Typography
                variant="small"
                className="text-slate-600 dark:text-slate-300"
              >
                {feature.details}
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
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      <Button
        variant={activeCategory === 'all' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => onCategoryChange('all')}
      >
        All Features
      </Button>
      {categories.map(category => (
        <Button
          key={category.key}
          variant={activeCategory === category.key ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange(category.key)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

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

  const categories = Object.entries(FEATURE_CATEGORIES).map(([key, label]) => ({
    key: key as FeatureCategory,
    label: t(`categories.${key}`) || label,
  }));

  // Icon mapping for features
  const getFeatureIcon = (
    iconName: string
  ): React.ComponentType<{ className?: string }> => {
    const iconMap: Record<
      string,
      React.ComponentType<{ className?: string }>
    > = {
      '📱': Smartphone,
      '🏋️': Database,
      '🔥': Flame,
      '🔐': Shield,
      '🎨': Sparkles,
      '📊': BarChart3,
      '🎮': Trophy,
      '👥': Users,
      '🤖': Brain,
      '📈': TrendingUp,
      '👤': UserCheck,
      '🌍': Share2,
      '🏆': Award,
      '🎓': Users,
      '🧠': Brain,
      '🔗': Wifi,
      '📲': Smartphone,
      '🥽': Camera,
      '⛓️': Shield,
    };
    return iconMap[iconName] || Database;
  };

  // Use comprehensive feature data with icon mapping
  const featuresWithIcons = ALL_FEATURES.map(feature => ({
    ...feature,
    icon: getFeatureIcon(feature.icon),
    benefits: feature.keyPoints || [],
    details: feature.longDescription,
  }));

  const features = featuresWithIcons;

  const filteredFeatures =
    activeCategory === 'all'
      ? features
      : features.filter(feature => feature.category === activeCategory);

  const toggleFeatureExpansion = (featureId: string) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(featureId)) {
      newExpanded.delete(featureId);
    } else {
      newExpanded.add(featureId);
    }
    setExpandedFeatures(newExpanded);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <SEO
        title={tCommon('seo.featuresPage.title')}
        description={tCommon('seo.featuresPage.description')}
        keywords={tCommon('seo.defaultKeywords').split(',')}
        structuredData={structuredData}
        type="website"
      />
      <Container className="py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Typography
            variant="h1"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent"
          >
            {t('title')}
          </Typography>
          <Typography
            variant="lead"
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </Typography>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredFeatures.map(feature => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isExpanded={expandedFeatures.has(feature.id)}
              onToggleExpand={() => toggleFeatureExpansion(feature.id)}
            />
          ))}
        </div>

        {/* Technical Specifications Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <Typography
              variant="h2"
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              {t('techStack.title')}
            </Typography>
            <Typography
              variant="body"
              className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              {t('techStack.subtitle')}
            </Typography>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <Typography variant="h3" className="font-semibold">
                  Frontend
                </Typography>
              </div>
              <Typography
                variant="body"
                className="text-slate-600 dark:text-slate-300 font-medium"
              >
                {t('techStack.frontend')}
              </Typography>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <Typography variant="h3" className="font-semibold">
                  Backend
                </Typography>
              </div>
              <Typography
                variant="body"
                className="text-slate-600 dark:text-slate-300 font-medium"
              >
                {t('techStack.backend')}
              </Typography>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Wifi className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <Typography variant="h3" className="font-semibold">
                  Offline Storage
                </Typography>
              </div>
              <Typography
                variant="body"
                className="text-slate-600 dark:text-slate-300 font-medium"
              >
                {t('techStack.offline')}
              </Typography>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <Sparkles className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <Typography variant="h3" className="font-semibold">
                  UI Framework
                </Typography>
              </div>
              <Typography
                variant="body"
                className="text-slate-600 dark:text-slate-300 font-medium"
              >
                {t('techStack.ui')}
              </Typography>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <Typography variant="h3" className="font-semibold">
                  Testing
                </Typography>
              </div>
              <Typography
                variant="body"
                className="text-slate-600 dark:text-slate-300 font-medium"
              >
                {t('techStack.testing')}
              </Typography>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                  <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <Typography variant="h3" className="font-semibold">
                  Deployment
                </Typography>
              </div>
              <Typography
                variant="body"
                className="text-slate-600 dark:text-slate-300 font-medium"
              >
                {t('techStack.deployment')}
              </Typography>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                &lt;2s
              </div>
              <Typography
                variant="small"
                className="text-slate-600 dark:text-slate-300 font-medium"
              >
                Load Time
              </Typography>
            </div>

            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                95%
              </div>
              <Typography
                variant="small"
                className="text-slate-600 dark:text-slate-300 font-medium"
              >
                Uptime
              </Typography>
            </div>

            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                100%
              </div>
              <Typography
                variant="small"
                className="text-slate-600 dark:text-slate-300 font-medium"
              >
                Offline Capable
              </Typography>
            </div>

            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                90+
              </div>
              <Typography
                variant="small"
                className="text-slate-600 dark:text-slate-300 font-medium"
              >
                Lighthouse Score
              </Typography>
            </div>
          </div>
        </div>

        {/* Feature Status Summary */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
          <Typography
            variant="h2"
            className="text-2xl font-bold mb-6 text-center"
          >
            Development Progress
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {features.filter(f => f.status === 'completed').length}
              </div>
              <Typography
                variant="body"
                className="text-slate-600 dark:text-slate-300"
              >
                Completed Features
              </Typography>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {features.filter(f => f.status === 'in-progress').length}
              </div>
              <Typography
                variant="body"
                className="text-slate-600 dark:text-slate-300"
              >
                In Development
              </Typography>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                {features.filter(f => f.status === 'planned').length}
              </div>
              <Typography
                variant="body"
                className="text-slate-600 dark:text-slate-300"
              >
                Planned Features
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
