import { redirect } from 'next/navigation'
import { defaultLocale } from '@/config/i18n'

export default function Home() {
  redirect(`/${defaultLocale}`)
}
