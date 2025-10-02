import React from 'react';
import { Container } from '../components/ui/Container';
import { Heading, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SEO } from '../components/SEO';
import { useTranslation } from 'react-i18next';

// Social media and community icons
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const RedditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

interface CommunityChannel {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  members?: string;
  color: string;
}

interface CommunityStats {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function CommunityPage() {
  const { t } = useTranslation(['community', 'common']);

  const communityChannels: CommunityChannel[] = [
    {
      name: 'Discord Server',
      description:
        'Join our active community for real-time discussions, workout tips, and support from fellow fitness enthusiasts.',
      icon: DiscordIcon,
      href: 'https://discord.gg/liftfire',
      members: '2,500+',
      color: 'bg-indigo-500 hover:bg-indigo-600',
    },
    {
      name: 'GitHub Repository',
      description:
        "Contribute to LiftFire's development, report bugs, request features, and explore our open-source codebase.",
      icon: GitHubIcon,
      href: 'https://github.com/liftfire/liftfire',
      members: '150+',
      color: 'bg-gray-800 hover:bg-gray-900',
    },
    {
      name: 'Twitter Community',
      description:
        'Follow @LiftFireApp for updates, fitness tips, and connect with the broader fitness tech community.',
      icon: TwitterIcon,
      href: 'https://twitter.com/liftfireapp',
      members: '1,200+',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      name: 'Reddit Community',
      description:
        'Join r/LiftFire for in-depth discussions, feature requests, and community-driven content.',
      icon: RedditIcon,
      href: 'https://reddit.com/r/liftfire',
      members: '800+',
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ];

  const communityStats: CommunityStats[] = [
    {
      label: 'Active Users',
      value: '10,000+',
      icon: UsersIcon,
    },
    {
      label: 'Workouts Tracked',
      value: '1M+',
      icon: HeartIcon,
    },
    {
      label: 'Community Rating',
      value: '4.8/5',
      icon: StarIcon,
    },
  ];

  return (
    <>
      <SEO
        title={t('seo.title', { ns: 'community' })}
        description={t('seo.description', { ns: 'community' })}
        keywords={t('seo.keywords', { ns: 'community' }).split(',')}
      />

      <main className="py-12 sm:py-16 lg:py-20">
        <Container size="xl" padding="md">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Heading level={1} className="mb-6">
              {t('hero.title', { ns: 'community' })}
            </Heading>
            <Text
              variant="large"
              className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
            >
              {t('hero.description', { ns: 'community' })}
            </Text>

            {/* Community Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {communityStats.map(stat => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg mb-4">
                      <IconComponent className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Community Channels */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4">
                {t('channels.title', { ns: 'community' })}
              </Heading>
              <Text className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('channels.description', { ns: 'community' })}
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {communityChannels.map(channel => {
                const IconComponent = channel.icon;
                return (
                  <Card
                    key={channel.name}
                    className="p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-white ${channel.color}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Heading level={4}>{channel.name}</Heading>
                          {channel.members && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {channel.members} members
                            </span>
                          )}
                        </div>
                        <Text className="text-gray-600 dark:text-gray-300 mb-4">
                          {channel.description}
                        </Text>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            window.open(
                              channel.href,
                              '_blank',
                              'noopener,noreferrer'
                            )
                          }
                        >
                          Join Community
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Beta Program Section */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 mb-16">
            <div className="text-center">
              <Heading level={2} className="mb-4">
                {t('beta.title', { ns: 'community' })}
              </Heading>
              <Text className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                {t('beta.description', { ns: 'community' })}
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg">
                  {t('beta.joinButton', { ns: 'community' })}
                </Button>
                <Button variant="secondary" size="lg">
                  {t('beta.learnMore', { ns: 'community' })}
                </Button>
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="text-center">
            <Heading level={2} className="mb-6">
              {t('guidelines.title', { ns: 'community' })}
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
                  <HeartIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <Heading level={4} className="mb-2">
                  {t('guidelines.respectful.title', { ns: 'community' })}
                </Heading>
                <Text className="text-gray-600 dark:text-gray-300">
                  {t('guidelines.respectful.description', { ns: 'community' })}
                </Text>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                  <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <Heading level={4} className="mb-2">
                  {t('guidelines.helpful.title', { ns: 'community' })}
                </Heading>
                <Text className="text-gray-600 dark:text-gray-300">
                  {t('guidelines.helpful.description', { ns: 'community' })}
                </Text>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
                  <StarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <Heading level={4} className="mb-2">
                  {t('guidelines.constructive.title', { ns: 'community' })}
                </Heading>
                <Text className="text-gray-600 dark:text-gray-300">
                  {t('guidelines.constructive.description', {
                    ns: 'community',
                  })}
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

export default CommunityPage;
