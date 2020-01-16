module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'semi': ['warn', 'never']
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  globals: {
    api: 'readonly',
    'window.api': 'readonly',
    apiready: true,
    'window.apiready': true
  }
};
