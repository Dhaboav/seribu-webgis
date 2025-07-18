import { useCallback, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function useTokenManager(initialSlice = 20) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [generating, setGenerating] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const sliceLength = initialSlice; // fixed at 20

    // Fetch token on mount
    useEffect(() => {
        const fetchToken = async () => {
            try {
                setLoading(true);
                const res = await fetch(route('token.get'), {
                    headers: { Accept: 'application/json' },
                    credentials: 'same-origin',
                });
                const data = await res.json();
                setToken(data.token ?? null);
            } catch (error) {
                console.error('Failed to fetch token:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, []);

    // Copy token
    const handleCopy = useCallback(() => {
        if (!token) return;

        navigator.clipboard.writeText(token).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }, [token]);

    // Generate new token
    const handleGenerate = useCallback(async () => {
        try {
            setGenerating(true);
            const res = await fetch(route('token.request'), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                credentials: 'same-origin',
            });
            const data = await res.json();
            setToken(data.token);
        } catch (error) {
            console.error('Failed to generate token:', error);
        } finally {
            setGenerating(false);
        }
    }, []);

    // Delete token
    const handleDelete = useCallback(async () => {
        if (!token) return;

        try {
            setDeleting(true);
            await fetch(route('token.delete'), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                credentials: 'same-origin',
            });
            setToken(null);
            setCopied(false);
        } catch (error) {
            console.error('Failed to delete token:', error);
        } finally {
            setDeleting(false);
        }
    }, [token]);

    const displayedToken = (() => {
        if (loading) return 'Loading token...';
        if (generating) return 'Generating token...';
        if (deleting) return 'Deleting token...';
        if (!token) return 'No token generated.';

        const sliced = token.slice(0, sliceLength);
        const padded = sliced.padEnd(sliceLength, '•'); // bisa ganti karakter
        return token.length > sliceLength ? `${padded}...` : padded;
    })();

    return {
        token,
        displayedToken,
        loading,
        generating,
        deleting,
        copied,
        sliceLength,
        handleCopy,
        handleGenerate,
        handleDelete,
    };
}
