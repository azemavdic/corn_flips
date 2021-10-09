import { getSession } from "next-auth/client";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import styles from "../../css/User.module.css";
import dayjs from "dayjs";

const ProfilePage = ({ user }) => {
  const kreiran = dayjs(user.createdAt).format("DD.MM.YYYY");

  let ovlastenja;

  if (user.isAdmin) {
    ovlastenja = "Admin";
  } else if (user.isProizvodnja) {
    ovlastenja = "Proizvodnja";
  } else {
    ovlastenja = "Komercijala";
  }

  return (
    <div className={styles.container}>
      <h1>{user.name}</h1>
      <hr style={{ marginTop: "10px" }} />
      <div className={styles.body}>
        <a href={`mailto:${user.email}`}>Email: {user.email}</a>
        <p>Ovlaštenja: {ovlastenja}</p>
        <p>Kreiran: {kreiran}</p>
      </div>
    </div>
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
  await dbConnect();

  const id = ctx.query.id;
  const data = await User.findById(id).lean();

  const user = JSON.parse(JSON.stringify(data));

  return { props: { session, user } };
}

export default ProfilePage;
