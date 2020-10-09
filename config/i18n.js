import en from '../locales/en.json'
import vi from '../locales/vi.json'

export const i18n = {
  strategy: 'prefix',
  locales: [
    'en',
    'vi'
  ],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
    messages: { en, vi }
  }
}
