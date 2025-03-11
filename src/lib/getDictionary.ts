const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  zh: () => import('@/dictionaries/zh.json').then(module => module.default),
  ja: () => import('@/dictionaries/ja.json').then(module => module.default),
  ko: () => import('@/dictionaries/ko.json').then(module => module.default),
  fr: () => import('@/dictionaries/fr.json').then(module => module.default),
  de: () => import('@/dictionaries/de.json').then(module => module.default),
  es: () => import('@/dictionaries/es.json').then(module => module.default),
  pt: () => import('@/dictionaries/pt.json').then(module => module.default),
  it: () => import('@/dictionaries/it.json').then(module => module.default),
  ru: () => import('@/dictionaries/ru.json').then(module => module.default),
  ar: () => import('@/dictionaries/ar.json').then(module => module.default),
  el: () => import('@/dictionaries/el.json').then(module => module.default),
  nl: () => import('@/dictionaries/nl.json').then(module => module.default),
  id: () => import('@/dictionaries/id.json').then(module => module.default),
  pl: () => import('@/dictionaries/pl.json').then(module => module.default),
  th: () => import('@/dictionaries/th.json').then(module => module.default),
  tr: () => import('@/dictionaries/tr.json').then(module => module.default),
  vi: () => import('@/dictionaries/vi.json').then(module => module.default),
  'zh-TW': () => import('@/dictionaries/zh-TW.json').then(module => module.default),
}

export const getDictionary = async (locale: string) => {
  try {
    if (!(locale in dictionaries)) {
      console.warn(`Dictionary not found for locale: ${locale}, falling back to English`)
      return await dictionaries.en()
    }
    return await dictionaries[locale as keyof typeof dictionaries]()
  } catch (error) {
    console.error(`Failed to load dictionary for ${locale}`, error)
    return await dictionaries.en()
  }
} 