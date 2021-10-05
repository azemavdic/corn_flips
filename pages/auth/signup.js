import { useRef } from "react";
import styles from "../../css/Form.module.css";

const SignUpPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const user = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div>
      <h1 className={styles.center}>Registracija</h1>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Korisničko ime</label>
            <input type='text' id='name' ref={nameRef} />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' ref={emailRef} />
          </div>
          <div>
            <label htmlFor='password'>Šifra</label>
            <input type='password' id='password' ref={passwordRef} />
          </div>
          <input type='submit' value='Registracija' />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
