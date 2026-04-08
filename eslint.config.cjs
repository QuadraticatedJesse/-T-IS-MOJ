const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        process: 'readonly',
        Buffer: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'off', // Allow console.log as used in the project
      'prefer-const': 'error',
      'no-var': 'error'
    }
  }
];