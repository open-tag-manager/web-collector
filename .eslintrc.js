module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'standard'
  ],
  plugins: ['prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    window: true
  },
  // add your custom rules here
  rules: {
    'no-var': 'error'
  }
}
