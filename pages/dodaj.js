import { useState } from 'react';
import dbConnect from '../lib/dbConnect';
import { useRouter } from 'next/router';
import styles from '../css/Form.module.css';

const DodajIzvoz = () => {
    const [naziv, setNaziv] = useState('');
    const [narudzba, setNarudzba] = useState('');
    const [isporuka, setIsporuka] = useState('');
    const [zavrsen, setZavrsen] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/izvozi', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ naziv, narudzba, isporuka, zavrsen }),
        });

        const data = await res.json();

        router.push('/');
    };

    return (
        <>
            <h1>Dodaj izvoz</h1>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='naziv'>Naziv</label>
                        <input
                            type='text'
                            id='naziv'
                            value={naziv}
                            onChange={(e) => setNaziv(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='narudzba'>Datum narudžbe</label>
                        <input
                            type='date'
                            id='narudzba'
                            value={narudzba}
                            onChange={(e) => setNarudzba(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='isporuka'>Datum isporuke</label>
                        <input
                            type='date'
                            id='isporuka'
                            value={isporuka}
                            onChange={(e) => setIsporuka(e.target.value)}
                        />
                    </div>
                    <div className={styles.check}>
                        <label htmlFor='zavrsen'>Završen</label>
                        <input
                            type='checkbox'
                            id='zavrsen'
                            value={isporuka}
                            onChange={() => setZavrsen(!zavrsen)}
                        />
                    </div>
                    <input type='submit' value='Dodaj' />
                </form>
            </div>
        </>
    );
};

export async function getStaticProps() {
    await dbConnect();
    return { props: {} };
}

export default DodajIzvoz;
