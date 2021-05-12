module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // ссылка на tsconfig.json проекта
    // включает правила, требующие информации о типах
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'react-hooks'],
  extends: [
    'eslint:recommended',
    // конфиг airbnb + react
    'airbnb',
    // рекомендованные правила typescript-eslint
    'plugin:@typescript-eslint/recommended',
    // отключает правила, конфликтующие с prettier
    'prettier',
    'prettier/@typescript-eslint',
    // рекомендованные правила по работе с промисами
    'plugin:promise/recommended',
  ],
  rules: {
    camelcase: 'off',
    'consistent-return': 'off',
    'no-irregular-whitespace': 'off',
    '@typescript-eslint/camelcase': 'off',
    // проверяет форматирование prettier при запуске eslint
    // имеет смысл включать только на CI
    // 'prettier/prettier': ['error']

    // no-useless-constructor некорректно работает для ts
    // https://github.com/typescript-eslint/typescript-eslint/issues/420#issuecomment-481414081
    'no-useless-constructor': 'off',

    // Правило не дает пользоваться преимуществами hoisting для функций
    'no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        args: 'after-used',
        varsIgnorePattern: '^_+$',
      },
    ],
    '@typescript-eslint/ban-types': [
      1,
      {
        extendDefaults: true,
      },
    ],
    '@typescript-eslint/ban-ts-comment': [1],
    '@typescript-eslint/no-empty-function': [1],

    'react/sort-comp': [1, { groups: { 'everything-else': [] } }],

    // проверка корректности зависимостей не подходит для монорепы, так как требует установки зависимостей во все
    // подпроекты
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    // почему-то без этого правила ругается на абсолютные импорты
    'import/extensions': 'off',

    'react-hooks/exhaustive-deps': [1],
    'react/prop-types': 'off',
    'react/button-has-type': 'off', // https://github.com/yannickcr/eslint-plugin-react/issues/1555
    'react/jsx-indent': [1, 2],
    'react/jsx-indent-props': [1, 2],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-one-expression-per-line': [1, { allow: 'single-child' }],
    'react/jsx-wrap-multilines': 'off', // to allow passing components as props with prettier
    'react/jsx-props-no-spreading': [1],
    'react/jsx-no-duplicate-props': [0, { ignoreCase: false }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight', 'route'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'promise/always-return': 'off',
    'promise/no-callback-in-promise': 'off', // https://github.com/xjamundx/eslint-plugin-promise/issues/124
    // This rule was deprecated in v6.1.0. It will no longer be maintained. Please use label-has-associated-control instead
    'jsx-a11y/label-has-for': 'off',
    curly: ['error', 'all'],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        // разрешает require в js-файлах
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.test.ts'],
      rules: {
        'promise/catch-or-return': 'off', // no need to catch or return from promises as test helpers
      },
    },
  ],
};
