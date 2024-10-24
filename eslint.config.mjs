import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      quotes: ["error", "double"], // Define que as aspas devem ser simples
      // "no-unused-vars": "off", // Desativa a regra de variáveis não utilizadas
      "@typescript-eslint/no-unused-vars": "off", // Desativa a regra de variáveis não utilizadas (para TS)
      "no-useless-constructor": "off",
      "@typescript-eslint/no-explicit-any": "false"
    },
  },
];