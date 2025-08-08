'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales, localeNames } from '@/config/i18n'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [currentLang, setCurrentLang] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentLang(pathname.split('/')[1])
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始检查

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${newLocale}`)
    router.push(newPath)
    setOpen(false)
  }

  if (!mounted) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-2 px-2 h-9",
            scrolled
              ? "text-foreground hover:text-foreground bg-gray-100/0 hover:bg-gray-100 px-3 rounded-full text-white"
              : "text-white hover:text-white hover:bg-white/10 px-3 rounded-full"
          )}
        >
          <Globe className={cn(
            "h-4 w-4",
            "text-white"
          )} />
          <span className="hidden sm:inline-block">
            {localeNames[currentLang as keyof typeof localeNames]}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-2 rounded-2xl shadow-none"
        align="end"
      >
        <div className="grid gap-1">
          {locales.map((locale) => (
            <Button
              key={locale}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 font-normal rounded-xl",
                currentLang === locale && "bg-accent"
              )}
              onClick={() => handleChange(locale)}
            >
              <span>{localeNames[locale as keyof typeof localeNames]}</span>
              {currentLang === locale && (
                <Check className="h-4 w-4 ml-auto" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
} 