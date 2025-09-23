import React from 'react';
import {
  Wifi,
  Trophy,
  Users,
  Zap,
  Shield,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Typography } from '../ui/Typography';
import { Container } from '../ui/Container';
import { useTranslations } from '../../hooks/useTranslations';

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  benefits: string[];
  gradient: string;
  accentColor: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  benefits,
  gradient,
  accentColor,
  index,
}) => {
  return (
    <Card
      variant="glow"
      className={`p-8 h-full flex flex-col group relative overflow-hidden opacity-0 animate-fade-in`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Icon container with gradient background */}
      <div
        className={`relative flex items-center justify-center w-16 h-16 ${gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <Typography
        variant="h3"
        className="mb-4 font-bold text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
      >
        {title}
      </Typography>

      <Typography
        variant="body"
        className="text-slate-600 dark:text-slate-300 mb-6 flex-grow leading-relaxed"
      >
        {description}
      </Typography>

      <div className="space-y-3">
        {Array.isArray(benefits) &&
          benefits.map((benefit, benefitIndex) => (
            <div
              key={benefitIndex}
              className="flex items-start gap-3 opacity-0 animate-slide-up"
              style={{
                animationDelay: `${index * 0.2 + benefitIndex * 0.1 + 0.3}s`,
              }}
            >
              <CheckCircle
                className={`w-5 h-5 ${accentColor} flex-shrink-0 mt-0.5`}
              />
              <Typography
                variant="small"
                className="text-slate-700 dark:text-slate-200 font-medium"
              >
                {benefit}
              </Typography>
            </div>
          ))}
      </div>

      {/* Hover effect border */}
      <div
        className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors duration-300`}
      />
    </Card>
  );
};

export const FeatureGrid: React.FC = () => {
  const { t } = useTranslations('homepage');

  const features = [
    {
      icon: Wifi,
      title: t('features.offline.title'),
      description: t('features.offline.description'),
      benefits: Array.isArray(
        t('features.offline.benefits', { returnObjects: true })
      )
        ? (t('features.offline.benefits', { returnObjects: true }) as string[])
        : [],
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      accentColor: 'text-blue-500',
    },
    {
      icon: Trophy,
      title: t('features.gamification.title'),
      description: t('features.gamification.description'),
      benefits: Array.isArray(
        t('features.gamification.benefits', { returnObjects: true })
      )
        ? (t('features.gamification.benefits', {
            returnObjects: true,
          }) as string[])
        : [],
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
      accentColor: 'text-purple-500',
    },
    {
      icon: Users,
      title: t('features.social.title'),
      description: t('features.social.description'),
      benefits: Array.isArray(
        t('features.social.benefits', { returnObjects: true })
      )
        ? (t('features.social.benefits', { returnObjects: true }) as string[])
        : [],
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
      accentColor: 'text-green-500',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Core Features</span>
          </div>

          <Typography
            variant="h2"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent"
          >
            {t('features.title')}
          </Typography>

          <Typography
            variant="lead"
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('features.subtitle')}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              benefits={feature.benefits}
              gradient={feature.gradient}
              accentColor={feature.accentColor}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA section */}
        <div
          className="text-center mt-20 opacity-0 animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
            <Zap className="w-6 h-6" />
            <span className="font-semibold text-lg">
              Experience the difference
            </span>
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </Container>
    </section>
  );
};
