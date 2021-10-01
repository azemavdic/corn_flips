import dbConnect from '../lib/dbConnect';
import Izvoz from '../models/Izvoz';
import styles from '../css/Home.module.css';

const Index = ({ izvozi }) => {
    let index = 1;
    return (
        <>
            <h1>Raspored izvoza</h1>
            <div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Kupac</th>
                            <th>Datum narudžbe</th>
                            <th>Datum isporuke</th>
                            <th>Završen</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {izvozi &&
                            izvozi.map((izvoz) => {
                                return (
                                    <tr key={izvoz._id}>
                                        <td>{index++}</td>
                                        <td>{izvoz.naziv}</td>
                                        <td>{izvoz.narudzba}</td>
                                        <td>{izvoz.isporuka}</td>
                                        <td>
                                            {izvoz.zavrsen ? (
                                                <p style={{ color: 'green' }}>
                                                    Završen
                                                </p>
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
                                            <button className={styles.button}>
                                                Izmjene
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
    await dbConnect();

    /* find all the data in our database */
    const result = await Izvoz.find({});
    const izvozi = result.map((doc) => {
        const izvoz = doc.toObject();
        izvoz._id = izvoz._id.toString();
        return izvoz;
    });

    return { props: { izvozi: izvozi } };
}

export default Index;
