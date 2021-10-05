import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export const redirectToLogin = () => {
    const [session, loading] = useSession();
    const router = useRouter();

    if (!loading && !session) {
        router.push('/auth/login');
        return null;
    }

    if (loading) {
        return <p>Loading...</p>;
    }
};
