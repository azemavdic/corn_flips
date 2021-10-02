import dbConnect from "../lib/dbConnect";
import IzvozModel from "../models/Izvoz";
import styles from "../css/Home.module.css";
import Izvoz from "../components/Izvoz";
import Link from "next/link";

const Index = ({ izvozi }) => {
  let index = 1;
  return (
    <>
      <div className={styles.header}>
        <h1>Raspored izvoza</h1>
        <Link href='/dodaj'>
          <a>Novi izvoz</a>
        </Link>
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
                <Izvoz key={izvoz._id} izvoz={izvoz} index={index++} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

/* Retrieves izvoz(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await IzvozModel.find({}).sort({
    zavrsen: 1,
    isporuka: 1,
  });
  const izvozi = result.map((doc) => {
    const izvoz = doc.toObject();
    izvoz._id = izvoz._id.toString();
    return izvoz;
  });

  return { props: { izvozi: izvozi } };
}

export default Index;
