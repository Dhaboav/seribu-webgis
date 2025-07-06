import Greeting from '@/components/utils/app-greeting';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ClipboardCopy, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type DashboardPageProps = {
    appName?: string;
    fullname: string;
};

export default function Dashboard() {
    const { appName, fullname } = usePage<DashboardPageProps>().props;
    const [token, setToken] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!token) return;
        navigator.clipboard.writeText(token).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    const handleGenerate = () => {
        const newToken = `token-${Math.random().toString(36).substr(2, 16)}`;
        setToken(newToken);
        setCopied(false);
    };

    const handleDelete = () => {
        setToken(null);
        setCopied(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Homepage - ${appName}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {/* Background stroke */}
                    <div className="pointer-events-none absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                    {/* Content */}
                    <div className="relative mt-12 flex flex-col items-center justify-center text-center lg:mt-0 lg:h-full">
                        <h1 className="text-4xl font-bold text-black md:text-5xl lg:text-6xl dark:text-white">
                            <Greeting />
                        </h1>
                        <p className="mt-2 text-2xl font-semibold text-gray-500 md:text-3xl lg:text-6xl dark:text-gray-300">{fullname}</p>

                        {/* Token Box */}
                        <div
                            className="relative mt-6 flex w-full max-w-xs items-center rounded-lg border border-gray-300 bg-gray-100 p-2 sm:max-w-sm sm:p-3 md:max-w-md md:p-4 lg:max-w-xl dark:border-gray-600 dark:bg-gray-800"
                            style={{ minHeight: '48px' }}
                        >
                            <code
                                className="block text-base break-all text-gray-800 select-none sm:text-lg dark:text-green-400"
                                style={{ userSelect: 'none' }}
                            >
                                {token ?? 'No token generated.'}
                            </code>
                            <div className="ml-auto flex gap-2">
                                {token && (
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center justify-center rounded-md bg-gray-300 p-1 text-gray-800 hover:bg-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:p-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                                        title="Copy"
                                    >
                                        {copied ? (
                                            <span className="text-xs sm:text-sm">Copied!</span>
                                        ) : (
                                            <ClipboardCopy className="h-4 w-4 sm:h-5 sm:w-5" />
                                        )}
                                    </button>
                                )}
                                {token ? (
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center justify-center rounded-md bg-red-600 p-1 text-white hover:bg-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none sm:p-2"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleGenerate}
                                        className="flex items-center justify-center rounded-md bg-green-600 p-1 text-white hover:bg-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none sm:p-2"
                                        title="Generate"
                                    >
                                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                        {/* Token Box END */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
