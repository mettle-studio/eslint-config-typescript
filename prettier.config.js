// Documentation for this file: https://prettier.io/docs/en/configuration.html
module.exports = {
  // We use a larger print width because Prettier's word-wrapping seems to be tuned
  // for plain JavaScript without type annotations
  printWidth: 120,

  // Use .gitattributes to manage newlines
  endOfLine: "auto",

  // Use single quotes instead of double quotes
  singleQuote: true,

  // For ES5, trailing commas cannot be used in function parameters; it is counterintuitive
  // to use them for arrays only
  trailingComma: "all",

  // Always use parentheses, so that it is easier to add more parameters or type annotations
  arrowParens: "always",
};