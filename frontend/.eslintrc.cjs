module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "prettier",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', "prettier"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "react/no-unused-prop-types": "off",
    "eslintreact/require-default-props": "off",
    "react/destructuring-assignment": "off",
    "react/require-default-props": "off",
    "import/prefer-default-export": "off",
    "prettier/prettier": ["warn", {
      "endOfLine": "auto"
    }]
  },
}
