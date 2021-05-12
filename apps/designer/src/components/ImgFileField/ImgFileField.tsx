import React, { FC } from 'react';

import { FileUploadInput } from 'components/FileUploadInput';
import { MimeType } from 'constants/enums';

import { FileFieldProps } from './ImgFileField.types';

const ImgFileField: FC<FileFieldProps> = ({ input: { name, onChange, value, ...restInput }, renderControl }) => {
  return (
    <FileUploadInput
      {...restInput}
      acceptedMimes={[MimeType.PNG, MimeType.JPEG]}
      fileSizeLimitMap={{
        [MimeType.JPEG]: 5 * 1024 ** 2,
        [MimeType.PNG]: 5 * 1024 ** 2,
      }}
      onUpload={(error, file) => {
        if (!error && file) {
          const fileReader = new FileReader();
          fileReader.onloadend = (e) => {
            const resultBase64 = e.target?.result;

            onChange(resultBase64);
          };
          fileReader.readAsDataURL(file);
        }
      }}
      renderControl={renderControl}
    />
  );
};

export default ImgFileField;
