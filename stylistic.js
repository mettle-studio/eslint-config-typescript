module.exports = {
  '@stylistic/spaced-comment': ['warn', 'always'],
  '@stylistic/lines-around-comment': [
    'warn',
    {
      beforeBlockComment: true,
      afterBlockComment: false,
      beforeLineComment: true,
      afterLineComment: false,
      allowBlockStart: true,
      allowBlockEnd: false,
      allowObjectStart: true,
      allowObjectEnd: false,
      allowArrayStart: true,
      allowArrayEnd: false,
      allowClassStart: true,
      allowClassEnd: false,
      applyDefaultIgnorePatterns: true,
    },
  ],
  '@stylistic/no-multiple-empty-lines': ['warn', { max: 2 }],
  // I expect us to keep adding to this rule as we find more cases where we want to enforce
  // We should reach a point where we wll never have whitespace related comments in our PRs
  // https://eslint.style/rules/default/padding-line-between-statements
  '@stylistic/padding-line-between-statements': [
    'error',
    // empty line before return statements
    { blankLine: 'always', prev: '*', next: 'return' },
    // empty line after variable declarations
    { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
    { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
    // empty line after directives
    { blankLine: 'always', prev: 'directive', next: '*' },
    { blankLine: 'any', prev: 'directive', next: 'directive' },
  ],
};
