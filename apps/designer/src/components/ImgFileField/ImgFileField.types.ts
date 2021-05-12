import { FieldRenderProps } from 'react-final-form';
import { FileUploadInputProps } from 'components/FileUploadInput/FileUploadInput.types';

export interface FileFieldProps extends FieldRenderProps<string>, Pick<FileUploadInputProps, 'renderControl'> {}
