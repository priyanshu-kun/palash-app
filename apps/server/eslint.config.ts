export default {
  env: { es2021: true, node: true },
  extends: ["eslint:recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "warn",
    "prefer-const": "error"
  }
};
