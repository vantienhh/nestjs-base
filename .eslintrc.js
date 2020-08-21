module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: 'tsconfig.build.json',
  //   sourceType: 'module',
  // },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': [1]
  }
}
