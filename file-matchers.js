module.exports = {
  SourceFileMatchers: [
    // Source files
    "*.{js,jsx,ts,tsx}",
  ],
  TestFileMatchers: [
    // Test files
    "*.test.{js,jsx,ts,tsx}",
    "*.spec.{js,jsx,ts,tsx}",

    // Facebook convention
    "**/__mocks__/**/*.{js,jsx,ts,tsx}",
    "**/__tests__/**/*.{js,jsx,ts,tsx}",

    // Microsoft convention
    "**/test/**/*.{js,jsx,ts,tsx}",
  ],
  TypeDeclarationFileMatchers: ["*.d.ts"],
};
