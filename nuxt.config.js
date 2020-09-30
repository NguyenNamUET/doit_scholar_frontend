import webpack from 'webpack'

export default {
  server: {
    port: 3400,
    host: '0.0.0.0'
  },
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    script: [
      {
        src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js'
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    {src: '~/assets/main.scss', lang: 'sass'}
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/jsonld',
    '~/plugins/vue-scrollto.js',
    {src: '~/plugins/vue_number_animation.js', ssr: false},
    {src: '~/plugins/vue-chartjs.js', mode: 'client'},
    {src: '~/plugins/vuetimeline.js' },
    {src: '~/plugins/vue-infinite-scroll.js', ssr: false},
    {src: '~/plugins/vue-pdf.js', mode: 'client'},
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/moment'
  ],
  moment: {
    locales: ['vi'],
    defaultTimezone: 'Asia/Ha_Noi'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-fontawesome',
    'nuxt-buefy',
    ['nuxt-lazy-load', {
      images: false,
      videos: true,
      audios: true,
      iframes: true,
      native: false,
      polyfill: true,
      directiveOnly: true,
    }]
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: false
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash'
      })
    ]
  }
}
