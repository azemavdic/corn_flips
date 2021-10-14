import { useState } from 'react';
import dbConnect from '../lib/dbConnect';
import { useRouter } from 'next/router';
import styles from '../css/Form.module.css';
import { redirectToLogin } from '../utils/notAuth';
import { getSession } from 'next-auth/client';
import { toast } from 'react-toastify';
import UserModel from '../models/User';
import Modal from '../components/Modal';
import Narudzba from '../components/Narudzba';
import Image from 'next/image';

const DodajIzvoz = ({ user }) => {
    redirectToLogin();
    const [naziv, setNaziv] = useState('');
    const [narudzba, setNarudzba] = useState('');
    const [isporuka, setIsporuka] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //Test
    const [inputList, setInputList] = useState([{ naziv: '', kolicina: '' }]);
    const [select, setSelect] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const izvoz = {
            naziv,
            narudzba,
            isporuka,
            user: user._id,
            proizvodi: inputList,
        };

        const res = await fetch('/api/izvozi', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(izvoz),
        });
        const data = await res.json();

        if (!naziv || !narudzba || !isporuka) {
            toast.error('Molimo popunite sva polja');
            setIsLoading(false);
            return;
        }

        if (data.success === false) {
            toast.error(data.message);
            setIsLoading(false);
            return;
        }

        toast.success('Uspješno dodan izvoz');
        router.push('/');
    };

    //Test
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        list[index]['naziv'] = select.label;
        setInputList(list);
    };
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    const handleAddClick = () => {
        setInputList([...inputList, { naziv: '', kolicina: '' }]);
    };

    return (
        <>
            <div className='space-betw'>
                <h1>Dodaj izvoz</h1>
                <button
                    className='btn btn-sec'
                    onClick={() => setShowModal(true)}
                >
                    Dodaj proizvode
                </button>
            </div>
            <hr style={{ marginTop: '10px' }} />
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
                    {isLoading ? (
                        <Image src='/spinner.gif' width={100} height={70} />
                    ) : (
                        <input type='submit' value='Potvrdi' />
                    )}

                    <Modal show={showModal} onClose={() => setShowModal(false)}>
                        <h2>Dodaj proizvode</h2>
                        {inputList.map((el, i) => (
                            <Narudzba
                                key={i}
                                el={el}
                                onInputChange={handleInputChange}
                                onRemove={handleRemoveClick}
                                onAdd={handleAddClick}
                                inputList={inputList}
                                i={i}
                                setSelect={setSelect}
                                // select={select}
                            />
                        ))}
                        <button
                            className='btn'
                            onClick={() => setShowModal(false)}
                        >
                            Potvrdi
                        </button>
                    </Modal>
                </form>
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
    const name = session.user.name;

    await dbConnect();
    const userData = await UserModel.findOne({ name });
    const user = JSON.parse(JSON.stringify(userData));
    return { props: { session, user } };
}

export default DodajIzvoz;
