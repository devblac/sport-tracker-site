import React, { useState } from 'react';
import { Container } from '../components/ui/Container';
import { Heading, Text } from '../components/ui/Typography';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SEO } from '../components/SEO';
import { useTranslation } from 'react-i18next';

// Contact icons

const MessageCircleIcon = ({ className }: { className?: string }) => (
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
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const BugIcon = ({ className }: { className?: string }) => (
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
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const HandshakeIcon = ({ className }: { className?: string }) => (
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
      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
    />
  </svg>
);

const NewspaperIcon = ({ className }: { className?: string }) => (
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
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
    />
  </svg>
);

const SupportIcon = ({ className }: { className?: string }) => (
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
      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
    />
  </svg>
);

interface ContactMethod {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  href?: string;
  color: string;
}

interface FormData {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}

export function ContactPage() {
  const { t } = useTranslation(['contact', 'common']);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const contactMethods: ContactMethod[] = [
    {
      title: 'General Support',
      description:
        'Get help with using LiftFire, account issues, or general questions.',
      icon: SupportIcon,
      action: 'Email Support',
      href: 'mailto:support@liftfire.app',
      color: 'bg-blue-500',
    },
    {
      title: 'Bug Reports',
      description: 'Found a bug? Report it here and help us improve LiftFire.',
      icon: BugIcon,
      action: 'Report Bug',
      href: 'https://github.com/liftfire/liftfire/issues/new?template=bug_report.md',
      color: 'bg-red-500',
    },
    {
      title: 'Feature Requests',
      description: "Have an idea for a new feature? We'd love to hear it!",
      icon: MessageCircleIcon,
      action: 'Request Feature',
      href: 'https://github.com/liftfire/liftfire/issues/new?template=feature_request.md',
      color: 'bg-green-500',
    },
    {
      title: 'Partnerships',
      description:
        "Interested in partnering with LiftFire? Let's discuss opportunities.",
      icon: HandshakeIcon,
      action: 'Contact Partnerships',
      href: 'mailto:partnerships@liftfire.app',
      color: 'bg-purple-500',
    },
    {
      title: 'Press & Media',
      description: 'Media inquiries, press releases, and interview requests.',
      icon: NewspaperIcon,
      action: 'Contact Press',
      href: 'mailto:press@liftfire.app',
      color: 'bg-orange-500',
    },
    {
      title: 'Community Chat',
      description: 'Join our Discord for real-time support from the community.',
      icon: MessageCircleIcon,
      action: 'Join Discord',
      href: 'https://discord.gg/liftfire',
      color: 'bg-indigo-500',
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission - in a real app, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For now, we'll just show success and reset the form
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        category: 'general',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={t('seo.title', { ns: 'contact' })}
        description={t('seo.description', { ns: 'contact' })}
        keywords={t('seo.keywords', { ns: 'contact' }).split(',')}
      />

      <div className="py-12 sm:py-16 lg:py-20">
        <Container size="xl" padding="md">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Heading level={1} className="mb-6">
              {t('hero.title', { ns: 'contact' })}
            </Heading>
            <Text
              variant="large"
              className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              {t('hero.description', { ns: 'contact' })}
            </Text>
          </div>

          {/* Contact Methods */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4">
                {t('methods.title', { ns: 'contact' })}
              </Heading>
              <Text className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('methods.description', { ns: 'contact' })}
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactMethods.map(method => {
                const IconComponent = method.icon;
                return (
                  <Card
                    key={method.title}
                    className="p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-white mb-4 ${method.color}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Heading level={4} className="mb-2">
                        {method.title}
                      </Heading>
                      <Text className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                        {method.description}
                      </Text>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          if (method.href) {
                            if (method.href.startsWith('mailto:')) {
                              window.location.href = method.href;
                            } else {
                              window.open(
                                method.href,
                                '_blank',
                                'noopener,noreferrer'
                              );
                            }
                          }
                        }}
                      >
                        {method.action}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="text-center mb-8">
                <Heading level={2} className="mb-4">
                  {t('form.title', { ns: 'contact' })}
                </Heading>
                <Text className="text-gray-600 dark:text-gray-300">
                  {t('form.description', { ns: 'contact' })}
                </Text>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <Text className="text-green-800 dark:text-green-200">
                    {t('form.successMessage', { ns: 'contact' })}
                  </Text>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <Text className="text-red-800 dark:text-red-200">
                    {t('form.errorMessage', { ns: 'contact' })}
                  </Text>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('form.name', { ns: 'contact' })} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder={t('form.namePlaceholder', { ns: 'contact' })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('form.email', { ns: 'contact' })} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder={t('form.emailPlaceholder', {
                        ns: 'contact',
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('form.category', { ns: 'contact' })} *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="general">
                      {t('form.categories.general', { ns: 'contact' })}
                    </option>
                    <option value="technical">
                      {t('form.categories.technical', { ns: 'contact' })}
                    </option>
                    <option value="billing">
                      {t('form.categories.billing', { ns: 'contact' })}
                    </option>
                    <option value="partnerships">
                      {t('form.categories.partnerships', { ns: 'contact' })}
                    </option>
                    <option value="press">
                      {t('form.categories.press', { ns: 'contact' })}
                    </option>
                    <option value="feedback">
                      {t('form.categories.feedback', { ns: 'contact' })}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('form.subject', { ns: 'contact' })} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder={t('form.subjectPlaceholder', {
                      ns: 'contact',
                    })}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('form.message', { ns: 'contact' })} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-vertical"
                    placeholder={t('form.messagePlaceholder', {
                      ns: 'contact',
                    })}
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="min-w-32"
                  >
                    {isSubmitting
                      ? t('form.sending', { ns: 'contact' })
                      : t('form.send', { ns: 'contact' })}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ContactPage;
