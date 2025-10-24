module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["@nuxtjs", "plugin:vue/vue3-recommended", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 13,
        sourceType: "module"
    },
    plugins: ["prettier", "@typescript-eslint"],
    rules: {
        "no-undef": "off",
        "prettier/prettier": ["error", { endOfLine: "auto" }],
        // 如果组件名称为 index，ESLint 就会忽略此次组件名称的检查
        "vue/multi-word-component-names": [
            "warn",
            {
                // 指定需要忽略的组件名称
                ignores: ["index"]
            }
        ]
    }
};
