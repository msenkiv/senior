// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['eslint.config.mjs'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/naming-convention': ['error',
        {
          'selector': 'variable',
          'format': ['camelCase', 'UPPER_CASE']
        },
        {
          'selector': 'parameter',
          'format': ['camelCase'],
          'leadingUnderscore': 'allow'
        },
        {
          'selector': 'enumMember',
          'format': ['UPPER_CASE']
        },
        {
          'selector': 'typeLike',
          'format': ['PascalCase']
        },
        {
          "selector": "import",
          "format": ["camelCase", "PascalCase"],
        },
        {
          "selector": "class",
          "format": ["PascalCase"]
        },
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "custom": {
            "regex": "^I[A-Z][a-zA-Z]+$",
            "match": true
          }
        },
        {
          "selector": "typeAlias",
          "format": ["PascalCase"],
          "custom": {
            "regex": "^T[A-Z][a-zA-Z]+$",
            "match": true
          }
        },
        {
          'selector': 'default',
          'format': ['camelCase']
        }
      ],
      // Nota: Regra base desabilitada, pois ela pode relatar erros incorretos
      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': ['error',
        {
          'prefer': 'type-imports',
          'fixStyle': 'inline-type-imports',
        }
      ],
      // Nota: Regra base desabilitada, pois ela pode relatar erros incorretos
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/no-array-delete': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      // Nota: Regra base desabilitada, pois ela pode relatar erros incorretos
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      // Note: you must disable the base rule as it can report incorrect errors
      'prefer-destructuring': 'off',
      '@typescript-eslint/prefer-destructuring': 'error',
      // Regras base
      'prefer-const': 'error',
      'brace-style': ['error', '1tbs'],
      'one-var': ['error', 'never'],
      'eqeqeq': ['error', 'always'],
      'no-unneeded-ternary': 'error',
      'no-else-return': 'error',
      'no-inline-comments': 'error',
      'capitalized-comments': 'error',
      'no-duplicate-imports': 'error',
      'no-console': 'error',
      'sort-imports': ['error',
        {
          'ignoreCase': true,
          'ignoreDeclarationSort': true,
          'ignoreMemberSort': false,
          'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
          'allowSeparatedGroups': false,
        }
      ],
    },
    ignores: ['**/types/*.d.ts'],
  },
);
