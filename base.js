const FileMatchers = require("./file-matchers");

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "standard-with-typescript",
    "plugin:prettier/recommended",
  ],
  parserOptions: { tsconfigRootDir: __dirname, project: "./tsconfig.json" },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".mjs", ".js", ".jsx", ".json", ".ts", ".tsx", ".d.ts"],
      },
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
  env: {
    es2020: true,
    browser: true,
  },
  rules: {
    "prettier/prettier": "warn",
  },
  overrides: [
    // base rules for all source files
    {
      files: FileMatchers.SourceFileMatchers,
      rules: {
        // Base
        // allow re-export `export { default } from './foo'`
        "no-restricted-exports": "off",
        // TypeScript
        "@typescript-eslint/naming-convention": [
          "warn",
          {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE", "PascalCase"],
            leadingUnderscore: "forbid",
            trailingUnderscore: "forbid",
          },
          // patch on the above 'variable' rule
          {
            selector: "variable",
            types: ["boolean"],
            format: ["PascalCase", "camelCase"],
            prefix: ["is", "should", "has", "can", "did", "will", "are"],
          },
          {
            selector: "function",
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "forbid",
            trailingUnderscore: "forbid",
          },
          {
            selector: "parameter",
            format: ["camelCase", "PascalCase"],
            // placeholder parameters at the beginning of a function
            leadingUnderscore: "allowSingleOrDouble",
            trailingUnderscore: "forbid",
          },
          {
            selector: "typeLike",
            format: ["PascalCase"],
          },
          // patch on the above 'typeLike' rule
          {
            selector: "interface",
            format: ["PascalCase"],
            custom: {
              regex: "^I[A-Z]",
              match: false,
            },
          },
          {
            selector: "memberLike",
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "forbid",
            trailingUnderscore: "forbid",
          },
          // patch on the above 'memberLike' rule
          {
            selector: "enumMember",
            format: ["PascalCase"],
            leadingUnderscore: "forbid",
            trailingUnderscore: "forbid",
          },
          // patch on the above 'memberLike' rule
          {
            // relax the keys of an object literal
            selector: ["objectLiteralProperty", "objectLiteralMethod"],
            format: null,
          },
        ],

        // Import
        // to sort css/scss imports
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "unknown",
            ],
            pathGroups: [
              {
                pattern: "*.{css,scss}",
                patternOptions: { matchBase: true },
                group: "unknown",
                position: "after",
              },
            ],
            warnOnUnassignedImports: true,
          },
        ],
      },
    },
    // adjust base rules for type def files
    {
      files: FileMatchers.TypeDeclarationFileMatchers,
      rules: {
        // dev dependencies are allowed in type def files
        "import/no-extraneous-dependencies": "off",
      },
    },
    // adjust base rules for test files
    {
      files: FileMatchers.TestFileMatchers,
      rules: {
        // easy to turn off TypeScript errors in test files
        "@typescript-eslint/ban-ts-comment": "off",
        // allow helpers in test files without return type
        "@typescript-eslint/explicit-function-return-type": "off",

        // dev dependencies are allowed in test files
        "import/no-extraneous-dependencies": "off",
      },
    },
    // set test rules for test files
    {
      files: FileMatchers.TestFileMatchers,
      // use Jest by default.
      // the Vitest config will replace this config by searching for `plugin:jest/recommended` in the extends array.
      extends: ["plugin:jest/recommended"],
    },
  ],
};
