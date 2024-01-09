# @mettle-studio/eslint-config-typescript

ESLint Configuration for all Mettle-Studio TypeScript projects.

Main configuration is based on [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) and [eslint-config-airbnb-typescript](https://github.com/iamturns/eslint-config-airbnb-typescript).

Check out [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for more information.

## Usage

### Installation

For a new TypeScript project:

```sh
pnpm add --dev eslint prettier @mettle-studio/eslint-config-typescript
```

For an existing TypeScript project that already has the `eslint` and `prettier` peer dependencies installed:

```sh
pnpm add --dev @mettle-studio/eslint-config-typescript
```

### Configuration

#### ESLint

Create a `.eslintrc.js` configuration file under your project.

##### .eslintrc.js (non-React Projects)

###### with Jest

```js
module.exports = {
  extends: ["@mettle-studio/eslint-config-typescript"],
  parserOptions: { tsconfigRootDir: __dirname },
};
```

##### .eslintrc.js (React Projects)

React version >= 18.0.0

###### with Jest

```js
module.exports = {
  extends: ["@mettle-studio/eslint-config-typescript/react"],
  parserOptions: { tsconfigRootDir: __dirname },
  settings: {
    react: {
      version: "18.2.0",
    },
  },
};
```

#### Prettier

Create a `.prettierrc.js` configuration file under your project.

```js
module.exports = require("@mettle-studio/eslint-config-typescript/prettierrc");
```

#### Scripts

Add the following scripts to your `package.json` file.

```json
{
  "scripts": {
    "lint": "eslint --fix --max-warnings 0 \"src/**/*.{js,jsx,ts,tsx}\"",
    "lint:ci": "eslint --max-warnings 0 \"src/**/*.{js,jsx,ts,tsx}\"",
    "lint:format": "prettier --write \"./**/*.{js,jsx,ts,tsx,json,yml,yaml,css,scss,md,mdx,html}\""
  }
}
```

For projects that use [husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged), add the following configuration to your `package.json` file.

Check out [husky](https://github.com/typicode/husky) for more information on how to automatically run scripts before committing or pushing.

```json
{
  "lint-staged": {
    "./**/*.{js,jsx,ts,tsx,json,yml,yaml,css,scss,md,mdx,html}": ["prettier"],
    "src/**/*.{js,jsx,ts,tsx}": ["eslint --max-warnings 0"]
  }
}
```

### Linting

#### on Local

##### Lint your code

Prettier is automatically done with the linting process.

```sh
pnpm lint
```

##### Prettier all files in the repository

```sh
pnpm lint:format
```

#### in CI Pipeline

Lint your code only without auto-fixing. Prettier rules will also be checked.

```sh
pnpm lint:ci
```

### Overriding Rules

Override rules in your `.eslintrc.js` file.

**IMPORTANT:**

Before adding any overrides, please check out the FileMatchers below, see if your source files can be reorganized to match the pre-defined file patterns.

For example, we consider files with `.spec.` or `.test.` in their names, or files in `__mocks__` and `__tests__` directories as test files.

Please use `.spec.` or `.test.` in your test file names, and put mocks in `__mocks__` and test setup and test helpers in `__tests__` directories.

#### File Matchers

Pre-defined [FileMatchers](file-matchers.js) can be used to override rules for specific files.

```js
const FileMatchers = require('@mettle-studio/eslint-config-typescript/file-matchers');

module.exports = {
  overrides: [
    {
      files: FileMatchers.TestFileMatchers,
      rules: { ... },
    },
  ],
}
```

#### Redux Toolkit Reducers (with Immer)

Check out [Linting State Mutations](https://redux-toolkit.js.org/usage/immer-reducers#linting-state-mutations)

```js
module.exports = {
  overrides: [
    {
      // feel free to replace with your preferred file pattern - eg. '**/*Slice.ts'
      files: ["**/*.slice.ts"],
      // avoid state param assignment
      rules: { "no-param-reassign": ["error", { props: false }] },
    },
  ],
};
```
