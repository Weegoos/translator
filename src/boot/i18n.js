import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from '../i18n' 

const lang = localStorage.getItem('lang')

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: lang || 'en',
    fallbackLocale: 'en',
    globalInjection: true,
    messages
  })

  if (lang) {
    i18n.global.locale.value = lang;
  }

  app.use(i18n)
})
