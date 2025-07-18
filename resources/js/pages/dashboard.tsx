import CardBox from '@/components/app-cardbox';
import Greeting from '@/components/utils/app-greeting';
import useTokenManager from '@/hooks/use-token-manager';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ClipboardCheck, Copy, Plus, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

type DashboardPageProps = {
    appName?: string;
    fullname: string;
};

export default function Dashboard() {
    const { appName, fullname } = usePage<DashboardPageProps>().props;

    const { token, loading, generating, deleting, copied, sliceLength, handleCopy, handleGenerate, handleDelete } = useTokenManager();

    const displayedToken = loading
        ? 'Loading token...'
        : generating
          ? 'Generating token...'
          : deleting
            ? 'Deleting token...'
            : token
              ? token.length > sliceLength
                  ? `${token.slice(0, sliceLength)}...`
                  : token
              : 'No token generated.';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Homepage - ${appName}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="pointer-events-none absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />

                    <div className="relative mt-12 flex flex-col items-center justify-center p-4 lg:mt-0 lg:h-full">
                        <h1 className="text-4xl font-bold text-black md:text-5xl lg:text-6xl dark:text-white">
                            <Greeting />
                        </h1>
                        <p className="mt-2 text-2xl font-semibold text-gray-500 md:text-3xl lg:text-6xl dark:text-gray-300">{fullname}</p>

                        <div className="mt-6 flex w-full justify-center">
                            <CardBox
                                title="Kunci API"
                                badge="API"
                                description="Simpan API key kamu dengan aman. Kunci ini digunakan untuk mengakses endpoint layanan API kami."
                                subtitle="Atur dan Simpan API Key-mu dengan Mudah"
                            >
                                {/* Token Display */}
                                <div className="flex h-12 items-center justify-between rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-800 dark:bg-gray-800 dark:text-green-400">
                                    <span className="inline-block min-w-[160px] font-mono break-all select-none">{displayedToken}</span>

                                    {token && !deleting && (
                                        <button
                                            onClick={handleCopy}
                                            className="ml-2 rounded-md p-1 text-gray-600 hover:text-blue-600 dark:text-white"
                                            title="Copy"
                                        >
                                            {copied ? <ClipboardCheck className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                        </button>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="mt-4 flex gap-2">
                                    {token ? (
                                        <button
                                            onClick={handleDelete}
                                            disabled={deleting}
                                            className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleGenerate}
                                            disabled={generating}
                                            className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </CardBox>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
