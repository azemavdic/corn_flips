import styles from '../../css/Home.module.css';
import UserModel from '../../models/User';
import User from '../../components/User';
import { getSession } from 'next-auth/client';
import dbConnect from '../../lib/dbConnect';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const UsersPage = ({ user, users, curUser }) => {
    const router = useRouter();
    const admin = user.isAdmin;
    let index = 1;

    const handleDelete = async (id) => {
        if (window.confirm('Da li ste sigurni da želite obrisati korisnika')) {
            const res = await toast.promise(
                fetch(`/api/users/${id}`, {
                    method: 'DELETE',
                }),
                {
                    pending: 'Brisanje...',
                    success: 'Korisnik obrisan 👌',
                    error: 'Neuspjelo brisanje korisnika 🤯',
                }
            );
            const data = res.json();
            router.push('/users');
        }
    };

    return (
        <>
            <div className={styles.header}>
                <h1>Korisnici</h1>
                {admin && (
                    <Link href='/auth/signup'>
                        <a>Novi korisnik</a>
                    </Link>
                )}
            </div>
            <hr style={{ marginTop: '10px' }} />
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ime</th>
                            <th>Email</th>
                            <th>Proizvodnja</th>
                            <th>Komercijala</th>
                            <th>Admin</th>
                            {admin && <th>Akcije</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((user) => (
                                <User
                                    key={user._id}
                                    user={user}
                                    index={index++}
                                    deleteHandler={handleDelete}
                                    curUser={curUser}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </>
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

    const usersData = await UserModel.find().lean();
    const users = JSON.parse(JSON.stringify(usersData));

    const userData = await UserModel.findOne({ name: session.user.name });
    const user = JSON.parse(JSON.stringify(userData));

    const curUser = users.filter((user) => user.name === session.user.name);

    return { props: { session, user, users, curUser } };
}

export default UsersPage;
