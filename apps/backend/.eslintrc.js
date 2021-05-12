module.exports = {
  parserOptions: {
    // ссылка на tsconfig.json проекта
    // включает правила, требующие информации о типах
    project: './tsconfig.json',
  },
  extends: ['../../.eslintrc.js'],
  rules: {
    // Отключено для использование DI NestJs
    '@typescript-eslint/no-parameter-properties': 'off',
    // Отключено для использование DI NestJs
    'no-empty-function': 'off',
  },
};
