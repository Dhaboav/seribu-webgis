import Greeting from '@/components/utils/app-greeting';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ClipboardCopy, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

type DashboardPageProps = {
    appName?: string;
    fullname: string;
};

export default function Dashboard() {
    const { appName, fullname } = usePage<DashboardPageProps>().props;
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [copied, setCopied] = useState(false);
    const [sliceLength, setSliceLength] = useState(24);

    useEffect(() => {
        const width = window.innerWidth;
        if (width >= 1024) {
            setSliceLength(40);
        } else {
            setSliceLength(24);
        }

        setLoading(true);
        fetch(route('token.get'), {
            headers: { Accept: 'application/json' },
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((data) => {
                setToken(data.token ?? null);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleCopy = () => {
        if (!token) return;
        navigator.clipboard.writeText(token).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    const handleGenerate = () => {
        setGenerating(true);
        fetch(route('token.request'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
            },
            credentials: 'same-origin',
        })
            .then((res) => res.json())
            .then((data) => {
                setToken(data.token);
            })
            .finally(() => setGenerating(false));
    };

    const handleDelete = () => {
        if (!token) return;
        setDeleting(true);
        fetch(route('token.delete'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
            },
            credentials: 'same-origin',
        })
            .then(() => {
                setToken(null);
                setCopied(false);
            })
            .finally(() => setDeleting(false));
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
                            <code className="block text-base break-all text-gray-800 select-none sm:text-lg dark:text-green-400">
                                {loading
                                    ? 'Loading token...'
                                    : generating
                                      ? 'Generating token...'
                                      : deleting
                                        ? 'Deleting token...'
                                        : token
                                          ? token.length > sliceLength
                                              ? `${token.slice(0, sliceLength)}...`
                                              : token
                                          : 'No token generated.'}
                            </code>

                            <div className="ml-auto flex gap-2">
                                {token && !deleting && (
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
                                        disabled={deleting}
                                        className="flex items-center justify-center rounded-md bg-red-600 p-1 text-white hover:bg-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none sm:p-2"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleGenerate}
                                        disabled={generating}
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
