const FileMatchers = require("../file-matchers");

const makeReactConfig = (baseConfig) => {
  return {
    ...baseConfig,
    plugins: [...baseConfig.plugins, "react", "jsx-a11y"],
    extends: [
      ...baseConfig.extends,
      "plugin:react/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:react/jsx-runtime",
    ],
    overrides: [
      ...baseConfig.overrides,
      {
        files: FileMatchers.SourceFileMatchers,
        rules: {
          // React
          // we use arrow function with `FC` type for function components
          "react/function-component-definition": [
            "error",
            {
              namedComponents: "arrow-function",
              unnamedComponents: "arrow-function",
            },
          ],
          // enforce a consistent fragment pattern
          "react/jsx-no-useless-fragment": [
            "error",
            { allowExpressions: true },
          ],
          // allow spreading props from libraries
          "react/jsx-props-no-spreading": "off",
          // React PropTypes
          // we don't use PropTypes in TypeScript projects
          "react/forbid-prop-types": "off",
          "react/no-unused-prop-types": "off",
          "react/prop-types": "off",
          "react/require-default-props": "off",
        },
      },
      {
        files: FileMatchers.TestFileMatchers,
        rules: {
          // allow construct context values in tests
          "react/jsx-no-constructed-context-values": "off",
        },
      },
    ],
  };
};

module.exports = makeReactConfig;
