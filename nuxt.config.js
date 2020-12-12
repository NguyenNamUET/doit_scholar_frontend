import webpack from 'webpack'
import {i18n} from "./config/i18n";

export default {
  server: {
    port: 3400,
    host: '0'
  },
  ssr: true,
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
    title: 'Compasify - Your trusty academic search engine',
    script: [
      {
        // src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.js'
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Compasify - A search engine for scientific literature' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/compasify.ico' },
      { rel: 'alternate', hreflang: 'x-default', href: '/'},
      { rel: 'canonical', href: '/'}
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    {src: '~/assets/general_styling.scss', lang: 'sass'}
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
    '~/plugins/vue_clipboard.js',
    { src: '~plugins/ga.js', mode: 'client' }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: false,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    [
      'nuxt-i18n', i18n
    ],
    '@nuxtjs/google-analytics',
  ],
  googleAnalytics: {
    id: 'G-1KFEFC05EJ'
  },
  'google-adsense': {
    id: 'ca-pub-7379513138624386'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-fontawesome',
    'nuxt-buefy',
    ['@nuxtjs/google-adsense']
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
    html:{
      minify:{
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        minifyURLs: false,
        removeComments: true,
        removeEmptyElements: true,
        collapseWhitespace: false
      }
    },
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash'
      })
    ]
  }
}
