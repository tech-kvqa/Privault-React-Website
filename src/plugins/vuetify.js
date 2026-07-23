// // Styles
// import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/styles'
// import { aliases, mdi } from 'vuetify/iconsets/mdi'

// // Vuetify
// import { createVuetify } from 'vuetify'

// export default createVuetify({
//   // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
//   theme: {
//     defaultTheme: 'dark',
//     themes: {
//       dark: {
//         dark: true,
//         colors: {
//           primary: '#e3f0ff',
//           background: '#1f3557',
//           surface: '#1e1e1e',
//           secondary: '#03dac6',
//           error: '#cf6679',
//         },
//       },
//     },
//   },
//   icons: {
//     defaultSet: 'mdi',
//     aliases,
//     sets: {
//       mdi,
//     },
//   }
// })


// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'customLight',
    themes: {
      customLight: {
        dark: false,
        colors: {
          primary: '#e3f0ff',
          background: '#e6ecf5', // light greyish blue
          surface: '#ffffff',
          navbar: '#1f3557',
          secondary: '#607d8b',
          error: '#f44336',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  defaults: {
    global: {
      style: {
        fontFamily: `'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, sans-serif, Inter`,
      },
    },
  }
})
