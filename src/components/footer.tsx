'use client'

import useLocale from "src/hooks/use-locale";
import { FOOTER } from "src/locale/constants";


export default function Footer() {
  const { t } = useLocale(FOOTER);


  return (

    <footer className="w-full bg-white text-black text-lg py-3 flex justify-center md:mt-20">{t('madeWith')}
    <div className="text-red-500 px-2 text-2xl">❤</div>{t('by')} {t('holderName')}
    </footer>
  )
}
