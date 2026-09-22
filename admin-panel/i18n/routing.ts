import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['zh', 'en'], // [signet] was ['en', 'fr']
  defaultLocale: 'zh', // [signet] was 'en'
  localeDetection: false,
  localeCookie: false,
})
