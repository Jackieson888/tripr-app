import { createVuetify } from 'vuetify'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'tripr',
    themes: {
      tripr: {
        dark: false,
        colors: {
          background: '#424d29',
          surface: '#e7e8bf',
          primary: '#d7be62',
          secondary: '#6a7340',
          accent: '#1d1f13',
          info: '#c3b07a',
          success: '#8bbd4d',
          warning: '#e1cd7b',
          error: '#b46f50'
        }
      }
    }
  }
})
