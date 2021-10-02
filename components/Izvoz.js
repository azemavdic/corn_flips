import dayjs from "dayjs";
import Link from "next/link";
import styles from "../css/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const Izvoz = ({ izvoz, index }) => {
  const narudzbaFormatted = dayjs(izvoz.narudzba).format("DD.MM.YYYY");
  const isporukaFormatted = dayjs(izvoz.isporuka).format("DD.MM.YYYY");
  const sadasnjiDatum = dayjs(Date.now());

  const danaDoIzvoza =
    Number(dayjs(izvoz.isporuka).diff(sadasnjiDatum, "day")) + 1;

  const doIzvoza =
    danaDoIzvoza <= 0 ? (
      ""
    ) : (
      <span>
        (
        {danaDoIzvoza === 1
          ? "1 dan do izvoza"
          : `${danaDoIzvoza} dana do izvoza`}{" "}
        )
      </span>
    );

  return (
    <tr key={izvoz._id}>
      <td>{index}</td>
      <td>
        <Link href={`/${izvoz._id}`}>
          <a style={{ color: "#333", fontWeight: "600" }}>{izvoz.naziv}</a>
        </Link>
      </td>
      <td>{narudzbaFormatted}</td>
      <td style={{ textAlign: "center" }}>
        {izvoz.proizvodnja ? (
          <div className={styles.doizvoza}>
            <FontAwesomeIcon icon={faCheckCircle} color='green' size='2x' />
            {doIzvoza}
          </div>
        ) : (
          <div className={styles.doizvoza}>
            <FontAwesomeIcon icon={faTimesCircle} color='red' size='2x' />
            {doIzvoza}
          </div>
        )}
      </td>
      <td>{isporukaFormatted}</td>
      <td>
        {izvoz.zavrsen ? (
          <p style={{ color: "green" }}>Završen</p>
        ) : (
          <p
            style={{
              color: "orangered",
            }}
          >
            U toku
          </p>
        )}
      </td>
      <td>
        <Link href={`/edit/${izvoz._id}`}>
          <a className={styles.button}>Izmjene</a>
        </Link>
      </td>
    </tr>
  );
};

export default Izvoz;
