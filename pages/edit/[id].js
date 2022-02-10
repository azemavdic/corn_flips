import { useState } from 'react';
import dbConnect from '../../lib/dbConnect';
import { useRouter } from 'next/router';
import styles from '../../css/Form.module.css';
import IzvozModel from '../../models/Izvoz';
import UserModel from '../../models/User';
import { getSession } from 'next-auth/client';
import { toast } from 'react-toastify';
import Image from 'next/image';
import ToggleSwitch from '../../components/ToggleSwitch';
import { useEditIzvozMutation } from '../../redux/api/api';

const IzvozPageEdit = ({ izvoz, user }) => {
    const [naziv, setNaziv] = useState(izvoz.naziv);
    const [narudzba, setNarudzba] = useState(izvoz.narudzba);
    const [isporuka, setIsporuka] = useState(izvoz.isporuka);
    const [zavrsen, setZavrsen] = useState(izvoz.zavrsen);
    const [proizvodnja, setProizvodnja] = useState(izvoz.proizvodnja);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const id = router.query.id;

    const [editIzvoz, { isError }] = useEditIzvozMutation({
        fixedCacheKey: 'shared-update-post',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const izvoz = {
            naziv,
            narudzba,
            isporuka,
            zavrsen,
            proizvodnja,
            edit: user._id,
        };

        if (isError) {
            toast.error('Neuspješna promjena podataka');
            setIsLoading(false);
            return;
        }

        await editIzvoz({
            id,
            naziv,
            narudzba,
            isporuka,
            zavrsen,
            proizvodnja,
            edit: user._id,
        });
        toast.success('Uspješna promjena');
        router.push('/');
    };

    const handleChange = (e) => {
        setProizvodnja(e.target.value);
    };

    const onToggleChange = () => setZavrsen(!zavrsen);

    const komercijala = user.isKomercijala;
    const proizvodnjaa = user.isProizvodnja;

    return (
        <div style={{ paddingBottom: '100px' }}>
            <h1>Izmijeni izvoz</h1>
            <hr style={{ marginTop: '10px' }} />
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    {!komercijala && !proizvodnjaa && (
                        <>
                            <div className='mt-100'>
                                <label htmlFor='naziv'>Naziv</label>
                                <input
                                    type='text'
                                    id='naziv'
                                    value={naziv}
                                    onChange={(e) => setNaziv(e.target.value)}
                                />
                            </div>
                            <div className='mt-20'>
                                <label htmlFor='narudzba'>Datum narudžbe</label>
                                <input
                                    type='date'
                                    id='narudzba'
                                    value={narudzba}
                                    onChange={(e) =>
                                        setNarudzba(e.target.value)
                                    }
                                />
                            </div>

                            <div className='my-20'>
                                <label htmlFor='isporuka'>Datum isporuke</label>
                                <input
                                    type='date'
                                    id='isporuka'
                                    value={isporuka}
                                    onChange={(e) =>
                                        setIsporuka(e.target.value)
                                    }
                                />
                            </div>
                        </>
                    )}
                    <div className={styles.center}>
                        {!proizvodnja ||
                            (komercijala && (
                                <div
                                    className={styles.toggleContainer}
                                    style={{ padding: '5px' }}
                                >
                                    <ToggleSwitch
                                        label='Izvoz-status'
                                        zavrsen={zavrsen}
                                        changeToggle={onToggleChange}
                                    />
                                </div>
                            ))}

                        {user.isAdmin && (
                            <div
                                className={styles.toggleContainer}
                                style={{ padding: '5px' }}
                            >
                                <ToggleSwitch
                                    label='Izvoz-status'
                                    zavrsen={zavrsen}
                                    changeToggle={onToggleChange}
                                />
                            </div>
                        )}

                        <div className={styles.radioContainer}>
                            {!komercijala && (
                                <>
                                    <p
                                        style={{
                                            padding: '10px',
                                            marginTop: '10px',
                                        }}
                                    >
                                        Proizvodnja status:
                                    </p>
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
                                                checked={
                                                    proizvodnja === 'utoku'
                                                }
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
                                </>
                            )}
                        </div>
                    </div>
                    {isLoading ? (
                        <div
                            style={{
                                overflow: 'visible',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image src='/spinner.gif' width={100} height={70} />
                        </div>
                    ) : (
                        <input
                            type='submit'
                            value='Ispravi'
                            className={styles.btnIspravi}
                        />
                    )}
                </form>
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
    const data = await IzvozModel.findById(id).populate('user').exec();

    const userData = await UserModel.findOne({ name: session.user.name });
    const user = JSON.parse(JSON.stringify(userData));

    const izvoz = JSON.parse(JSON.stringify(data));
    return { props: { izvoz, session, user } };
}

export default IzvozPageEdit;
