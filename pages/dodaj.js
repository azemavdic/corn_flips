import { useState } from "react";
import dbConnect from "../lib/dbConnect";
import { useRouter } from "next/router";
import styles from "../css/Form.module.css";
import { redirectToLogin } from "../utils/notAuth";
import { getSession } from "next-auth/client";
import { toast } from "react-toastify";
import UserModel from "../models/User";

const DodajIzvoz = ({ user }) => {
  redirectToLogin();
  const [naziv, setNaziv] = useState("");
  const [narudzba, setNarudzba] = useState("");
  const [isporuka, setIsporuka] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const izvoz = { naziv, narudzba, isporuka, user: user._id };
    const res = await fetch("/api/izvozi", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(izvoz),
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Uspješno dodan izvoz");
    router.push("/");
  };

  return (
    <>
      <h1>Dodaj izvoz</h1>
      <hr style={{ marginTop: "10px" }} />
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
          <input type='submit' value='Potvrdi' />
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
        destination: "/auth/login",
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
