import { apiRoutes } from '@/data/apiRoutes';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Docs() {
    const { appName } = usePage().props as { appName?: string };
    return (
        <>
            <Head title={`API Documentation - ${appName}`} />
            <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
                <div className="mx-auto max-w-5xl">
                    <Link href={route('home')} className="mb-4 flex items-center space-x-3 transition hover:opacity-80">
                        <img src="/vite.svg" alt="Logo" className="h-10 w-10" />
                        <h1 className="text-3xl font-bold">{appName}</h1>
                    </Link>

                    <p className="mb-8 text-gray-400">API Documentation for managing image upload, deletion, and authentication.</p>

                    <div className="space-y-6">
                        {apiRoutes.map((route, index) => (
                            <div key={index} className="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span
                                            className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                                                route.method === 'GET'
                                                    ? 'bg-green-600 text-white'
                                                    : route.method === 'POST'
                                                      ? 'bg-yellow-600 text-white'
                                                      : route.method === 'PUT'
                                                        ? 'bg-green-800 text-black'
                                                        : route.method === 'PATCH'
                                                          ? 'bg-purple-600 text-white'
                                                          : 'bg-red-600 text-white'
                                            }`}
                                        >
                                            {route.method}
                                        </span>
                                        <span className="font-mono text-sm">{route.uri}</span>
                                    </div>
                                    <p className="mt-2 text-gray-300 md:mt-0">{route.description}</p>
                                </div>

                                {/* Example Request */}
                                <div className="mt-4">
                                    <p className="mb-1 text-sm font-semibold text-gray-400">Example request:</p>
                                    <pre className="overflow-x-auto rounded bg-gray-900 p-3 text-sm whitespace-pre-wrap text-gray-200">
                                        {route.example}
                                    </pre>
                                </div>

                                {/* Example Response */}
                                <div className="mt-4">
                                    <p className="mb-1 text-sm font-semibold text-gray-400">Example response:</p>
                                    <pre className="overflow-x-auto rounded bg-gray-900 p-3 text-sm whitespace-pre-wrap text-gray-200">
                                        {route.response}
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Link href={route('home')} className="inline-block rounded border border-gray-600 px-4 py-2 text-gray-300 hover:bg-gray-800">
                            &larr; Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
