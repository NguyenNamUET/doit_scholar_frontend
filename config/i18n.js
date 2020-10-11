import en from '../locales/en.json'
import vi from '../locales/vi.json'

export const i18n = {
  strategy: 'prefix',
  locales: [
    {
      code: 'en',
      file: 'en.json',
      name: 'English',
    },
    {
      code: 'vi',
      file: 'vi.json',
      name: 'Vietnamese'
    }
  ],
  defaultLocale: 'en',
  lazy: true,
  langDir: 'locales/',
  vueI18n: {
    fallbackLocale: 'en',
    messages: { en, vi }
  }
}
