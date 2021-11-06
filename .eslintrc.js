module.exports = {
  root: true,
  extends: ['handlebarlabs', 'plugin:prettier/recommended'],
  rules: {
    'import/extensions': ['error', 'never'],
    'no-use-before-define': 0,
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/style-prop-object': 0,
  },
  globals: {
    __DEV__: 'readonly',
  },
  plugins: [],
};
