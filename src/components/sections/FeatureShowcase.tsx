import React from 'react';
import { Zap, Shield, Trophy, Users, Smartphone, Brain, Heart } from 'lucide-react';
import { Container } from '../ui/Container';
import { Typography } from '../ui/Typography';

export const FeatureShowcase: React.FC = () => {

  const features = [
    {
      icon: Zap,
      title: '100% Offline First',
      description: 'Track workouts anywhere, even without internet. Your data syncs automatically when connected.',
      gradient: 'from-yellow-400 to-orange-500',
      bgGradient: 'from-yellow-500/10 to-orange-500/10',
      delay: '0s',
    },
    {
      icon: Trophy,
      title: 'Gamified Experience',
      description: 'Earn XP, unlock achievements, and compete with friends. Make fitness fun and addictive.',
      gradient: 'from-purple-400 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      delay: '0.2s',
    },
    {
      icon: Users,
      title: 'Social Workouts',
      description: 'Connect with gym buddies, join challenges, and share your progress with a supportive community.',
      gradient: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      delay: '0.4s',
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations, plateau detection, and form analysis powered by AI.',
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      delay: '0.6s',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays yours. End-to-end encryption and local storage ensure complete privacy.',
      gradient: 'from-indigo-400 to-purple-500',
      bgGradient: 'from-indigo-500/10 to-purple-500/10',
      delay: '0.8s',
    },
    {
      icon: Smartphone,
      title: 'Progressive Web App',
      description: 'Install on any device. Works like a native app with offline capabilities and push notifications.',
      gradient: 'from-pink-400 to-red-500',
      bgGradient: 'from-pink-500/10 to-red-500/10',
      delay: '1s',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <Container>
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 glass rounded-full text-slate-700 dark:text-slate-300 text-sm font-semibold mb-8">
            <Heart className="w-4 h-4 text-red-500 mr-2" />
            <span>Built for fitness enthusiasts, by fitness enthusiasts</span>
          </div>
          
          <Typography
            variant="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6"
          >
            Why Choose{' '}
            <span className="text-gradient-brand">LiftFire</span>?
          </Typography>
          
          <Typography
            variant="lead"
            className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
          >
            We've reimagined fitness tracking from the ground up. Here's what makes us different from every other fitness app.
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative p-8 glass rounded-3xl hover:scale-105 transition-all duration-500 opacity-0 animate-fade-in`}
                style={{ animationDelay: feature.delay }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 animate-glow-pulse`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <Typography
                    variant="h3"
                    className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-slate-800 dark:group-hover:text-slate-100 transition-colors"
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body"
                    className="text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors"
                  >
                    {feature.description}
                  </Typography>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/20 transition-colors duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 p-6 glass rounded-2xl">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-full border-2 border-white"></div>
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-sm font-bold text-white">+</span>
              </div>
            </div>
            <div className="text-left">
              <div className="text-slate-900 dark:text-white font-bold">Join 10,000+ users</div>
              <div className="text-slate-600 dark:text-slate-300 text-sm">Already transforming their fitness journey</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};