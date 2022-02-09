import dbConnect from '../lib/dbConnect';
import IzvozModel from '../models/Izvoz';
import UserModel from '../models/User';
import styles from '../css/Home.module.css';
import Izvoz from '../components/Izvoz';
import Link from 'next/link';
import { getSession } from 'next-auth/client';
import { useGetIzvoziQuery } from '../redux/api/api';
import { useState } from 'react';
import { useEffect } from 'react';

const Index = ({ user }) => {
    const [odabranaGodina, setOdabranaGodina] = useState(
        new Date().getFullYear()
    );

    const { izvoziIsporuka } = useGetIzvoziQuery(undefined, {
        selectFromResult: ({ data }) => ({
            izvoziIsporuka: data.filter((izvoz) => {
                const god = new Date(izvoz.isporuka).getFullYear();
                return god === Number(odabranaGodina);
            }),
        }),
    });

    const proizvodnja = user.isProizvodnja;
    let index = 1;
    if (!user.isProizvodnja && !user.isKomercijala && !user.isAdmin) {
        return <p>Nemate pristup platformi</p>;
    }

    const handleChange = (e) => {
        setOdabranaGodina(e.target.value);
    };
    return (
        <>
            <div className={styles.header}>
                <h1>Raspored izvoza</h1>
                <div className={styles.select}>
                    <select value={odabranaGodina} onChange={handleChange}>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                        <option value='2023'>2023</option>
                    </select>
                </div>
                {!proizvodnja && (
                    <Link href='/dodaj'>
                        <a>Novi izvoz</a>
                    </Link>
                )}
            </div>
            <hr style={{ marginTop: '10px' }} />
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Kupac</th>
                            <th>Datum narudžbe</th>
                            <th>Proizvodnja status</th>
                            <th>Datum isporuke</th>
                            <th>Izvoz status</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {izvoziIsporuka &&
                            izvoziIsporuka.map((izvoz) => (
                                <Izvoz
                                    key={izvoz._id}
                                    izvoz={izvoz}
                                    index={index++}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

/* Retrieves izvoz(s) data from mongodb database */
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

    /* find all the data in our database */
    const result = await IzvozModel.find({}).sort({
        zavrsen: 1,
        isporuka: 1,
    });

    const userData = await UserModel.findOne({ name: session.user.name });
    const user = JSON.parse(JSON.stringify(userData));

    // const izvozi = JSON.parse(JSON.stringify(result));

    return { props: { session, user } };
}

export default Index;
