import Head from 'next/head';
import Link from 'next/link';
import { signOut } from 'next-auth/client';
import styles from '../css/Layout.module.css';
import Sidebar from './Sidebar';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';

function Layout({ children }) {
    const [session, loading] = useSession();
    const fetcher = (url) => fetch(url).then((r) => r.json());

    const { data, error } = useSWR('/api/izvozi', fetcher);
    if (error) return <div className='center'>failed</div>;
    if (!data) return <div className='center'>Loading...</div>;

    const nijeZavrsen = data.data.map((izvoz) => izvoz.zavrsen);
    const funkNezavrseni = () => {
        let count = 0;
        for (const el of nijeZavrsen) {
            if (el == false) {
                count += 1;
            }
        }
        return count;
    };

    return (
        <>
            <Head>
                <title>Corn Flips Dashboard</title>
            </Head>
            <div className={styles.container}>
                <header>
                    <div className={styles.logo}>
                        <Link href='/'>
                            <a href='#'></a>
                        </Link>
                    </div>
                </header>
                {session && !loading && (
                    <>
                        <div className={styles.brojIzvoza}>
                            <p>Ukupno izvoza </p>
                            <span className={styles.count}>
                                {data.data.length}
                            </span>
                        </div>
                        <div className={styles.brojIzvoza}>
                            <p>Nezavršeno </p>
                            <span className={styles.count}>
                                {funkNezavrseni()}
                            </span>
                        </div>
                    </>
                )}

                <nav className={styles.nav}>
                    <ul>
                        {!session && !loading && (
                            <li>
                                <Link href='/auth/login'>
                                    <a>Prijava</a>
                                </Link>
                            </li>
                        )}
                        {session && !loading && (
                            <li className={styles.korisnici}>
                                <Link href='/users'>
                                    <a className={styles.korisnici}>
                                        Korisnici
                                    </a>
                                </Link>
                            </li>
                        )}

                        <li
                            style={{
                                marginTop: '10px',
                                color: '#fff',
                                textTransform: 'capitalize',
                            }}
                        >
                            {session && session.user.name}
                        </li>
                        {session && (
                            <li>
                                <button className='btn' onClick={signOut}>
                                    Odjava
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
            <div className={styles.dashboard}>
                <Sidebar />
                <div className='box'>{children}</div>
            </div>
        </>
    );
}

export default Layout;
