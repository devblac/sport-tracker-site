import React from 'react';

export interface StoreBadgeLink {
  platform: 'apple' | 'google';
  href: string;
  label: string;
}

const AppleIcon: React.FC = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.71 12.2c-.01-3.23 2.63-4.79 2.76-4.87-1.51-2.2-3.86-2.5-4.68-2.54-1.99-.2-3.89 1.18-4.9 1.18-.99 0-2.5-1.15-4.12-1.12-2.11.03-4.06 1.22-5.15 3.1-2.18 3.77-.55 9.36 1.57 12.42 1.05 1.5 2.3 3.18 3.94 3.12 1.59-.06 2.19-1.01 4.09-1.01 1.9 0 2.44 1.01 4.12.97 1.71-.03 2.79-1.54 3.83-3.05 1.2-1.76 1.69-3.46 1.71-3.55-.04-.01-3.26-1.25-3.3-4.65Zm-3.69-9.71c.86-1.05 1.44-2.5 1.28-3.95-1.24.05-2.73.83-3.63 1.88-.79.93-1.48 2.42-1.3 3.86 1.38.11 2.79-.7 3.65-1.79Z" />
  </svg>
);

const GooglePlayIcon: React.FC = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.66 3.05 12.4 8.3l-2.47-2.47 5.27-5.25a1.73 1.73 0 0 1 2.46 2.47Zm-6.06 6.07-9 9A1.73 1.73 0 0 1 1 16.67l9-9Z" />
    <path d="m8.93 14.14 2.47 2.47-1.47 1.47-2.47-2.47Zm3.86-3.85 2.47 2.47-1.48 1.47-2.47-2.47Z" />
  </svg>
);

export interface StoreBadgesProps {
  links: StoreBadgeLink[];
}

export const StoreBadges: React.FC<StoreBadgesProps> = ({ links }) => {
  const renderIcon = (platform: 'apple' | 'google') =>
    platform === 'apple' ? <AppleIcon /> : <GooglePlayIcon />;

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      {links.map(link => (
        <a
          key={link.platform}
          href={link.href}
          className="group flex items-center gap-3 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-left transition-all hover:bg-slate-700 hover:border-slate-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-white group-hover:bg-slate-600 transition-colors">
            {renderIcon(link.platform)}
          </div>
          <div className="leading-tight">
            <p className="text-xs text-slate-400">Get it on</p>
            <p className="text-sm font-semibold text-slate-100">{link.label}</p>
          </div>
        </a>
      ))}
    </div>
  );
};
