module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': [
      'warn',
      {
        ignoreRestArgs: true,
        // Allow 'any' in test files
        ignorePatterns: ['**/*.test.ts', '**/*.test.tsx', '**/test/**/*']
      }
    ],
    // Allow require imports in test files
    '@typescript-eslint/no-require-imports': [
      'error',
      {
        allow: ['**/*.test.ts', '**/*.test.tsx', '**/test/**/*']
      }
    ],
    // Allow var in .d.ts files
    'no-var': ['error', { 'ignorePattern': '\\.d\\.ts$' }]
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}