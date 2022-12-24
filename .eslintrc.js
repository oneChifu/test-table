module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
    },
    extends: [
        '@nuxtjs',
        '@vue/eslint-config-prettier',
        'plugin:nuxt/recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:node-dependencies/recommended',
        'plugin:jsonc/recommended-with-jsonc',
    ],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error', {}],
        'no-restricted-imports': 'off',
        'no-unused-vars': process.NODE_ENV === 'production' ? 2 : 1,
    },
};
