import { useEffect, useRef, useState } from 'react';
import { getSession, signIn } from 'next-auth/client';
import styles from '../../css/Form.module.css';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Image from 'next/image';

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [disable, setDisable] = useState(false);

    const nameRef = useRef();
    const passwordRef = useRef();

    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.push('/');
            } else {
                setIsLoading(false);
            }
        });
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setDisable(true);
        const enteredName = nameRef.current.value;
        const enteredPassword = passwordRef.current.value;

        const result = await signIn('credentials', {
            redirect: false,
            name: enteredName,
            password: enteredPassword,
        });

        if (!result.error) {
            toast.success('Uspješna prijava');
            router.push('/');
            // setIsLoading(false);
            // setDisable(false);
        } else {
            console.log(result);
            toast.error(result.error);
            setIsLoading(false);
            setDisable(false);
            return;
        }
    };

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    return (
        <div>
            <h1 className={styles.center}>Prijava</h1>
            <hr style={{ marginTop: '10px' }} />
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <div className='mb-20'>
                        <label htmlFor='name'>Korisničko ime</label>
                        <input type='text' id='name' ref={nameRef} />
                    </div>
                    <div>
                        <label htmlFor='password'>Šifra</label>
                        <input
                            type='password'
                            id='password'
                            ref={passwordRef}
                        />
                    </div>
                    {isLoading ? (
                        <Image src='/spinner.gif' width={100} height={70} />
                    ) : (
                        <input
                            type='submit'
                            value='Prijava'
                            disabled={disable}
                        />
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
