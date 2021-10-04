import dbConnect from '../lib/dbConnect';
import Link from 'next/link';
import IzvozModel from '../models/Izvoz';
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

const IzvozPage = ({ izvoz }) => {
    const router = useRouter();

    const handleDelete = async (e) => {
        e.preventDefault();
        if (window.confirm('Jeste li sigurni da želite obrisati izvoz?')) {
            try {
                await fetch(`/api/izvozi/${izvoz._id}`, {
                    method: 'DELETE',
                });
                router.push('/');
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Neuspjelo brisanje');
        }
    };

    const narudzbaFormatted = dayjs(izvoz.narudzba).format('DD.MM.YYYY');
    const isporukaFormatted = dayjs(izvoz.isporuka).format('DD.MM.YYYY');
    const kreiranFormatted = dayjs(izvoz.createdAt).format('DD.MM.YYYY - HH:m');
    const ispravljenFormatted = dayjs(izvoz.updatedAt).format(
        'DD.MM.YYYY - HH:m'
    );
    return (
        <div>
            <div className={styles.header}>
                <h1>{izvoz.naziv}</h1>
                <div>
                    <Link href={`/edit/${izvoz._id}`}>
                        <FontAwesomeIcon
                            icon={faEdit}
                            style={{ marginRight: '14px', cursor: 'pointer' }}
                            size='lg'
                            color='green'
                        />
                    </Link>
                    <FontAwesomeIcon
                        icon={faTrash}
                        size='lg'
                        color='red'
                        style={{ cursor: 'pointer' }}
                        onClick={handleDelete}
                    />
                </div>
            </div>
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
                <p>Unos kreiran: {kreiranFormatted}</p>
                <p>Unos ispravljen: {ispravljenFormatted}</p>
            </div>
        </div>
    );
};

export default IzvozPage;

export async function getServerSideProps({ query }) {
    await dbConnect();
    const id = query.id;
    const data = await IzvozModel.findById(id).lean();
    const izvoz = JSON.parse(JSON.stringify(data));
    return { props: { izvoz } };
}
