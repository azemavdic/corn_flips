import dayjs from 'dayjs';
import Link from 'next/link';
import styles from '../css/Home.module.css';

const Izvoz = ({ izvoz, index }) => {
    const narudzbaFormatted = dayjs(izvoz.narudzba).format('DD.MM.YYYY');
    const isporukaFormatted = dayjs(izvoz.isporuka).format('DD.MM.YYYY');

    return (
        <tr key={izvoz._id}>
            <td>{index}</td>
            <td>{izvoz.naziv}</td>
            <td>{narudzbaFormatted}</td>
            <td>{isporukaFormatted}</td>
            <td>
                {izvoz.zavrsen ? (
                    <p style={{ color: 'green' }}>Završen</p>
                ) : (
                    <p
                        style={{
                            color: 'orangered',
                        }}
                    >
                        U toku
                    </p>
                )}
            </td>
            <td>
                <Link href={izvoz._id}>
                    <a className={styles.button}>Izmjene</a>
                </Link>
            </td>
        </tr>
    );
};

export default Izvoz;
