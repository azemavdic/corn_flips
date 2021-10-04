import { useState } from 'react';
import dbConnect from '../../lib/dbConnect';
import { useRouter } from 'next/router';
import styles from '../../css/Form.module.css';
import IzvozModel from '../../models/Izvoz';

const IzvozPageEdit = ({ izvoz }) => {
    const [naziv, setNaziv] = useState(izvoz.naziv);
    const [narudzba, setNarudzba] = useState(izvoz.narudzba);
    const [isporuka, setIsporuka] = useState(izvoz.isporuka);
    const [zavrsen, setZavrsen] = useState(izvoz.zavrsen);
    const [proizvodnja, setProizvodnja] = useState(izvoz.proizvodnja);

    const router = useRouter();
    const id = router.query.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/izvozi/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                naziv,
                narudzba,
                isporuka,
                zavrsen,
                proizvodnja,
            }),
        });

        const data = await res.json();

        router.push('/');
    };

    return (
        <>
            <h1>Izmijeni izvoz</h1>
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
                        <label htmlFor='zavrsen'>Izvoz status</label>
                        <input
                            type='checkbox'
                            id='zavrsen'
                            checked={zavrsen}
                            onChange={() => setZavrsen(!zavrsen)}
                        />
                    </div>
                    <div className={styles.check}>
                        <label htmlFor='proizvodnja'>Proizvodnja status</label>
                        <input
                            type='checkbox'
                            id='proizvodnja'
                            checked={proizvodnja}
                            onChange={() => setProizvodnja(!proizvodnja)}
                        />
                    </div>
                    <input type='submit' value='Ispravi' />
                </form>
            </div>
        </>
    );
};

export async function getServerSideProps({ query }) {
    await dbConnect();
    const id = query.id;
    const data = await IzvozModel.findById(id).lean();
    const izvoz = JSON.parse(JSON.stringify(data));
    return { props: { izvoz } };
}

export default IzvozPageEdit;
