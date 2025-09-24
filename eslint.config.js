import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Temporarily allow 'any' types for initial development
      '@typescript-eslint/no-explicit-any': 'warn',
      // Allow unused vars in test files and development utilities
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true 
      }],
      // Allow require imports for configuration files
      '@typescript-eslint/no-require-imports': 'warn',
      // Relax fast refresh rules for context providers
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Allow var declarations in global type definitions
      'no-var': 'warn'
    },
  },
])
