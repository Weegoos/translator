import { createI18n } from 'vue-i18n'
import messages from './locales/index.js'  // Убедитесь, что путь правильный

const i18n = createI18n({
  locale: 'en',  // язык по умолчанию
  fallbackLocale: 'en',  // резервный язык
  messages
})

export default i18n
