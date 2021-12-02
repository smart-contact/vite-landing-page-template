module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  globals: {
    LIVELANDING_CDN_CSS_BASE_URL: true,
    LIVELANDING_CDN_JS_BASE_URL: true,
    LIVELANDING_CDN_IMAGES_BASE_URL: true,
    LIVELANDING_CDN_FILES_BASE_URL: true,
  },
};
