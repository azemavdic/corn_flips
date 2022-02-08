import { useState } from 'react';
import { useRef } from 'react';
import styles from '../css/Profil.module.css';

const Profil = () => {
    const [poruka, setPoruka] = useState(null);
    const staraSifraRef = useRef();
    const novaSifraRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredStaraSifra = staraSifraRef.current.value;
        const enteredNovaSifra = novaSifraRef.current.value;

        if (!enteredStaraSifra || !enteredNovaSifra) {
            setPoruka('Molimo popunite sva polja');
            setTimeout(() => {
                setPoruka(null);
            }, 3000);
            return;
        }
        console.log(enteredStaraSifra);
        console.log(enteredNovaSifra);
    };
    return (
        <div className={styles.profil}>
            <h2>Promijeni šifru</h2>
            {poruka && <p className={styles.poruka}>{poruka}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='sifra'>Stara šifra</label>
                    <input type='text' name='sifra' ref={staraSifraRef} />
                </div>
                <div>
                    <label htmlFor='novaSifra'>Nova šifra</label>
                    <input type='text' name='novaSifra' ref={novaSifraRef} />
                </div>
                <button className='btn'>Promijeni</button>
            </form>
        </div>
    );
};

export default Profil;
