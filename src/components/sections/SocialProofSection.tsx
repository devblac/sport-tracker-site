import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Activity,
  Star,
  Globe,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Typography } from '../ui/Typography';
import { Card } from '../ui/Card';
import { useTranslations } from '../../hooks/useTranslations';

interface StatisticProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

interface StatisticProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  gradient: string;
  color: string;
  index: number;
}

const Statistic: React.FC<StatisticProps> = ({
  icon: Icon,
  value,
  label,
  gradient,
  color,
  index,
}) => (
  <div
    className={`text-center group opacity-0 animate-fade-in`}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className={`flex justify-center mb-4 relative`}>
      <div
        className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl`}
      >
        <Icon className="h-8 w-8 text-white" />
        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
    <Typography
      variant="h3"
      className={`text-3xl font-bold ${color} mb-2 group-hover:scale-105 transition-transform duration-300`}
    >
      {value}
    </Typography>
    <Typography
      variant="body"
      className="text-slate-600 dark:text-slate-300 font-medium"
    >
      {label}
    </Typography>
  </div>
);

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  isActive: boolean;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  isActive,
}) => (
  <Card
    variant="glass"
    className={`p-8 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} backdrop-blur-md border border-white/20 dark:border-slate-700/20`}
  >
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <Typography
          variant="body"
          className="text-lg leading-relaxed text-slate-700 dark:text-slate-200 flex-grow"
        >
          "{quote}"
        </Typography>
      </div>

      <div className="flex items-center">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
          <Typography variant="body" className="text-white font-bold text-lg">
            {author.charAt(0)}
          </Typography>
        </div>
        <div>
          <Typography
            variant="body"
            className="font-bold text-slate-900 dark:text-white text-lg"
          >
            {author}
          </Typography>
          <Typography
            variant="small"
            className="text-slate-600 dark:text-slate-400 font-medium"
          >
            {role}
          </Typography>
        </div>
      </div>
    </div>
  </Card>
);

export const SocialProofSection: React.FC = () => {
  const { t } = useTranslations();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const testimonialsData = t('homepage:socialProof.testimonials.items', {
    returnObjects: true,
  });
  const testimonials = Array.isArray(testimonialsData)
    ? (testimonialsData as Array<{
        quote: string;
        author: string;
        role: string;
      }>)
    : [];

  const stats = [
    {
      icon: Users,
      value: t('homepage:socialProof.stats.users'),
      label: 'Active Users',
      gradient: 'from-blue-500 to-cyan-500',
      color: 'text-blue-500',
    },
    {
      icon: Activity,
      value: t('homepage:socialProof.stats.workouts'),
      label: 'Workouts Tracked',
      gradient: 'from-green-500 to-emerald-500',
      color: 'text-green-500',
    },
    {
      icon: Star,
      value: t('homepage:socialProof.stats.satisfaction'),
      label: 'User Satisfaction',
      gradient: 'from-yellow-500 to-orange-500',
      color: 'text-yellow-500',
    },
    {
      icon: Globe,
      value: t('homepage:socialProof.stats.languages'),
      label: 'Languages',
      gradient: 'from-purple-500 to-pink-500',
      color: 'text-purple-500',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 1) {
      intervalRef.current = window.setInterval(nextTestimonial, 5000);
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, testimonials.length, nextTestimonial]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTestimonial();
      setIsAutoPlaying(false);
    }
    if (isRightSwipe) {
      prevTestimonial();
      setIsAutoPlaying(false);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Statistics Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300 text-sm font-semibold mb-6 opacity-0 animate-fade-in">
            <Star className="w-4 h-4" />
            <span>Trusted Worldwide</span>
          </div>

          <Typography
            variant="h2"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent opacity-0 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            {t('homepage:socialProof.title')}
          </Typography>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mt-16">
            {stats.map((stat, index) => (
              <Statistic
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                gradient={stat.gradient}
                color={stat.color}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Typography
                variant="h3"
                className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent opacity-0 animate-fade-in"
                style={{ animationDelay: '0.5s' }}
              >
                {t('homepage:socialProof.testimonials.title')}
              </Typography>
              <Typography
                variant="body"
                className="text-xl text-slate-600 dark:text-slate-300 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.6s' }}
              >
                Real stories from our amazing community
              </Typography>
            </div>

            <div
              className="relative opacity-0 animate-fade-in"
              style={{ animationDelay: '0.7s' }}
            >
              {/* Testimonial Cards */}
              <div
                className="relative h-80 md:h-64 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentTestimonial
                        ? 'opacity-100 translate-x-0'
                        : index < currentTestimonial
                          ? 'opacity-0 -translate-x-full'
                          : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <TestimonialCard
                      quote={testimonial.quote}
                      author={testimonial.author}
                      role={testimonial.role}
                      isActive={index === currentTestimonial}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={() => {
                      prevTestimonial();
                      setIsAutoPlaying(false);
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 glass rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-white/20 dark:border-slate-700/20"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                  </button>

                  <button
                    onClick={() => {
                      nextTestimonial();
                      setIsAutoPlaying(false);
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 glass rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-white/20 dark:border-slate-700/20"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex justify-center mt-10 space-x-3">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToTestimonial(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125 shadow-lg'
                            : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 hover:scale-110'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
