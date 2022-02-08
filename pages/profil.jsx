import { getSession } from 'next-auth/client'
import { useState } from 'react'
import { useRef } from 'react'
import styles from '../css/Profil.module.css'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Profil = () => {
  const [poruka, setPoruka] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const staraSifraRef = useRef()
  const novaSifraRef = useRef()

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const enteredStaraSifra = staraSifraRef.current.value
    const enteredNovaSifra = novaSifraRef.current.value

    if (!enteredStaraSifra || !enteredNovaSifra) {
      setPoruka('Molimo popunite sva polja')
      setIsLoading(false)
      setTimeout(() => {
        setPoruka(null)
      }, 3000)
      return
    }
    const res = await fetch('/api/auth/promjena-sifre', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        staraSifra: enteredStaraSifra,
        novaSifra: enteredNovaSifra,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setPoruka(data.poruka)
      setIsLoading(false)
      return
    }
    toast.success('Uspješna promjena šifre')
    setIsLoading(false)
    router.push('/')
  }
  return (
    <div className={styles.profil}>
      <h2>Promijeni šifru</h2>
      {poruka && <p className={styles.greska}>{poruka}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='sifra'>Stara šifra</label>
          <input type='text' name='sifra' ref={staraSifraRef} />
        </div>
        <div>
          <label htmlFor='novaSifra'>Nova šifra</label>
          <input type='text' name='novaSifra' ref={novaSifraRef} />
        </div>
        {isLoading ? (
          <Image src='/spinner.gif' width={100} height={70} />
        ) : (
          <button className='btn' disabled={isLoading}>
            Promijeni
          </button>
        )}
      </form>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default Profil
