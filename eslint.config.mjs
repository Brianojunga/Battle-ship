import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        test: "readonly",
        expect: "readonly", 
        describe: "readonly", 
        beforeEach: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
];
