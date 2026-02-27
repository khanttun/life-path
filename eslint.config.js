export default [
  {
    ignores: ['.next', 'node_modules', 'dist', 'build'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
]
