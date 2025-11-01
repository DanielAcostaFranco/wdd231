import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default [
  pluginJs.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      semi: "off"
    }
  }
];
