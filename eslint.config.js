import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"], // Archivos TypeScript y React
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Habilitar JSX
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      eqeqeq: ["error", "always"],
      "no-empty-function": "error",
      "no-implicit-coercion": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-duplicate-enum-values": "warn",
      "prettier/prettier": "error", // Activa reglas de Prettier
      "react/react-in-jsx-scope": "off", // Desactiva en proyectos con React 17+
      "react/prop-types": "off", // Desactiva para TypeScript
      "react/jsx-uses-react": "off", // Desactiva en React 17+
      "react/jsx-uses-vars": "warn", // Previene variables no utilizadas en JSX
      "react-hooks/rules-of-hooks": "error", // Asegura que los Hooks se usen correctamente
      "react-hooks/exhaustive-deps": "warn", // Verifica las dependencias de useEffect
    },
    settings: {
      react: {
        version: "detect", // Detecta automáticamente la versión de React
      },
    },
  },
];
