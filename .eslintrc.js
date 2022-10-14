module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  rules: {
    eqeqeq: "off",
    curly: "error",
    quotes: ["error", "double"],
    "no-mixed-spaces-and-tabs": "error",
    "no-multiple-empty-lines": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
