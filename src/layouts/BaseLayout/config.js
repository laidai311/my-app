import {
    IconNotes,
    IconCalendarStats,
    IconGauge,
    IconPresentationAnalytics,
    IconFileAnalytics,
    IconAdjustments,
    IconLock,
    IconUser,
} from '@tabler/icons-react';

export const sidebarData = [
    { label: 'Dashboard', icon: IconGauge, link: '/' },
    {
        label: 'Market news',
        icon: IconNotes,
        initiallyOpened: true,
        links: [
            { label: 'Overview', link: '/' },
            { label: 'Forecasts', link: '/' },
            { label: 'Outlook', link: '/' },
            { label: 'Real time', link: '/' },
        ],
    },
    {
        label: 'Releases',
        icon: IconCalendarStats,
        links: [
            { label: 'Upcoming releases', link: '/' },
            { label: 'Previous releases', link: '/' },
            { label: 'Releases schedule', link: '/' },
        ],
    },
    { label: 'Analytics', icon: IconPresentationAnalytics },
    { label: 'Contracts', icon: IconFileAnalytics },
    { label: 'Settings', icon: IconAdjustments },
    {
        label: 'Security',
        icon: IconLock,
        links: [
            { label: 'Enable 2FA', link: '/' },
            { label: 'Change password', link: '/' },
            { label: 'Recovery codes', link: '/' },
        ],
    },
];
