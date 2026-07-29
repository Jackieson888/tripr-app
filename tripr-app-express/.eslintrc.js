module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: 'standard',
  rules: {
    'no-unused-vars': ['error', { args: 'none' }],
    'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    'prefer-const': 'error',
    'no-var': 'error'
  }
}
