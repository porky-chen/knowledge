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
    'indent': ['error', 2],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'only-multiline'],
    'no-tabs': 0,
    "no-mixed-spaces-and-tabs": [0],
    'no-unused-vars': 'off',
    'vue/no-unused-vars': "off",
    'vue/no-mutating-props': "warn"
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}

