import en from '../locales/en.json'
import vi from '../locales/vi.json'

export const i18n = {
  strategy: 'prefix',
  locales: [
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'vi',
      name: 'Vietnamese'
    }
  ],
  defaultLocale: 'en',
  lazy: true,
  vueI18n: {
    fallbackLocale: 'en',
    messages: { en, vi }
  }
}
