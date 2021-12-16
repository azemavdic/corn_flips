import dbConnect from '../lib/dbConnect';
import Link from 'next/link';
import IzvozModel from '../models/Izvoz';
import UserModel from '../models/User';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faTimesCircle,
    faEdit,
    faTrash,
    faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../css/Izvoz.module.css';
import { getSession } from 'next-auth/client';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const IzvozPage = ({ izvoz, user }) => {
    const router = useRouter();

    const handleDelete = async (e) => {
        e.preventDefault();
        const MySwal = withReactContent(Swal);
        const confirm = await MySwal.fire({
            title: 'Jeste li sigurni?',
            text: 'Želite obrisati izvoz?',
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Da',
            denyButtonText: 'Ne',
            customClass: { htmlContainer: 'grid-row:1' },
        });
        // if (window.confirm('Jeste li sigurni da želite obrisati izvoz?')) {
        if (confirm.isConfirmed) {
            try {
                Swal.fire('Izvoz izbrisan!', '', 'success');
                await fetch(`/api/izvozi/${izvoz._id}`, {
                    method: 'DELETE',
                });
                router.push('/');
            } catch (error) {
                console.error(error);
            }
        } else {
            Swal.fire('Izvoz nije izbrisan', '', 'info');
            // alert('Neuspjelo brisanje');
        }
    };

    const narudzbaFormatted = dayjs(izvoz.narudzba).format('DD.MM.YYYY');
    const isporukaFormatted = dayjs(izvoz.isporuka).format('DD.MM.YYYY');
    const kreiranFormatted = dayjs(izvoz.createdAt).format(
        'DD.MM.YYYY - HH:mm'
    );
    const ispravljenFormatted = dayjs(izvoz.updatedAt).format(
        'DD.MM.YYYY - HH:mm'
    );

    const komercijala = user.isKomercijala;
    const admin = user.isAdmin;

    return (
        <div>
            <div className={styles.header}>
                <h1>{izvoz.naziv}</h1>

                <div className={styles.iconContainer}>
                    <Link href={`/edit/${izvoz._id}`}>
                        <a>
                            <FontAwesomeIcon
                                icon={faEdit}
                                style={{
                                    marginRight: '14px',
                                }}
                                size='lg'
                                color='green'
                                className={styles.icon}
                            />
                        </a>
                    </Link>
                    {admin || komercijala ? (
                        <FontAwesomeIcon
                            icon={faTrash}
                            size='lg'
                            color='red'
                            className={styles.icon}
                            onClick={handleDelete}
                        />
                    ) : null}
                </div>
            </div>
            <hr style={{ marginTop: '10px' }} />
            <div className={styles.container}>
                <p>Datum narudžbe: {narudzbaFormatted}</p>
                <p>Datum isporuke: {isporukaFormatted}</p>
                <p>
                    Status proizvodnje:{' '}
                    {izvoz.proizvodnja === 'da' ? (
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            color='green'
                            size='1x'
                        />
                    ) : izvoz.proizvodnja === 'ne' ? (
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            color='red'
                            size='1x'
                        />
                    ) : izvoz.proizvodnja === 'utoku' ? (
                        <FontAwesomeIcon
                            icon={faMinusCircle}
                            color='orange'
                            size='1x'
                        />
                    ) : (
                        ''
                    )}
                </p>
                <p>
                    Status izvoza:{' '}
                    {izvoz.zavrsen ? (
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            color='green'
                            size='1x'
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faTimesCircle}
                            color='red'
                            size='1x'
                        />
                    )}
                </p>
                <p>
                    Unos kreiran: {kreiranFormatted} -{' '}
                    <span style={{ textTransform: 'capitalize' }}>
                        {izvoz.user && izvoz.user.name}
                    </span>
                </p>
                <p>
                    Unos ispravljen: {ispravljenFormatted} -{' '}
                    <span style={{ textTransform: 'capitalize' }}>
                        {izvoz.edit && izvoz.edit.name}
                    </span>
                </p>
                <h4>Narudzba</h4>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>RB</th>
                            <th>Artikal</th>
                            <th>Kartona</th>
                        </tr>
                    </thead>
                    <tbody>
                        {izvoz.proizvodi &&
                            izvoz.proizvodi.map((proizvod, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{proizvod.naziv}</td>
                                    <td>{proizvod.kolicina}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IzvozPage;

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
    const data = await IzvozModel.findById(id)
        .populate(['user', 'edit'])
        .exec();

    const userData = await UserModel.findOne({ name: session.user.name });
    const user = JSON.parse(JSON.stringify(userData));

    const izvoz = JSON.parse(JSON.stringify(data));
    return { props: { izvoz, session, user } };
}
