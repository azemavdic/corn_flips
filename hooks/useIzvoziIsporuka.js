import { useSelector } from 'react-redux'
import { useGetIzvoziQuery } from '../redux/api/api'

export const useIzvoziIsporuka = () => {
  const odabranaGodina = useSelector((state) => state.godina.value)

  const { izvoziIsporuka } = useGetIzvoziQuery(undefined, {
    selectFromResult: ({ data }) => ({
      izvoziIsporuka: data?.data.filter((izvoz) => {
        const god = new Date(izvoz?.isporuka).getFullYear()
        return god === Number(odabranaGodina)
      }),
    }),
  })

  return izvoziIsporuka
}
