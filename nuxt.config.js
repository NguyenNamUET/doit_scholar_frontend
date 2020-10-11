import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import {i18n} from "./config/i18n";

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
        // src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.js'
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    loading: {
      continuous: true,
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '~/plugins/vue_clipboard.js'
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
    [
      'nuxt-i18n', i18n
    ]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-fontawesome',
    'nuxt-buefy',
    'nuxt-lazy-load'
  ],
  // sentry: {
  //   dsn: 'https://b6364c5309e94d0cbb21919e281efd41@o458414.ingest.sentry.io/5455936'
  // },

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
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true
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
