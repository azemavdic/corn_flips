import dbConnect from '../lib/dbConnect';
import IzvozModel from '../models/Izvoz';
import dayjs from 'dayjs';
import styles from '../css/Home.module.css';
import Izvoz from '../components/Izvoz';

const Index = ({ izvozi }) => {
    const formatedDate = izvozi.forEach((izvoz) =>
        dayjs(izvoz.narudzba).format('DD/MM/YYYY')
    );
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

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
    await dbConnect();

    /* find all the data in our database */
    const result = await IzvozModel.find({});
    const izvozi = result.map((doc) => {
        const izvoz = doc.toObject();
        izvoz._id = izvoz._id.toString();
        return izvoz;
    });

    return { props: { izvozi: izvozi } };
}

export default Index;
