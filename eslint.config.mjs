import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["node_modules/", "dist/", "build/"],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-misused-promises": "off",
      
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);