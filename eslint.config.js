// @ts-check

// Allows us to bring in the recommended core rules from eslint itself
import eslint from '@eslint/js';

// Allows us to use the typed utility for our config, and to bring in the recommended rules for TypeScript projects from typescript-eslint
import tseslint from 'typescript-eslint';

// Allows us to bring in the recommended rules for Angular projects from angular-eslint
import angular from 'angular-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

// Export our config array, which is composed together thanks to the typed utility function from typescript-eslint
export default [
  ...tseslint.config(
    {
      // Everything in this config object targets our TypeScript files (Components, Directives, Pipes etc)
      files: ['**/*.ts'],
      extends: [
        // Apply the recommended core rules
        eslint.configs.recommended,
        // Apply the recommended TypeScript rules
        ...tseslint.configs.recommended,
        // Optionally apply stylistic rules from typescript-eslint that improve code consistency
        ...tseslint.configs.stylistic,
        // Apply the recommended Angular rules
        ...angular.configs.tsRecommended
      ],
      // Set the custom processor which will allow us to have our inline Component templates extracted
      // and treated as if they are HTML files (and therefore have the .html config below applied to them)
      processor: angular.processInlineTemplates,
      // Override specific rules for TypeScript files (these will take priority over the extended configs above)
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'dn',
            style: 'camelCase'
          }
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'dn',
            style: 'kebab-case'
          }
        ],
        '@angular-eslint/no-host-metadata-property': 'off',
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'generic',
            readonly: 'generic'
          }
        ],
        '@typescript-eslint/no-deprecated': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-fallthrough': 'error',
        'no-restricted-syntax': [
          'error',
          {
            selector: "CallExpression[callee.name='fdescribe']",
            message: 'do not use fdescribe'
          },
          {
            selector: "CallExpression[callee.name='fit']",
            message: 'do not use fit'
          }
        ]
      }
    },
    {
      // Everything in this config object targets our HTML files (external templates,
      // and inline templates as long as we have the `processor` set on our TypeScript config above)
      files: ['**/*.html'],
      extends: [
        // Apply the recommended Angular template rules
        ...angular.configs.templateRecommended
        // Apply the Angular template rules which focus on accessibility of our apps
        // ...angular.configs.templateAccessibility,
      ],
      rules: {
        '@angular-eslint/template/eqeqeq': [
          'error',
          {
            allowNullOrUndefined: true
          }
        ]
      }
    }
  ),
  eslintPluginPrettierRecommended,
  // set the parse options for typed rules
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
];
