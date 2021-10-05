import dbConnect from '../lib/dbConnect';
import IzvozModel from '../models/Izvoz';
import UserModel from '../models/User';
import styles from '../css/Home.module.css';
import Izvoz from '../components/Izvoz';
import Link from 'next/link';
import { getSession } from 'next-auth/client';

const Index = ({ izvozi, user }) => {
    const proizvodnja = user.isProizvodnja;
    let index = 1;
    return (
        <>
            <div className={styles.header}>
                <h1>Raspored izvoza</h1>
                {!proizvodnja && (
                    <Link href='/dodaj'>
                        <a>Novi izvoz</a>
                    </Link>
                )}
            </div>
            <div>
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
                        {izvozi &&
                            izvozi.map((izvoz) => (
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

    const izvozi = JSON.parse(JSON.stringify(result));

    return { props: { izvozi, session, user } };
}

export default Index;
