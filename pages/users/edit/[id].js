import { getSession } from 'next-auth/client';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import styles from '../../../css/User.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image';

const EditUserPage = ({ user }) => {
    const { isProizvodnja, isKomercijala, isAdmin } = user;
    const [proizvodnja, setProizvodnja] = useState(isProizvodnja);
    const [komercijala, setKomercijala] = useState(isKomercijala);
    const [admin, setAdmin] = useState(isAdmin);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const ovlastenja = {
            isProizvodnja: proizvodnja,
            isKomercijala: komercijala,
            isAdmin: admin,
        };
        const res = await fetch(`/api/users/${user._id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ovlastenja),
        });

        const data = await res.json();
        if (!res.ok) {
            toast.error(data.message);
            setIsLoading(false);
            return;
        }
        toast.success(data.message);
        router.push('/users');
    };

    return (
        <div className={styles.container}>
            <h1>{user.name}</h1>
            <hr style={{ marginTop: '10px' }} />
            <div className={styles.body}>
                <h4 style={{ marginBottom: '20px' }}>Ovlaštenja</h4>
                <div className={styles.box}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.flex}>
                            <label>Proizvodnja</label>
                            <input
                                type='checkbox'
                                name='ovlastenja'
                                id='prizvodnja'
                                checked={proizvodnja}
                                onChange={(e) => setProizvodnja(!proizvodnja)}
                            />
                        </div>
                        <div className={styles.flex}>
                            <label htmlFor='komercijala'>Komercijala</label>
                            <input
                                type='checkbox'
                                name='ovlastenja'
                                id='komercijala'
                                checked={komercijala}
                                onChange={(e) => setKomercijala(!komercijala)}
                            />
                        </div>
                        <div className={styles.flex}>
                            <label htmlFor='admin'>Admin</label>
                            <input
                                type='checkbox'
                                name='ovlastenja'
                                id='admin'
                                checked={admin}
                                onChange={(e) => setAdmin(!admin)}
                            />
                        </div>
                        {isLoading ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    src='/spinner.gif'
                                    width={100}
                                    height={70}
                                />
                            </div>
                        ) : (
                            <input type='submit' value='Potvrdi' />
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
    await dbConnect();

    const id = ctx.query.id;
    const data = await User.findById(id).lean();

    const user = JSON.parse(JSON.stringify(data));

    return { props: { session, user } };
}

export default EditUserPage;
