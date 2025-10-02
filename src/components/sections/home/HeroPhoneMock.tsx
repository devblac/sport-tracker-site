import React from 'react';
import { Activity, Users, Zap } from 'lucide-react';

const HERO_CARDS = [
  {
    icon: Activity,
    label: 'Workout streak',
    helper: 'Keep it going',
    value: '12 days',
    color: 'bg-sky-500/20',
  },
  {
    icon: Zap,
    label: 'XP earned',
    helper: '+450 today',
    value: '3,240',
    color: 'bg-purple-500/20',
  },
  {
    icon: Users,
    label: 'Crew challenge',
    helper: 'Team Nimbus is leading',
    value: '+18%',
    color: 'bg-emerald-500/20',
  },
];

export const HeroPhoneMock: React.FC = () => (
  <div className="relative mx-auto mt-16 w-full max-w-xs rounded-[2.5rem] border border-white/15 bg-white/5 p-6 text-white backdrop-blur-2xl shadow-[0_40px_80px_-40px_rgba(8,15,35,0.9)]">
    <div
      className="absolute inset-0 rounded-[2.5rem] border border-white/10"
      aria-hidden="true"
    />
    <div className="space-y-6">
      <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.3em] text-white/60">
        <span>Upper push</span>
        <span>Offline</span>
      </div>
      <div>
        <p className="text-sm text-white/70">Welcome back, Alex</p>
        <p className="mt-1 text-2xl font-semibold">Momentum unlocked</p>
      </div>
      <div className="space-y-4">
        {HERO_CARDS.map(item => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
              >
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-white/60">{item.helper}</p>
              </div>
            </div>
            <span className="text-lg font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-blue-500/30 to-purple-500/30 p-4 text-sm text-white/80">
        AI insight: You hit a 4-week volume PR on bench. Schedule a deload set
        this weekend for max recovery.
      </div>
    </div>
  </div>
);
