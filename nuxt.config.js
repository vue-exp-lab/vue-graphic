
module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',
  head: {
    title: 'maths artist',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' },
      // favicon --- start
      {name: 'msapplication-TileColor', content: '#da532c'},
      {name: 'theme-color', content: '#ffffff'},
      // favicon --- end
    ],
    link: [
      // favicon --- start
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      {rel:'icon', type:'image/png', sizes:'32x32', href:'/favicon-32x32.png'},
      {rel:'icon', type:'image/png', sizes:'16x16', href:'/favicon-16x16.png'},
      {rel:'manifest', href:'/site.webmanifest'},
      {rel:'mask-icon', href:'/safari-pinned-tab.svg', color:'#5bbad5'},
      // favicon --- end

      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ],
    script: [
      { src: '/locator.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.js' }
    ]
  },
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    cssSourceMap: false, // add this into the nuxt.config
    vendor: [
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      config.devtool = false
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    '~/plugins/vuetify.js',
  ],
  router: {
  }
}
