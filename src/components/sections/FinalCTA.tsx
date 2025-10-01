import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Section } from '../ui/Section';

export const FinalCTA: React.FC = () => {
  const mailtoHref =
    'mailto:team@liftfire.app?subject=LiftFire%20Launch%20Updates&body=I%20would%20like%20to%20stay%20in%20the%20loop%20about%20LiftFire.';

  return (
    <Section variant="gradient" spacing="large" className="relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true" />
      
      <div className="relative z-10 text-center text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur mb-8 shadow-lg">
          <Zap className="h-4 w-4" />
          <span>Beta Access Open</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Ready to level up your training?
        </h2>

        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of lifters using LiftFire to track progress, stay motivated, and hit new PRs with AI-powered insights.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-10">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 text-base font-semibold rounded-full hover:bg-slate-100 hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
          >
            Start your journey
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href={mailtoHref}
            className="inline-flex items-center px-8 py-4 bg-white/10 text-white text-base font-semibold rounded-full hover:bg-white/20 hover:scale-105 transition-all border border-white/30 backdrop-blur shadow-lg"
          >
            Get launch updates
          </a>
        </div>

        <p className="text-sm text-white/80 flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4" />
          Free forever starter plan • No credit card required
        </p>
      </div>
    </Section>
  );
};


