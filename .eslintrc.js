/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,

  ignorePatterns: ['.eslintrc.js', 'lib', 'types'],

  env: {
    browser: true,
    es2021: true
  },

  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint'],

  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },

  rules: {
    semi: ['error', 'always'],
    indent: ['error', 2],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
};
