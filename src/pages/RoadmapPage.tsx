import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { useTranslations } from '../hooks/useTranslations';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { createWebPageSchema } from '../utils/structuredData';
import {
  CheckCircle,
  Clock,
  Calendar,
  Target,
  Users,
  MessageSquare,
  Mail,
  ArrowRight,
  Zap,
  Brain,
  Heart,
  Globe,
  ChevronDown,
  Star,
  Sparkles,
  Rocket,
  TrendingUp,
} from 'lucide-react';

interface Quarter {
  id: string;
  title: string;
  theme: string;
  status: 'completed' | 'in-progress' | 'planned';
  description: string;
  features: string[];
  successMetrics: string[];
}

interface LongTermGoal {
  title: string;
  description: string;
  timeline: string;
}

const RoadmapPage: React.FC = () => {
  const { t } = useTranslations('roadmap');
  const { t: tCommon, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [activeSection, setActiveSection] = useState<string>('');

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Track active section for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['timeline', 'vision', 'community', 'updates'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parse quarters data from translations
  const quarters: Quarter[] = [
    {
      id: 'q4-2023',
      title: t('quarters.q4-2023.title'),
      theme: t('quarters.q4-2023.theme'),
      status: t('quarters.q4-2023.status') as
        | 'completed'
        | 'in-progress'
        | 'planned',
      description: t('quarters.q4-2023.description'),
      features: t('quarters.q4-2023.features', {
        returnObjects: true,
      }) as string[],
      successMetrics: t('quarters.q4-2023.successMetrics', {
        returnObjects: true,
      }) as string[],
    },
    {
      id: 'q1-2024',
      title: t('quarters.q1-2024.title'),
      theme: t('quarters.q1-2024.theme'),
      status: t('quarters.q1-2024.status') as
        | 'completed'
        | 'in-progress'
        | 'planned',
      description: t('quarters.q1-2024.description'),
      features: t('quarters.q1-2024.features', {
        returnObjects: true,
      }) as string[],
      successMetrics: t('quarters.q1-2024.successMetrics', {
        returnObjects: true,
      }) as string[],
    },
    {
      id: 'q2-2024',
      title: t('quarters.q2-2024.title'),
      theme: t('quarters.q2-2024.theme'),
      status: t('quarters.q2-2024.status') as
        | 'completed'
        | 'in-progress'
        | 'planned',
      description: t('quarters.q2-2024.description'),
      features: t('quarters.q2-2024.features', {
        returnObjects: true,
      }) as string[],
      successMetrics: t('quarters.q2-2024.successMetrics', {
        returnObjects: true,
      }) as string[],
    },
    {
      id: 'q3-2024',
      title: t('quarters.q3-2024.title'),
      theme: t('quarters.q3-2024.theme'),
      status: t('quarters.q3-2024.status') as
        | 'completed'
        | 'in-progress'
        | 'planned',
      description: t('quarters.q3-2024.description'),
      features: t('quarters.q3-2024.features', {
        returnObjects: true,
      }) as string[],
      successMetrics: t('quarters.q3-2024.successMetrics', {
        returnObjects: true,
      }) as string[],
    },
    {
      id: 'q4-2024',
      title: t('quarters.q4-2024.title'),
      theme: t('quarters.q4-2024.theme'),
      status: t('quarters.q4-2024.status') as
        | 'completed'
        | 'in-progress'
        | 'planned',
      description: t('quarters.q4-2024.description'),
      features: t('quarters.q4-2024.features', {
        returnObjects: true,
      }) as string[],
      successMetrics: t('quarters.q4-2024.successMetrics', {
        returnObjects: true,
      }) as string[],
    },
  ];

  const longTermGoals: LongTermGoal[] = t('longTerm.goals', {
    returnObjects: true,
  }) as LongTermGoal[];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'planned':
        return <Calendar className="w-6 h-6 text-blue-500" />;
      default:
        return <Calendar className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'in-progress':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'planned':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getLongTermIcon = (index: number) => {
    const icons = [Brain, Zap, Heart, Globe];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-8 h-8 text-primary" />;
  };

  const getVisionCardGradient = (index: number) => {
    const gradients = [
      'from-blue-500/10 to-purple-500/10',
      'from-purple-500/10 to-pink-500/10',
      'from-green-500/10 to-blue-500/10',
      'from-orange-500/10 to-red-500/10',
    ];
    return gradients[index % gradients.length];
  };

  const structuredData = createWebPageSchema(
    tCommon('seo.roadmapPage.title'),
    tCommon('seo.roadmapPage.description'),
    typeof window !== 'undefined'
      ? window.location.href
      : 'https://liftfire.app/roadmap',
    currentLanguage
  );

  return (
    <div className="py-16 sm:py-24">
      <SEO
        title={tCommon('seo.roadmapPage.title')}
        description={tCommon('seo.roadmapPage.description')}
        keywords={tCommon('seo.defaultKeywords').split(',')}
        structuredData={structuredData}
        type="website"
      />
      <Container>
        {/* Header Section */}
        <div className="text-center mb-16">
          <Typography variant="h1" className="mb-4">
            {t('title')}
          </Typography>
          <Typography
            variant="lead"
            className="text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            {t('subtitle')}
          </Typography>

          {/* Navigation Menu */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'timeline', label: 'Development Timeline', icon: Calendar },
              { id: 'vision', label: 'Long-term Vision', icon: Rocket },
              { id: 'community', label: 'Community Input', icon: Users },
              { id: 'updates', label: 'Stay Updated', icon: TrendingUp },
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeSection === id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => scrollToSection(id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-16">
          <Card className="p-8">
            <Typography variant="h2" className="mb-4">
              {t('intro.title')}
            </Typography>
            <Typography variant="body" className="text-muted-foreground mb-4">
              {t('intro.description')}
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              {t('intro.philosophy')}
            </Typography>
          </Card>
        </div>

        {/* Quarterly Timeline */}
        <div id="timeline" className="mb-16 scroll-mt-24">
          <Typography variant="h2" className="text-center mb-12">
            Development Timeline
          </Typography>

          <div className="space-y-8">
            {quarters.map((quarter, index) => (
              <div key={quarter.id} className="relative">
                {/* Timeline connector */}
                {index < quarters.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-16 bg-border hidden md:block" />
                )}

                <Card
                  className={`p-6 border-l-4 ${getStatusColor(quarter.status)}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {getStatusIcon(quarter.status)}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <Typography variant="h3" className="mb-2 sm:mb-0">
                          {quarter.title}
                        </Typography>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                          {quarter.theme}
                        </span>
                      </div>

                      <Typography
                        variant="body"
                        className="text-muted-foreground mb-6"
                      >
                        {quarter.description}
                      </Typography>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Features */}
                        <div>
                          <Typography
                            variant="h4"
                            className="mb-3 flex items-center gap-2"
                          >
                            <Target className="w-5 h-5 text-primary" />
                            Key Features
                          </Typography>
                          <ul className="space-y-2">
                            {quarter.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-start gap-2"
                              >
                                <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <Typography
                                  variant="small"
                                  className="text-muted-foreground"
                                >
                                  {feature}
                                </Typography>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Success Metrics */}
                        <div>
                          <Typography
                            variant="h4"
                            className="mb-3 flex items-center gap-2"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            Success Metrics
                          </Typography>
                          <ul className="space-y-2">
                            {quarter.successMetrics.map(
                              (metric, metricIndex) => (
                                <li
                                  key={metricIndex}
                                  className="flex items-start gap-2"
                                >
                                  <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <Typography
                                    variant="small"
                                    className="text-muted-foreground"
                                  >
                                    {metric}
                                  </Typography>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Long-term Vision */}
        <div id="vision" className="mb-16 scroll-mt-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Future Vision</span>
            </div>
            <Typography variant="h2" className="mb-4">
              {t('longTerm.title')}
            </Typography>
            <Typography
              variant="lead"
              className="text-muted-foreground max-w-3xl mx-auto mb-8"
            >
              {t('longTerm.description')}
            </Typography>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {longTermGoals.map((goal, index) => (
              <Card
                key={index}
                className={`p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${getVisionCardGradient(index)} border-0`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-full bg-white/10 backdrop-blur-sm">
                    {getLongTermIcon(index)}
                  </div>
                  <div className="flex-1">
                    <Typography
                      variant="h4"
                      className="mb-2 flex items-center gap-2"
                    >
                      {goal.title}
                      <Star className="w-4 h-4 text-yellow-500" />
                    </Typography>
                    <Typography
                      variant="body"
                      className="text-muted-foreground mb-4"
                    >
                      {goal.description}
                    </Typography>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {goal.timeline}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Vision Statement */}
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-primary/20">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 mb-4">
                <Rocket className="w-6 h-6 text-primary" />
                <Typography variant="h3" className="text-primary">
                  Our Ultimate Vision
                </Typography>
              </div>
              <Typography
                variant="body"
                className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed"
              >
                By 2026, LiftFire will be the world's most comprehensive fitness
                ecosystem, seamlessly integrating AI coaching, virtual reality
                training, health monitoring, and global community features to
                create personalized fitness journeys that adapt and evolve with
                each user's unique goals and lifestyle.
              </Typography>
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <Rocket className="w-4 h-4" />
                  Join the Journey
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Share Your Vision
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Community Input Section */}
        <div id="community" className="mb-16 scroll-mt-24">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Community Driven</span>
              </div>
              <Typography variant="h2" className="mb-4">
                {t('community.title')}
              </Typography>
              <Typography
                variant="lead"
                className="text-muted-foreground max-w-2xl mx-auto mb-6"
              >
                {t('community.description')}
              </Typography>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <Typography
                  variant="h4"
                  className="mb-4 flex items-center gap-2"
                >
                  <Users className="w-5 h-5 text-primary" />
                  How We Listen
                </Typography>
                <ul className="space-y-3">
                  {(
                    t('community.ways', { returnObjects: true }) as string[]
                  ).map((way, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                    >
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <Typography
                        variant="body"
                        className="text-muted-foreground"
                      >
                        {way}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Typography variant="h4" className="mb-4">
                  {t('community.cta.title')}
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground mb-6"
                >
                  {t('community.cta.description')}
                </Typography>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Button
                    variant="primary"
                    className="flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {t('community.cta.discord')}
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Mail className="w-4 h-4" />
                    {t('community.cta.email')}
                  </Button>
                </div>

                {/* Community Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                    <Typography variant="h4" className="text-primary">
                      2.5K+
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-muted-foreground"
                    >
                      Discord Members
                    </Typography>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                    <Typography variant="h4" className="text-secondary">
                      150+
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-muted-foreground"
                    >
                      Feature Requests
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stay Updated Section */}
        <div id="updates" className="scroll-mt-24">
          <Card className="p-8 bg-gradient-to-br from-secondary/5 to-primary/5 border-secondary/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-4">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Stay Connected</span>
              </div>
              <Typography variant="h2" className="mb-4">
                {t('updates.title')}
              </Typography>
              <Typography
                variant="lead"
                className="text-muted-foreground max-w-2xl mx-auto"
              >
                {t('updates.subtitle')}
              </Typography>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <Typography variant="h4" className="mb-3">
                  {t('updates.newsletter.title')}
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground mb-6"
                >
                  {t('updates.newsletter.description')}
                </Typography>
                <Button
                  variant="primary"
                  size="lg"
                  className="hover:scale-105 transition-transform"
                >
                  {t('updates.newsletter.cta')}
                </Button>
              </div>

              <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-4">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <Typography variant="h4" className="mb-3">
                  {t('updates.social.title')}
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground mb-6"
                >
                  {t('updates.social.description')}
                </Typography>
                <div className="flex justify-center gap-3 flex-wrap">
                  {(
                    t('updates.social.platforms', {
                      returnObjects: true,
                    }) as string[]
                  ).map((platform, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="hover:scale-105 transition-transform bg-white/30 dark:bg-gray-700/30"
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default RoadmapPage;
