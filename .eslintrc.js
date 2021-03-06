module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  rules: {
    indent: ["error", "tab"],
    eqeqeq: "error",
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "never"]
  }
};
