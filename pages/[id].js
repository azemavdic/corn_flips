import dbConnect from "../lib/dbConnect";
import Link from "next/link";
import IzvozModel from "../models/Izvoz";
import UserModel from "../models/User";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faEdit,
  faTrash,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Izvoz.module.css";
import { getSession } from "next-auth/client";

const IzvozPage = ({ izvoz, user }) => {
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Jeste li sigurni da želite obrisati izvoz?")) {
      try {
        await fetch(`/api/izvozi/${izvoz._id}`, {
          method: "DELETE",
        });
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Neuspjelo brisanje");
    }
  };

  const narudzbaFormatted = dayjs(izvoz.narudzba).format("DD.MM.YYYY");
  const isporukaFormatted = dayjs(izvoz.isporuka).format("DD.MM.YYYY");
  const kreiranFormatted = dayjs(izvoz.createdAt).format("DD.MM.YYYY - HH:m");
  const ispravljenFormatted = dayjs(izvoz.updatedAt).format(
    "DD.MM.YYYY - HH:m"
  );

  const komercijala = user.isKomercijala;
  const proizvodnja = user.isProizvodnja;

  return (
    <div>
      <div className={styles.header}>
        <h1>{izvoz.naziv}</h1>

        <div>
          <Link href={`/edit/${izvoz._id}`}>
            <a>
              <FontAwesomeIcon
                icon={faEdit}
                style={{
                  marginRight: "14px",
                  cursor: "pointer",
                }}
                size='lg'
                color='green'
              />
            </a>
          </Link>
          {komercijala ||
            (!proizvodnja && (
              <FontAwesomeIcon
                icon={faTrash}
                size='lg'
                color='red'
                style={{ cursor: "pointer" }}
                onClick={handleDelete}
              />
            ))}
        </div>
      </div>
      <hr style={{ marginTop: "10px" }} />
      <div className={styles.container}>
        <p>Datum narudžbe: {narudzbaFormatted}</p>
        <p>Datum isporuke: {isporukaFormatted}</p>
        <p>
          Status proizvodnje:{" "}
          {izvoz.proizvodnja === "da" ? (
            <FontAwesomeIcon icon={faCheckCircle} color='green' size='1x' />
          ) : izvoz.proizvodnja === "ne" ? (
            <FontAwesomeIcon icon={faTimesCircle} color='red' size='1x' />
          ) : izvoz.proizvodnja === "utoku" ? (
            <FontAwesomeIcon icon={faMinusCircle} color='orange' size='1x' />
          ) : (
            ""
          )}
        </p>
        <p>
          Status izvoza:{" "}
          {izvoz.zavrsen ? (
            <FontAwesomeIcon icon={faCheckCircle} color='green' size='1x' />
          ) : (
            <FontAwesomeIcon icon={faTimesCircle} color='red' size='1x' />
          )}
        </p>
        <p>
          Unos kreiran: {kreiranFormatted} -{" "}
          <span style={{ textTransform: "capitalize" }}>
            {izvoz.user && izvoz.user.name}
          </span>
        </p>
        <p>
          Unos ispravljen: {ispravljenFormatted} -{" "}
          <span style={{ textTransform: "capitalize" }}>
            {izvoz.edit && izvoz.edit.name}
          </span>
        </p>
      </div>
    </div>
  );
};

export default IzvozPage;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  await dbConnect();
  const id = ctx.query.id;
  const data = await IzvozModel.findById(id).populate(["user", "edit"]).exec();

  const userData = await UserModel.findOne({ name: session.user.name });
  const user = JSON.parse(JSON.stringify(userData));

  const izvoz = JSON.parse(JSON.stringify(data));
  return { props: { izvoz, session, user } };
}
