import Head from 'next/head';
import Link from 'next/link';
import { signOut } from 'next-auth/client';
import styles from '../css/Layout.module.css';
import Sidebar from './Sidebar';
import { useSession } from 'next-auth/client';

function Layout({ children }) {
    const [session, loading] = useSession();

    return (
        <>
            <Head>
                <title>Corn Flips Dashboard</title>
            </Head>
            <div className={styles.container}>
                <header>
                    <div className={styles.logo}>
                        <Link href='/'>
                            <a href='#'>Corn Flips</a>
                        </Link>
                    </div>
                </header>
                <nav className={styles.nav}>
                    <ul>
                        {!session && !loading && (
                            <li>
                                <Link href='/auth/login'>
                                    <a>Prijava</a>
                                </Link>
                            </li>
                        )}

                        <li>
                            <p
                                style={{
                                    marginTop: '10px',
                                    color: '#fff',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {session && session.user.name}
                            </p>
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
