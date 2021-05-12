const propertiesOrder = require('./tools/stylelint-properties-order');

module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: [
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
    'stylelint-prettier',
    'stylelint-use-nesting',
  ],
  rules: {
    'max-empty-lines': 1,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-same-name-blockless'],
        ignore: ['after-comment'],
      },
    ],
    'no-descending-specificity': [
      true,
      {
        severity: 'warning',
      },
    ],
    'declaration-empty-line-before': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'plugin/no-low-performance-animation-properties': [
      true,
      {
        severity: 'warning',
      },
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
        ignore: ['flexbox', 'user-select-none', 'pointer'],
      },
    ],
    'csstools/use-nesting': 'always',
    'order/properties-order': propertiesOrder,
    'prettier/prettier': true,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['/global/', '/local/'] }],
    'unit-no-unknown': [true, { ignoreFunctions: ['image-set'] }],
  },
  ignoreFiles: ['./**/dist/**/*', './**/build/**/*', './**/temp/**/*'],
};
