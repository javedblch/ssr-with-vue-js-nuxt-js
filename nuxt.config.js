export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Server-Side Rendering with Vue.js and Nuxt.js',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  serverMiddleware: [
    // Register the /api/products route
    { path: '/api/products', handler: '~/api/products.js' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js' } // Include Axios plugin
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Nuxt.js modules
  modules: [
    // Axios module
    '@nuxtjs/axios',
  ],

  // Axios module configuration
  axios: {
    // API endpoint
    baseURL: 'http://localhost:3000' // Assuming API server is running locally
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
 build: {
    transpile: [({ isLegacy }) => isLegacy && 'axios']
  }
}
