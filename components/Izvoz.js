import dayjs from "dayjs";
import Link from "next/link";
import styles from "../css/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faMinusCircle,
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
    ) : isporukaFormatted === sadasnjiDatum.format("DD.MM.YYYY") ? (
      "(Danas je izvoz)"
    ) : (
      <span>
        (
        {danaDoIzvoza === 1
          ? "Sutra je izvoz"
          : `${danaDoIzvoza} dana do izvoza`}{" "}
        )
      </span>
    );

  return (
    <tr key={izvoz._id}>
      <td>{index}</td>
      <td>
        <Link href={`/${izvoz._id}`}>
          <a className={styles.naziv}>{izvoz.naziv}</a>
        </Link>
      </td>
      <td>{narudzbaFormatted}</td>
      <td style={{ textAlign: "center" }}>
        {izvoz.proizvodnja === "da" ? (
          <div className={styles.doizvoza}>
            <FontAwesomeIcon icon={faCheckCircle} color='green' size='2x' />
          </div>
        ) : izvoz.proizvodnja === "ne" ? (
          <div className={styles.doizvoza}>
            <FontAwesomeIcon icon={faTimesCircle} color='red' size='2x' />
          </div>
        ) : izvoz.proizvodnja === "utoku" ? (
          <div className={styles.doizvoza}>
            <FontAwesomeIcon icon={faMinusCircle} color='orange' size='2x' />
          </div>
        ) : (
          ""
        )}
      </td>
      <td>
        <div className='flex-col'>
          {isporukaFormatted}
          {doIzvoza}
        </div>
      </td>
      <td>
        {izvoz.zavrsen ? (
          <div className={styles.doizvoza}>
            <FontAwesomeIcon icon={faCheckCircle} color='green' size='2x' />
          </div>
        ) : (
          <div className={styles.doizvoza}>
            <FontAwesomeIcon icon={faTimesCircle} color='red' size='2x' />
          </div>
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
