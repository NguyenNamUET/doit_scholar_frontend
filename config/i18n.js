import en from '../locales/en.json'
import vi from '../locales/vi.json'

export const i18n = {
  locales: [
    {
      code: 'en',
      file: 'en.json',
      name: 'English',
      iso: 'en-US'
    },
    {
      code: 'vi',
      file: 'vi.json',
      name: 'Vietnamese',
      iso: 'vi-VN'
    }
  ],
  defaultLocale: 'en',
  lazy: true,
  seo: false,
  langDir: 'locales/',
  vueI18n: {
    fallbackLocale: 'en',
    silentFallbackWarn: true,
    messages: { en, vi }
  }
}
