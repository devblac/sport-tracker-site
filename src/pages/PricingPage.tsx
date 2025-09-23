import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/SEO';
import { Container } from '../components/ui/Container';
import { Typography } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useTranslations } from '../hooks/useTranslations';
import { createWebPageSchema, createFAQSchema } from '../utils/structuredData';
import {
  Check,
  X,
  Star,
  Shield,
  Mail,
  MessageCircle,
  ChevronDown,
  Sparkles,
  Crown,
  Zap,
} from 'lucide-react';

interface PricingFeature {
  key: string;
  label: string;
  free: boolean;
  pro: boolean;
  elite: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular: boolean;
  features: Record<string, string>;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  const { t } = useTranslations('pricing');
  const Icon = plan.icon;

  return (
    <Card
      className={`relative p-8 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} hover:scale-105 transition-all duration-300`}
      variant={plan.popular ? 'glow' : 'elevated'}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <Star className="w-4 h-4" />
            {t('plans.mostPopular')}
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <div className={`inline-flex p-4 rounded-2xl mb-4 ${plan.gradient}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        <Typography variant="h3" className="text-2xl font-bold mb-2">
          {plan.name}
        </Typography>

        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {plan.price}
          </span>
          <span className="text-gray-600 dark:text-gray-400 ml-2">
            {plan.period}
          </span>
        </div>

        <Typography variant="body" className="text-gray-600 dark:text-gray-400">
          {plan.description}
        </Typography>
      </div>

      <div className="space-y-4 mb-8">
        {Object.entries(plan.features).map(([key, feature]) => (
          <div key={key} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <Typography
              variant="small"
              className="text-gray-700 dark:text-gray-300"
            >
              {feature}
            </Typography>
          </div>
        ))}
      </div>

      <Button
        variant={plan.popular ? 'gradient' : 'primary'}
        size="lg"
        className="w-full"
        onClick={() => onSelect(plan.id)}
      >
        {plan.id === 'free'
          ? t('cta.startFree')
          : plan.id === 'pro'
            ? t('cta.choosePro')
            : t('cta.chooseElite')}
      </Button>
    </Card>
  );
};

interface FeatureComparisonTableProps {
  features: PricingFeature[];
  onPlanSelect: (planId: string) => void;
}

const FeatureComparisonTable: React.FC<FeatureComparisonTableProps> = ({
  features,
  onPlanSelect,
}) => {
  const { t } = useTranslations('pricing');

  return (
    <div className="mt-20 mb-16">
      <div className="text-center mb-12">
        <Typography variant="h2" className="text-3xl font-bold mb-4">
          {t('comparison.title')}
        </Typography>
        <Typography
          variant="body"
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          {t('comparison.subtitle')}
        </Typography>
      </div>

      <Card className="overflow-hidden" variant="elevated">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left p-6 font-semibold text-gray-900 dark:text-gray-100">
                  {t('comparison.feature')}
                </th>
                <th className="text-center p-6 font-semibold text-gray-900 dark:text-gray-100 min-w-[120px]">
                  <div className="flex flex-col items-center gap-2">
                    <Zap className="w-6 h-6 text-green-600" />
                    {t('plans.free.name')}
                  </div>
                </th>
                <th className="text-center p-6 font-semibold text-gray-900 dark:text-gray-100 min-w-[120px] relative">
                  <div className="flex flex-col items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                    {t('plans.pro.name')}
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {t('plans.mostPopular')}
                      </div>
                    </div>
                  </div>
                </th>
                <th className="text-center p-6 font-semibold text-gray-900 dark:text-gray-100 min-w-[120px]">
                  <div className="flex flex-col items-center gap-2">
                    <Crown className="w-6 h-6 text-purple-600" />
                    {t('plans.elite.name')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Pricing Row */}
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <td className="p-6 font-semibold text-gray-900 dark:text-gray-100">
                  {t('comparison.pricing')}
                </td>
                <td className="text-center p-6">
                  <div className="font-bold text-2xl text-gray-900 dark:text-gray-100">
                    $0
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('plans.free.period')}
                  </div>
                </td>
                <td className="text-center p-6">
                  <div className="font-bold text-2xl text-blue-600">$9.99</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('plans.pro.period')}
                  </div>
                </td>
                <td className="text-center p-6">
                  <div className="font-bold text-2xl text-purple-600">
                    $19.99
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('plans.elite.period')}
                  </div>
                </td>
              </tr>

              {/* Feature Rows */}
              {features.map((feature, index) => (
                <tr
                  key={feature.key}
                  className={`border-b border-gray-100 dark:border-gray-800 ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-900/50'}`}
                >
                  <td className="p-6 text-gray-700 dark:text-gray-300">
                    {feature.label}
                  </td>
                  <td className="text-center p-6">
                    {feature.free ? (
                      <Check
                        className="w-6 h-6 text-green-500 mx-auto"
                        data-testid="check-icon"
                      />
                    ) : (
                      <X
                        className="w-6 h-6 text-gray-400 mx-auto"
                        data-testid="x-icon"
                      />
                    )}
                  </td>
                  <td className="text-center p-6">
                    {feature.pro ? (
                      <Check
                        className="w-6 h-6 text-green-500 mx-auto"
                        data-testid="check-icon"
                      />
                    ) : (
                      <X
                        className="w-6 h-6 text-gray-400 mx-auto"
                        data-testid="x-icon"
                      />
                    )}
                  </td>
                  <td className="text-center p-6">
                    {feature.elite ? (
                      <Check
                        className="w-6 h-6 text-green-500 mx-auto"
                        data-testid="check-icon"
                      />
                    ) : (
                      <X
                        className="w-6 h-6 text-gray-400 mx-auto"
                        data-testid="x-icon"
                      />
                    )}
                  </td>
                </tr>
              ))}

              {/* CTA Row */}
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                <td className="p-6 font-semibold text-gray-900 dark:text-gray-100">
                  {t('comparison.getStarted')}
                </td>
                <td className="text-center p-6">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => onPlanSelect('free')}
                    className="w-full"
                  >
                    {t('cta.startFree')}
                  </Button>
                </td>
                <td className="text-center p-6">
                  <Button
                    variant="gradient"
                    size="md"
                    onClick={() => onPlanSelect('pro')}
                    className="w-full"
                  >
                    {t('cta.choosePro')}
                  </Button>
                </td>
                <td className="text-center p-6">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => onPlanSelect('elite')}
                    className="w-full"
                  >
                    {t('cta.chooseElite')}
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <Card
      className="p-6 hover:shadow-lg transition-all duration-300"
      variant="outlined"
    >
      <button
        className="w-full text-left flex items-center justify-between group"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question}`}
      >
        <Typography
          variant="h4"
          className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
        >
          {question}
        </Typography>
        <div
          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          id={`faq-answer-${question}`}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <Typography
            variant="body"
            className="text-gray-600 dark:text-gray-400"
          >
            {answer}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export const PricingPage: React.FC = () => {
  const { t } = useTranslations('pricing');
  const { t: tCommon, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const comparisonFeatures: PricingFeature[] = [
    {
      key: 'exerciseDatabase',
      label: t('comparison.features.exerciseDatabase'),
      free: true,
      pro: true,
      elite: true,
    },
    {
      key: 'offlineTracking',
      label: t('comparison.features.offlineTracking'),
      free: true,
      pro: true,
      elite: true,
    },
    {
      key: 'basicGameification',
      label: t('comparison.features.basicGameification'),
      free: true,
      pro: true,
      elite: true,
    },
    {
      key: 'localStorage',
      label: t('comparison.features.localStorage'),
      free: true,
      pro: true,
      elite: true,
    },
    {
      key: 'progressCharts',
      label: t('comparison.features.progressCharts'),
      free: true,
      pro: true,
      elite: true,
    },
    {
      key: 'workoutHistory',
      label: t('comparison.features.workoutHistory'),
      free: true,
      pro: true,
      elite: true,
    },
    {
      key: 'customWorkouts',
      label: t('comparison.features.customWorkouts'),
      free: true,
      pro: true,
      elite: true,
    },
    {
      key: 'basicAchievements',
      label: t('comparison.features.basicAchievements'),
      free: true,
      pro: true,
      elite: true,
    },
    {
      key: 'cloudSync',
      label: t('comparison.features.cloudSync'),
      free: false,
      pro: true,
      elite: true,
    },
    {
      key: 'advancedGameification',
      label: t('comparison.features.advancedGameification'),
      free: false,
      pro: true,
      elite: true,
    },
    {
      key: 'socialFeatures',
      label: t('comparison.features.socialFeatures'),
      free: false,
      pro: true,
      elite: true,
    },
    {
      key: 'aiRecommendations',
      label: t('comparison.features.aiRecommendations'),
      free: false,
      pro: true,
      elite: true,
    },
    {
      key: 'advancedAnalytics',
      label: t('comparison.features.advancedAnalytics'),
      free: false,
      pro: true,
      elite: true,
    },
    {
      key: 'customChallenges',
      label: t('comparison.features.customChallenges'),
      free: false,
      pro: true,
      elite: true,
    },
    {
      key: 'prioritySupport',
      label: t('comparison.features.prioritySupport'),
      free: false,
      pro: true,
      elite: true,
    },
    {
      key: 'exportData',
      label: t('comparison.features.exportData'),
      free: false,
      pro: true,
      elite: true,
    },
    {
      key: 'multiDevice',
      label: t('comparison.features.multiDevice'),
      free: false,
      pro: true,
      elite: true,
    },
    {
      key: 'personalTrainer',
      label: t('comparison.features.personalTrainer'),
      free: false,
      pro: false,
      elite: true,
    },
    {
      key: 'customWorkoutPlans',
      label: t('comparison.features.customWorkoutPlans'),
      free: false,
      pro: false,
      elite: true,
    },
    {
      key: 'advancedAI',
      label: t('comparison.features.advancedAI'),
      free: false,
      pro: false,
      elite: true,
    },
    {
      key: 'formAnalysis',
      label: t('comparison.features.formAnalysis'),
      free: false,
      pro: false,
      elite: true,
    },
    {
      key: 'nutritionTracking',
      label: t('comparison.features.nutritionTracking'),
      free: false,
      pro: false,
      elite: true,
    },
    {
      key: 'recoveryOptimization',
      label: t('comparison.features.recoveryOptimization'),
      free: false,
      pro: false,
      elite: true,
    },
    {
      key: 'mentorshipProgram',
      label: t('comparison.features.mentorshipProgram'),
      free: false,
      pro: false,
      elite: true,
    },
    {
      key: 'earlyAccess',
      label: t('comparison.features.earlyAccess'),
      free: false,
      pro: false,
      elite: true,
    },
    {
      key: 'whiteGlove',
      label: t('comparison.features.whiteGlove'),
      free: false,
      pro: false,
      elite: true,
    },
  ];

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: t('plans.free.name'),
      price: t('plans.free.price'),
      period: t('plans.free.period'),
      description: t('plans.free.description'),
      popular: false,
      features: {
        exerciseDatabase: t('plans.free.features.exerciseDatabase'),
        offlineTracking: t('plans.free.features.offlineTracking'),
        basicGameification: t('plans.free.features.basicGameification'),
        localStorage: t('plans.free.features.localStorage'),
        progressCharts: t('plans.free.features.progressCharts'),
        workoutHistory: t('plans.free.features.workoutHistory'),
        customWorkouts: t('plans.free.features.customWorkouts'),
        basicAchievements: t('plans.free.features.basicAchievements'),
      },
      icon: Zap,
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    {
      id: 'pro',
      name: t('plans.pro.name'),
      price: t('plans.pro.price'),
      period: t('plans.pro.period'),
      description: t('plans.pro.description'),
      popular: true,
      features: {
        allFreeFeatures: t('plans.pro.features.allFreeFeatures'),
        cloudSync: t('plans.pro.features.cloudSync'),
        advancedGameification: t('plans.pro.features.advancedGameification'),
        socialFeatures: t('plans.pro.features.socialFeatures'),
        aiRecommendations: t('plans.pro.features.aiRecommendations'),
        advancedAnalytics: t('plans.pro.features.advancedAnalytics'),
        customChallenges: t('plans.pro.features.customChallenges'),
        prioritySupport: t('plans.pro.features.prioritySupport'),
        exportData: t('plans.pro.features.exportData'),
        multiDevice: t('plans.pro.features.multiDevice'),
      },
      icon: Sparkles,
      gradient: 'bg-gradient-to-br from-blue-500 to-purple-600',
    },
    {
      id: 'elite',
      name: t('plans.elite.name'),
      price: t('plans.elite.price'),
      period: t('plans.elite.period'),
      description: t('plans.elite.description'),
      popular: false,
      features: {
        allProFeatures: t('plans.elite.features.allProFeatures'),
        personalTrainer: t('plans.elite.features.personalTrainer'),
        customWorkoutPlans: t('plans.elite.features.customWorkoutPlans'),
        advancedAI: t('plans.elite.features.advancedAI'),
        formAnalysis: t('plans.elite.features.formAnalysis'),
        nutritionTracking: t('plans.elite.features.nutritionTracking'),
        recoveryOptimization: t('plans.elite.features.recoveryOptimization'),
        mentorshipProgram: t('plans.elite.features.mentorshipProgram'),
        earlyAccess: t('plans.elite.features.earlyAccess'),
        whiteGlove: t('plans.elite.features.whiteGlove'),
      },
      icon: Crown,
      gradient: 'bg-gradient-to-br from-purple-600 to-pink-600',
    },
  ];

  const faqItems = [
    {
      id: 'whatIncluded',
      question: t('faq.questions.whatIncluded.question'),
      answer: t('faq.questions.whatIncluded.answer'),
    },
    {
      id: 'upgradeAnytime',
      question: t('faq.questions.upgradeAnytime.question'),
      answer: t('faq.questions.upgradeAnytime.answer'),
    },
    {
      id: 'dataSync',
      question: t('faq.questions.dataSync.question'),
      answer: t('faq.questions.dataSync.answer'),
    },
    {
      id: 'studentDiscount',
      question: t('faq.questions.studentDiscount.question'),
      answer: t('faq.questions.studentDiscount.answer'),
    },
    {
      id: 'cancelAnytime',
      question: t('faq.questions.cancelAnytime.question'),
      answer: t('faq.questions.cancelAnytime.answer'),
    },
    {
      id: 'offlineWork',
      question: t('faq.questions.offlineWork.question'),
      answer: t('faq.questions.offlineWork.answer'),
    },
  ];

  const handlePlanSelect = (planId: string) => {
    // In a real app, this would handle plan selection/payment
    console.log('Selected plan:', planId);
    // For now, we'll just show an alert
    alert(
      `You selected the ${planId} plan! This would normally redirect to payment processing.`
    );
  };

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  // Create FAQ structured data
  const faqData = [
    { question: t('faq.items.0.question'), answer: t('faq.items.0.answer') },
    { question: t('faq.items.1.question'), answer: t('faq.items.1.answer') },
    { question: t('faq.items.2.question'), answer: t('faq.items.2.answer') },
    { question: t('faq.items.3.question'), answer: t('faq.items.3.answer') },
    { question: t('faq.items.4.question'), answer: t('faq.items.4.answer') },
    { question: t('faq.items.5.question'), answer: t('faq.items.5.answer') },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      createWebPageSchema(
        tCommon('seo.pricingPage.title'),
        tCommon('seo.pricingPage.description'),
        typeof window !== 'undefined'
          ? window.location.href
          : 'https://liftfire.app/pricing',
        currentLanguage
      ),
      createFAQSchema(faqData),
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <SEO
        title={tCommon('seo.pricingPage.title')}
        description={tCommon('seo.pricingPage.description')}
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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map(plan => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={handlePlanSelect}
            />
          ))}
        </div>

        {/* Upgrade Encouragement Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 mb-16 text-center">
          <Typography variant="h3" className="text-2xl font-bold mb-4">
            {t('upgrade.title')}
          </Typography>
          <Typography
            variant="body"
            className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto"
          >
            {t('upgrade.description')}
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="gradient"
              size="lg"
              onClick={() => handlePlanSelect('pro')}
            >
              {t('upgrade.startWithPro')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handlePlanSelect('free')}
            >
              {t('upgrade.tryFreeFirst')}
            </Button>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <FeatureComparisonTable
          features={comparisonFeatures}
          onPlanSelect={handlePlanSelect}
        />

        {/* Money-Back Guarantee */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-8 mb-16 text-center">
          <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <Typography
            variant="h3"
            className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200"
          >
            {t('guarantee.title')}
          </Typography>
          <Typography
            variant="body"
            className="text-green-700 dark:text-green-300 max-w-2xl mx-auto"
          >
            {t('guarantee.description')}
          </Typography>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-3xl font-bold mb-4">
              {t('faq.title')}
            </Typography>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map(item => (
              <FAQItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === item.id}
                onToggle={() => toggleFAQ(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Final Upgrade CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-800 dark:to-blue-800 rounded-2xl p-8 mb-16 text-center text-white">
          <Typography
            variant="h3"
            className="text-2xl font-bold mb-4 text-white"
          >
            {t('finalCta.title')}
          </Typography>
          <Typography
            variant="body"
            className="text-blue-100 mb-6 max-w-2xl mx-auto"
          >
            {t('finalCta.description')}
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => handlePlanSelect('free')}
            >
              {t('finalCta.startFree')}
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => handlePlanSelect('pro')}
            >
              {t('finalCta.upgradeToPro')}
            </Button>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 text-center">
          <Typography variant="h3" className="text-2xl font-bold mb-4">
            {t('contact.title')}
          </Typography>
          <Typography
            variant="body"
            className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            {t('contact.description')}
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon={<Mail className="w-5 h-5" />}
              onClick={() => window.open('mailto:support@liftfire.app')}
            >
              {t('contact.email')}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
              onClick={() =>
                window.open('https://discord.gg/liftfire', '_blank')
              }
            >
              {t('contact.discord')}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
