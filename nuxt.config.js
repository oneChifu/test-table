export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    ssr: false,

    target: 'static',

    router: {
        base: process.env.NODE_ENV === 'production' ? '/test-table/' : '/',
        middleware: ['check-pagination'],
    },

    generate: {
        fallback: true,
    },

    head: {
        title: 'TODOS',
        htmlAttrs: {
            lang: 'uk',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com',
            },
            {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
                crossorigin: true,
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
            },
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css',
                integrity:
                    'sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==',
                crossorigin: 'anonymous',
                referrerpolicy: 'no-referrer',
            },
        ],
    },

    loading: '@/components/LoaderIndicator.vue',

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/scss/main.scss'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
        proxy: process.env.NODE_ENV === 'development',
    },

    proxy:
        process.env.NODE_ENV === 'production'
            ? {
                  '/api/': {
                      target: 'https://jsonplaceholder.typicode.com',
                      pathRewrite: { '^/api/': '' },
                  },
              }
            : {},

    env: {
        API_BASEURL: 'https://jsonplaceholder.typicode.com',
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};
