import React from 'react';
import { ArrowRight, Play, Users, Zap, Trophy, Shield } from 'lucide-react';
import { Container } from '../ui/Container';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-emerald-500/10 animate-pulse" />

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-bounce" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 left-32 w-40 h-40 bg-emerald-500/10 rounded-full blur-xl animate-bounce" />

      <Container size="xl" padding="lg" className="relative z-10">
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="order-2 lg:order-1 space-y-8 text-center lg:text-left">
                {/* Trust Badge */}
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                    <Users className="w-5 h-5 text-emerald-400" />
                    <span className="text-white font-medium">Join 10,000+ fitness enthusiasts</span>
                  </div>
                </div>

                {/* Main Headline */}
                <div>
                  <Typography variant="h1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Transform Your
                      <br />
                      Fitness Journey
                    </span>
                  </Typography>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </div>

                {/* Subheadline */}
                <div>
                  <Typography variant="large" className="text-white/90 font-medium leading-relaxed">
                    The first{' '}
                    <span className="text-blue-400 font-bold">gamified gym tracker</span>{' '}
                    that works{' '}
                    <span className="text-emerald-400 font-bold">100% offline</span>
                    , connects you with friends, and uses AI to optimize your workouts.
                  </Typography>
                </div>

                {/* Feature Highlights */}
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0">
                    {[
                      { icon: Zap, title: '100% Offline', subtitle: 'Works anywhere', color: 'text-amber-400' },
                      { icon: Trophy, title: 'Gamified', subtitle: 'XP & Achievements', color: 'text-purple-400' },
                      { icon: Shield, title: 'Privacy First', subtitle: 'Your data, your control', color: 'text-emerald-400' },
                    ].map((feature, index) => (
                      <Card key={index} className="bg-white/10 backdrop-blur-md border-white/10 p-4 hover:bg-white/15 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br from-current/20 to-current/10 ${feature.color}`}>
                            <feature.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <Typography variant="body" className="text-white font-semibold">
                              {feature.title}
                            </Typography>
                            <Typography variant="small" className="text-white/60">
                              {feature.subtitle}
                            </Typography>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button variant="gradient" size="lg" className="group">
                      Start Your Journey
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <Button variant="glass" size="lg" className="group">
                      <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Watch Demo
                    </Button>
                  </div>
                </div>

                {/* Social Proof */}
                <div>
                  <div className="flex items-center gap-8 flex-wrap justify-center lg:justify-start">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[
                          'bg-gradient-to-br from-blue-400 to-blue-600',
                          'bg-gradient-to-br from-emerald-400 to-emerald-600',
                          'bg-gradient-to-br from-pink-400 to-pink-600',
                          'bg-gradient-to-br from-amber-400 to-amber-600',
                        ].map((gradient, index) => (
                          <div
                            key={index}
                            className={`w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold ${gradient}`}
                          >
                            {index === 3 ? '+' : ''}
                          </div>
                        ))}
                      </div>
                      <Typography variant="body" className="text-white/70 font-medium">
                        10,000+ users
                      </Typography>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-4 h-4 text-amber-400">⭐</div>
                        ))}
                      </div>
                      <Typography variant="body" className="text-white/70 font-medium">
                        4.9/5 rating
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - App Preview */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Phone Mockup */}
                  <Card className="w-80 h-[640px] bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-md border-8 border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                    <div className="p-6 h-full flex flex-col">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center mb-6">
                        <Typography variant="body" className="text-white/80 font-medium">
                          9:41
                        </Typography>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-2 bg-white/60 rounded-sm" />
                          <div className="w-6 h-3 border border-white/60 rounded-sm relative">
                            <div className="w-4 h-1 bg-emerald-400 rounded-sm absolute top-1/2 left-0.5 transform -translate-y-1/2" />
                          </div>
                        </div>
                      </div>

                      {/* App Header */}
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <Typography variant="h6" className="text-white font-bold mb-1">
                          Welcome back, Alex!
                        </Typography>
                        <Typography variant="body" className="text-white/60">
                          Ready to crush your goals?
                        </Typography>
                      </div>

                      {/* Stats Preview */}
                      <div className="space-y-4 flex-1">
                        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <Typography variant="body" className="text-white font-semibold">
                                  Workout Streak
                                </Typography>
                                <Typography variant="small" className="text-white/60">
                                  Keep it going!
                                </Typography>
                              </div>
                            </div>
                            <div className="text-right">
                              <Typography variant="h6" className="text-amber-400 font-bold">
                                12
                              </Typography>
                              <Typography variant="small" className="text-white/60">
                                days
                              </Typography>
                            </div>
                          </div>
                        </Card>

                        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <Typography variant="body" className="text-white font-semibold">
                                  XP Earned
                                </Typography>
                                <Typography variant="small" className="text-white/60">
                                  Level up!
                                </Typography>
                              </div>
                            </div>
                            <div className="text-right">
                              <Typography variant="h6" className="text-emerald-400 font-bold">
                                3,240
                              </Typography>
                              <Typography variant="small" className="text-white/60">
                                +450 today
                              </Typography>
                            </div>
                          </div>
                        </Card>
                      </div>

                      {/* CTA Button */}
                      <Button variant="gradient" size="lg" className="w-full mt-6">
                        Start Workout
                      </Button>
                    </div>
                  </Card>

                  {/* Floating Elements */}
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center animate-bounce">
                    <Trophy className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="absolute -top-2 -right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center animate-pulse">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="absolute -bottom-4 -left-2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                    <Shield className="w-7 h-7 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};