import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const HERO_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Offline-first logging',
    description: 'Never lose a set—even in basements or airplane mode.',
  },
  {
    icon: Activity,
    title: 'AI coaching cues',
    description: 'Adaptive plans that react to your fatigue and goals.',
  },
  {
    icon: TrendingUp,
    title: 'Progress you can feel',
    description: 'Earn XP, streaks, and achievements that keep you showing up.',
  },
];

const PhoneStatRow = ({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <div className="flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3 hover:bg-muted/70 transition-colors group">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all">
        <Icon className="h-5 w-5 text-foreground group-hover:scale-110 transition-transform" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{helper}</p>
      </div>
    </div>
    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      {value}
    </span>
  </div>
);

export const HeroSection: React.FC = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 pb-24 pt-32">
      {/* Animated glow orbs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-bounce-gentle"
        aria-hidden="true"
      />

      <Container size="xl" padding="lg" className="relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium tracking-wide shadow-lg backdrop-blur animate-slide-up">
              <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
              <span className="text-foreground">
                Beta access now open for dedicated lifters
              </span>
            </div>

            <div className="space-y-6">
              <Typography
                variant="h1"
                className="max-w-3xl text-4xl font-extrabold text-foreground sm:text-5xl lg:text-6xl animate-slide-up"
                style={{ animationDelay: '0.1s' }}
              >
                Train smarter, stay consistent, and{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  level up every session
                </span>
                .
              </Typography>
              <Typography
                variant="lead"
                className="max-w-2xl text-lg text-muted-foreground sm:text-xl animate-slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                LiftFire is the gamified workout companion built for focused
                strength athletes. Track your lifts offline, unlock AI coaching
                insights, and compete with your crew—without the noise.
              </Typography>
            </div>

            <div
              className="grid gap-4 sm:grid-cols-2 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              {HERO_FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card/50 backdrop-blur p-5 hover:bg-card hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <Icon className="mb-3 h-6 w-6 text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all" />
                  <p className="text-sm font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col items-start gap-4 sm:flex-row sm:items-center animate-slide-up"
              style={{ animationDelay: '0.4s' }}
            >
              <Button variant="gradient" size="lg" asChild className="group">
                <Link to="/contact" className="flex items-center gap-3">
                  {'Join the waitlist'}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="group">
                <Link to="/features" className="flex items-center gap-3">
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch feature tour
                </Link>
              </Button>
            </div>

            <div
              className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:gap-6 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex -space-x-3">
                {['A', 'B', 'C'].map(letter => (
                  <div
                    key={letter}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-semibold text-white backdrop-blur shadow-lg hover:scale-110 transition-transform"
                  >
                    {letter}
                  </div>
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-rose-500 to-orange-400 text-sm font-semibold text-white shadow-lg hover:scale-110 transition-transform">
                  +
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Trusted by{' '}
                <span className="font-semibold text-foreground">
                  10,000+ lifters
                </span>{' '}
                · <span className="text-amber-500">4.9/5</span> beta
                satisfaction score
              </div>
            </div>
          </div>

          <div
            className="relative flex justify-center lg:justify-end animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <div
              className="absolute -z-[1] -top-10 right-0 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl animate-pulse"
              aria-hidden="true"
            />
            <div
              className="absolute -z-[1] bottom-10 left-0 h-64 w-64 rounded-full bg-blue-500/30 blur-3xl animate-pulse"
              style={{ animationDelay: '1.5s' }}
              aria-hidden="true"
            />

            <Card
              variant="glow"
              padding="lg"
              hover={false}
              className="relative w-full max-w-sm rounded-[2.5rem] border border-border bg-card/80 backdrop-blur-2xl shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-500"
            >
              <div
                className="absolute inset-0 rounded-[2.5rem] border border-border/50"
                aria-hidden="true"
              />
              <div className="space-y-6">
                <div className="flex items-start justify-between text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  <span>Session · Upper push</span>
                  <span className="text-emerald-500">Offline mode</span>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Welcome back, Alex
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    Ready to crush your goals?
                  </p>
                </div>

                <div className="space-y-4">
                  <PhoneStatRow
                    icon={Activity}
                    label="Workout streak"
                    helper="Keep it going!"
                    value="12 days"
                  />
                  <PhoneStatRow
                    icon={TrendingUp}
                    label="XP earned"
                    helper="+450 today"
                    value="3,240"
                  />
                  <PhoneStatRow
                    icon={Users}
                    label="Crew challenge"
                    helper="Team Nimbus is leading"
                    value="+18%"
                  />
                </div>

                <div className="rounded-2xl border border-border bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                    AI insight
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    You hit a 4-week volume PR on bench. Add a deload set this
                    weekend for maximum recovery.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
