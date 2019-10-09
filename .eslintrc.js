module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    router: 'readonly',
    store: 'readonly',
    VueRouter: 'readonly',
    Vuex: 'readonly',
    Vue: 'readonly',
    _MICRO_APP_CONFIG: false
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
