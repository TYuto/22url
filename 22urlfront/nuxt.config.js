const pkg = require('./package')
require('dotenv').config()
module.exports = {
  mode: 'spa',

  env: {
    CTF_SPACE_ID: 'fep0d93bujp2',
    CTF_CDA_ACCESS_TOKEN: 'faGOk-t6_A3VZguBNJJ2wpkbPDoXakKMDKWL_M7viY4',
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'to2.pw - 世界一短い短縮URL生成サービス',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/front/static/favicon.png' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
     { src: '~/plugins/font-awesome' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    ['@nuxtjs/google-analytics', {
      id: 'UA-116075455-3'
    }],
    '@nuxtjs/markdownit',
    '@nuxtjs/recaptcha',
    '@nuxtjs/dotenv',
    '@nuxtjs/proxy',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: [
    ['/auth/**', { target: 'http://python:8000', changeOrigin: false}],
    ['/api/**', { target: 'http://python:8000', changeOrigin: false}],
    [['/*', '!/_nuxt/**', '!/', '!/p/**', '!/release/**'], {target: 'http://python:8000/', changeOrigin: false}],
  ],

  markdownit: {
    preset: 'default',
    injected: true, 
    breaks: true, 
    html: true, 
    linkify: true,
    typography: true, 
    xhtmlOut: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    highlight: function (/*str, lang*/) { return ''; },
  },

   recaptcha: {
    hideBadge: false, // Hide badge element (v3)
    siteKey: process.env.RECAPTCHA_SITEKEY ,    // Site key for requests
    version: 3     // Version
  },

  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/p/404.vue')
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
