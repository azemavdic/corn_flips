import { getSession } from 'next-auth/client'
import { useState } from 'react'
import { useRef } from 'react'
import styles from '../css/Profil.module.css'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const Profil = () => {
  const [poruka, setPoruka] = useState(null)
  const [status, setStatus] = useState(false)
  const staraSifraRef = useRef()
  const novaSifraRef = useRef()

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const enteredStaraSifra = staraSifraRef.current.value
    const enteredNovaSifra = novaSifraRef.current.value

    if (!enteredStaraSifra || !enteredNovaSifra) {
      setPoruka('Molimo popunite sva polja')
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
      return
    }
    toast.success('Uspješna promjena šifre')
    router.push('/')
  }
  return (
    <div className={styles.profil}>
      <h2>Promijeni šifru</h2>
      {poruka && (
        <p className={!status ? styles.greska : styles.uspjesno}>{poruka}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='sifra'>Stara šifra</label>
          <input type='text' name='sifra' ref={staraSifraRef} />
        </div>
        <div>
          <label htmlFor='novaSifra'>Nova šifra</label>
          <input type='text' name='novaSifra' ref={novaSifraRef} />
        </div>
        <button className='btn'>Promijeni</button>
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
