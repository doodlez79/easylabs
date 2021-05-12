import React, { FC } from 'react';

import MaskedInput from 'react-text-mask';

import { TextMaskCustomProps } from './TextMaskCustom.types';

const TextMaskCustom: FC<TextMaskCustomProps> = ({ inputRef, mask, ...other }) => {
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        if (inputRef) {
          inputRef(ref ? ref.inputElement : null);
        }
      }}
      mask={mask}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

export default TextMaskCustom;
