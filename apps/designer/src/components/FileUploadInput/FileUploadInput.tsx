import React, { FC, useRef, useLayoutEffect, useState, ChangeEvent } from 'react';

import { MimeType } from 'constants/enums';

import { FileUploadInputProps, RenderControl } from './FileUploadInput.types';

import { useStyles } from './styles';

const defaultRenderControl: RenderControl = (openFileDialog) => (
  <button onClick={() => openFileDialog()}>Upload</button>
);

const FileUploadInput: FC<FileUploadInputProps> = ({
  renderControl = defaultRenderControl,
  onUpload = () => {},
  acceptedMimes,
  error = false,
  helperText,
  disabled = false,
  fileSizeLimitMap = {},
}) => {
  const classes = useStyles();
  const [domReady, setDomReady] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { current: fileInput } = fileInputRef;

  useLayoutEffect(() => {
    setDomReady(true);
  }, [setDomReady]);

  const handleReset = () => {
    if (domReady && fileInput) {
      fileInput.value = '';
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (acceptedMimes && !acceptedMimes.includes(file.type as MimeType)) {
      alert(`Incorrect file type! Accepted: ${acceptedMimes.join(', ')}`);

      const fileTypeError = new Error('Incorrect file type');
      handleReset();
      return onUpload(fileTypeError);
    }

    const fileSizeLimit = fileSizeLimitMap[file.type as MimeType];

    if (fileSizeLimit && file.size > fileSizeLimit) {
      alert(`File size exceeded! Max. - ${fileSizeLimit / 1024 ** 2} Mb`);

      const sizeError = new Error('File size exceeded');
      handleReset();
      return onUpload(sizeError);
    }

    if (file) {
      onUpload(undefined, file);
      handleReset();
    }
  };

  const openFileDialog = (domReady && fileInput && fileInput.click.bind(fileInput)) || (() => {});

  return (
    <div className={classes.container}>
      {domReady &&
        renderControl(openFileDialog, {
          error,
          helperText,
          disabled,
        })}
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={acceptedMimes && acceptedMimes.join(',')}
      />
    </div>
  );
};

export default FileUploadInput;
