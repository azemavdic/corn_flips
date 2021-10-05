import { useEffect, useRef, useState } from "react";
import { getSession, signIn } from "next-auth/client";
import styles from "../../css/Form.module.css";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const nameRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      name: enteredName,
      password: enteredPassword,
    });

    if (!result.error) {
      router.push("/");
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className={styles.center}>Prijava</h1>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Korisničko ime</label>
            <input type='text' id='name' ref={nameRef} />
          </div>
          <div>
            <label htmlFor='password'>Šifra</label>
            <input type='password' id='password' ref={passwordRef} />
          </div>
          <input type='submit' value='Prijava' />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
