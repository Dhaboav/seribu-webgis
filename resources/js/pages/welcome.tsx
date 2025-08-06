import AppData from '@/components/app-data';
import AppMaps from '@/components/app-maps';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AlignRight, X } from 'lucide-react';
import { useState } from 'react';

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li className="block w-full border-b border-gray-600 py-4 text-black hover:border-b-2 hover:border-b-white hover:text-gray-400 md:border-0">
            <Link href={href}>{children}</Link>
        </li>
    );
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const { appName } = usePage().props as { appName?: string };
    const { markers, images, data } = usePage<{
        markers: { id: number; name: string; coords: string }[];
        images: Record<number, { file_path: string; time: string }>;
        data: {
            question: string;
            answer: {
                image: string;
                time: string;
                trash: string;
            }[];
        }[];
    }>().props;

    return (
        <>
            <Head title={`Homepage - ${appName}`}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex flex-col bg-cyan-300 text-[#1b1b18]">
                <header className="mx-auto mb-6 w-full max-w-screen-xl px-4">
                    <nav className="fixed start-0 top-0 z-20 w-full bg-cyan-300 py-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex flex-wrap items-center justify-between px-8 lg:px-36">
                                <div className="flex items-center space-x-1">
                                    <img src="/vite.svg" alt="Logo" />
                                    <span className="font-semibold text-black">{appName}</span>
                                </div>
                                <button
                                    onClick={toggleMenu}
                                    className="text-2xl text-black md:hidden"
                                    aria-label="Toggle Menu"
                                    aria-expanded={isMenuOpen}
                                    aria-controls="mobile-menu"
                                >
                                    {isMenuOpen ? <X /> : <AlignRight />}
                                </button>
                                <div
                                    id="mobile-menu"
                                    className={`h-screen w-full transition-all duration-300 ease-in-out md:flex md:h-auto md:w-auto ${
                                        isMenuOpen ? 'block' : 'hidden'
                                    }`}
                                >
                                    <ul className="mt-4 flex flex-col p-4 font-medium md:mt-0 md:flex-row md:space-x-10 md:p-0">
                                        <NavItem href={route('home')}>Home</NavItem>
                                        <NavItem href={route('docs')}>Dokumentasi</NavItem>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </nav>
                </header>

                <main className="bg-white text-black">
                    <section className="h-screen bg-gradient-to-b from-cyan-300 to-white px-8 text-center">
                        <div className="flex h-full flex-col items-center justify-center">
                            <h1 className="max-w-md bg-gradient-to-b from-gray-600 to-gray-700 bg-clip-text text-4xl leading-tight font-medium text-transparent md:text-5xl lg:text-6xl">
                                SERIBU-Sungai
                            </h1>
                            <p className="text-md mt-4 max-w-md text-gray-800 opacity-90 md:text-lg lg:text-xl">
                                <b>SERIBU</b> adalah teknologi pemantauan sungai cepat dan cerdas yang mendeteksi sampah secara real-time untuk
                                menjaga kebersihan sungai.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href={route('docs')}
                                    className="rounded-lg border-2 border-black bg-transparent p-3 font-semibold text-black shadow-md transition hover:bg-white"
                                >
                                    Dokumentasi
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-12 px-8 py-12 lg:flex-row lg:items-start lg:px-36">
                        <div className="flex w-full justify-center lg:w-1/2">
                            <div className="h-96 w-full">
                                <AppMaps markers={markers} images={images} />
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 lg:max-w-md">
                            <h2 className="mb-4 text-xl font-bold">Data Historis Sampah</h2>
                            <AppData data={data} />
                        </div>
                    </section>
                </main>

                <div className="group fixed right-6 bottom-6 z-50">
                    <a href="https://t.me/+jVjMWzKmy2FhZTM1" target="_blank" rel="noopener noreferrer">
                        <img
                            src="/telegram-logo.svg"
                            alt="Telegram Bot"
                            className="h-12 w-12 hover:scale-110 hover:brightness-75 hover:grayscale hover:filter"
                        />
                    </a>
                </div>
            </div>
        </>
    );
}
