import React from 'react';
import { Sparkles, Brain, Users, Trophy, Zap, TrendingUp } from 'lucide-react';
import { Section } from '../../ui/Section';

export const CommunityAiSection: React.FC = () => (
  <Section variant="default" spacing="default">
    {/* AI Insights Highlight Bar */}
    <div className="mb-12 rounded-2xl border-2 border-blue-500/50 bg-gradient-to-r from-blue-500/10 to-violet-500/10 p-6 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              AI Insight
            </span>
          </div>
          <p className="text-lg font-semibold text-slate-100 mb-1">
            You hit a 4-week volume PR on bench press
          </p>
          <p className="text-sm text-slate-300">
            Consider adding a deload set this weekend for maximum recovery and
            continued progress.
          </p>
        </div>
      </div>
    </div>

    <div className="grid gap-8 lg:grid-cols-2">
      {/* AI-Powered Coaching */}
      <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-8 shadow-md hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
            <Brain className="h-5 w-5 text-violet-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            AI-Powered Coaching
          </h2>
        </div>
        <p className="text-base text-slate-300 mb-6 leading-relaxed">
          Our training brain watches your load, volume, velocity, and recovery
          markers to give the kind of feedback you expect from an elite coach.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 hover:border-violet-500/50 transition-colors">
            <Sparkles className="h-5 w-5 text-violet-500 mb-2" />
            <p className="text-sm font-semibold text-slate-100 mb-1">
              Plateau watch
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects stalled lifts and suggests volume or tempo tweaks.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 hover:border-violet-500/50 transition-colors">
            <TrendingUp className="h-5 w-5 text-violet-500 mb-2" />
            <p className="text-sm font-semibold text-slate-100 mb-1">
              Recovery IQ
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Balances intensity with deload recommendations based on fatigue
              trends.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 hover:border-violet-500/50 transition-colors">
            <Zap className="h-5 w-5 text-violet-500 mb-2" />
            <p className="text-sm font-semibold text-slate-100 mb-1">
              Smart templates
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-adapts programs when you miss a session or shift priorities.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 hover:border-violet-500/50 transition-colors">
            <Sparkles className="h-5 w-5 text-violet-500 mb-2" />
            <p className="text-sm font-semibold text-slate-100 mb-1">
              Insight feeds
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Surface key metrics after each workout so you know exactly what to
              adjust.
            </p>
          </div>
        </div>
      </div>

      {/* Community & Crew Challenges */}
      <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-8 shadow-md hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/50 transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">
            Community & Crews
          </h2>
        </div>
        <p className="text-base text-slate-300 mb-6 leading-relaxed">
          Train with your crew, compete in challenges, and stay motivated
          through shared progress. LiftFire makes strength training social.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 hover:border-blue-500/50 transition-colors">
            <Users className="h-5 w-5 text-blue-500 mb-2" />
            <p className="text-sm font-semibold text-slate-100 mb-1">
              Crew challenges
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Form teams, set collective goals, and compete on leaderboards.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 hover:border-blue-500/50 transition-colors">
            <Trophy className="h-5 w-5 text-blue-500 mb-2" />
            <p className="text-sm font-semibold text-slate-100 mb-1">
              Achievements
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Earn badges and celebrate milestones with your training partners.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 hover:border-blue-500/50 transition-colors">
            <Sparkles className="h-5 w-5 text-blue-500 mb-2" />
            <p className="text-sm font-semibold text-slate-100 mb-1">
              Progress sharing
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Share PRs and workout highlights with your community.
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 hover:border-blue-500/50 transition-colors">
            <TrendingUp className="h-5 w-5 text-blue-500 mb-2" />
            <p className="text-sm font-semibold text-slate-100 mb-1">
              Leaderboards
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track where you stand among your crew and global athletes.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Section>
);
