module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  extends: [
    'next/core-web-vitals',
    '@alien-mm-config/eslint-config/typescript',
    '@alien-mm-config/eslint-config/tailwind',
  ],
};
