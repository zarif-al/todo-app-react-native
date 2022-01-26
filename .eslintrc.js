module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  /*   parserOptions: {
    project: './tsconfig.json',
  }, */
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['src/utils/types/schema.ts'],
  rules: {
    ignoreFunctionTypeParameterNameValueShadow: 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-duplicate-imports': 'error',
    'no-console': 'error',
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
    ],
  },
  globals: {
    JSX: 'readonly',
  },
};
