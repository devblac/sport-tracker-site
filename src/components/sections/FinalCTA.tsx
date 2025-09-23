import React from 'react';
import { ArrowRight, Sparkles, Zap, Users, Download, Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import { Typography } from '../ui/Typography';
import { Container } from '../ui/Container';

export const FinalCTA: React.FC = () => {

  const handleStartJourney = () => {
    console.log('Start Your Journey clicked');
  };

  const handleNotifyMe = () => {
    console.log('Notify Me clicked');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="mb-8 opacity-0 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 glass rounded-full text-white/90 text-sm font-semibold backdrop-blur-md border border-white/20 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <Download className="w-4 h-4 text-blue-400" />
                <span>Mobile app launching soon</span>
              </div>
            </div>
          </div>

          {/* Main headline */}
          <div
            className="mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <Typography
              variant="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6"
            >
              Ready to Transform Your
              <br />
              <span className="text-gradient-hero">Fitness Journey?</span>
            </Typography>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
          </div>

          {/* Subheadline */}
          <div
            className="mb-12 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Typography
              variant="lead"
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              Join thousands of fitness enthusiasts who've already discovered the power of 
              gamified, offline-first workout tracking. Your transformation starts today.
            </Typography>
          </div>

          {/* Feature highlights */}
          <div
            className="mb-12 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 p-4 glass rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">Works Offline</div>
                  <div className="text-white/60 text-xs">Never miss a workout</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 p-4 glass rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">Gamified</div>
                  <div className="text-white/60 text-xs">Make fitness fun</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 p-4 glass rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">Social</div>
                  <div className="text-white/60 text-xs">Connect with friends</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.8s' }}
          >
            <Button
              variant="gradient"
              size="xl"
              onClick={handleStartJourney}
              className="group shadow-2xl px-10 py-5 text-xl font-bold"
              icon={
                <ArrowRight className="w-7 h-7 transition-transform group-hover:translate-x-1" />
              }
            >
              Start Your Journey
            </Button>

            <Button
              variant="glass"
              size="xl"
              onClick={handleNotifyMe}
              className="group px-10 py-5 text-xl font-semibold"
              icon={
                <Bell className="w-7 h-7 transition-transform group-hover:scale-110" />
              }
            >
              Get Notified
            </Button>
          </div>

          {/* Social proof */}
          <div
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: '1s' }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white/20"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white/20"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-full border-2 border-white/20"></div>
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">+</span>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">10,000+ users</div>
                  <div className="text-white/60 text-sm">Already joined</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full mr-1 flex items-center justify-center">
                      <span className="text-xs text-yellow-900">★</span>
                    </div>
                  ))}
                </div>
                <div className="text-left ml-2">
                  <div className="text-white font-semibold">4.9/5 rating</div>
                  <div className="text-white/60 text-sm">From beta users</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom note */}
          <div
            className="mt-16 opacity-0 animate-fade-in"
            style={{ animationDelay: '1.2s' }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-white/70 text-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Free forever plan available • No credit card required</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};