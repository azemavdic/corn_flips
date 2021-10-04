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
        const izvoz = {
            naziv,
            narudzba,
            isporuka,
            zavrsen,
            proizvodnja,
        };
        const res = await fetch(`/api/izvozi/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(izvoz),
        });

        const data = await res.json();

        router.push('/');
    };

    const handleChange = (e) => {
        setProizvodnja(e.target.value);
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
                    <div className={styles.center}>
                        <div className={styles.check}>
                            <label htmlFor='zavrsen'>Izvoz status</label>
                            <input
                                type='checkbox'
                                id='zavrsen'
                                checked={zavrsen}
                                onChange={() => setZavrsen(!zavrsen)}
                            />
                        </div>
                        <div>
                            <p>Proizvodnja status:</p>
                            <div className={styles.radio}>
                                <label htmlFor='ne'>
                                    <input
                                        type='radio'
                                        id='ne'
                                        value='ne'
                                        name='proizvodnja'
                                        checked={proizvodnja === 'ne'}
                                        onChange={handleChange}
                                    />
                                    Nije počela
                                </label>
                                <label htmlFor='utoku'>
                                    <input
                                        type='radio'
                                        id='utoku'
                                        value='utoku'
                                        name='proizvodnja'
                                        checked={proizvodnja === 'utoku'}
                                        onChange={handleChange}
                                    />
                                    U toku
                                </label>
                                <label htmlFor='da'>
                                    <input
                                        type='radio'
                                        id='da'
                                        value='da'
                                        name='proizvodnja'
                                        checked={proizvodnja === 'da'}
                                        onChange={handleChange}
                                    />
                                    Završena
                                </label>
                            </div>
                        </div>
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
