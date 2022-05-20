module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    // allow async-await
    'generator-star-spacing': 'off',
    // 'indent': ['error', 2],
    // allow debugger during development
    'no-debugger': 'warn',
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'only-multiline'],
    'no-unused-vars': 'off',
    'no-unused-components': 'off',
    'no-undef': 'warn',
    'no-param-reassign': 'warn',
    'no-alert': 'warn',
    'no-use-before-define': 'warn',
    'camelcase': 'warn',
    'no-underscore-dangle': 'warn',
    'no-restricted-syntax': 'warn',
    'global-require': 'warn',
    'no-continue': 'warn',
    'no-restricted-properties': 'warn',
    'no-shadow': 'warn',
    'prefer-destructuring': 'warn',
    'no-template-curly-in-string': 'warn',
    'class-methods-use-this': 'warn',

    // 关闭eslint缩进校验
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-trailing-spaces': 0,
    'indent': 'off',
    'no-console': 'off',
  },
  globals:{
    projectTitle: false
  }
}
