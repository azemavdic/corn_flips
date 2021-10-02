import Head from "next/head";
import Link from "next/link";
import styles from "../css/Layout.module.css";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Corn Flips Dashboard</title>
      </Head>
      <div className={styles.container}>
        <header>
          <div className={styles.logo}>
            <Link href='/'>
              <a href='#'>Corn Flips</a>
            </Link>
          </div>
        </header>
        {/* <nav className={styles.nav}>
                    <ul>
                        <li>
                            <Link href='/dodaj'>
                                <a href='#'>Dodaj</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/prijava'>
                                <a href='#'>Prijava</a>
                            </Link>
                        </li>
                    </ul>
                </nav> */}
      </div>
      <div className={styles.dashboard}>
        <Sidebar />
        <div className='box'>{children}</div>
      </div>
    </>
  );
}

export default Layout;
