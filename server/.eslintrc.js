module.exports = {
    env: {
        browser: true,
        es2021: true,
        amd: true,
        node: true,
    },
    extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    rules: {
        "no-duplicate-imports": "error",
        eqeqeq: "error",
        "no-else-return": "error",
        "no-var": "error",
        "prefer-const": "error",
        "require-await": "error",
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: "latest",
    },

    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
};
