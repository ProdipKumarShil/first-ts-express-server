import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from 'eslint-config-prettier'

export default [
  { 
    files: ["**/*.{js,mjs,cjs,ts}"], 
    languageOptions: { 
      globals: { 
        ...globals.node,  // Add Node.js globals
        ...globals.browser  // Add browser globals
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unused-expressions": "error",
      "@/prefer-const": "error",
      "@/no-console": "warn",
      "no-undef": "error",
    }
  }
];
