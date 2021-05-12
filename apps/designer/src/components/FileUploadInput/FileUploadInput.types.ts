import { ReactNode } from 'react';

import { MimeType } from 'constants/enums';

export interface RenderControlProps {
  openFileDialog: () => void;
}

export interface RenderControlMeta {
  /** Default: false */
  error?: boolean;
  helperText?: string;
  /** Default: false */
  disabled?: boolean;
}
export type RenderControl = (openFileDialog: () => void, meta: RenderControlMeta) => ReactNode;

export type FileSizeLimitMap = { [mimeType in MimeType]?: number };

export interface FileUploadInputProps {
  /** Default: defaultRenderControl */
  renderControl?: RenderControl;
  /** Default: () => {} */
  onUpload?: (error: Error | undefined, originalFile?: File) => void;
  acceptedMimes?: MimeType[];
  /** Default: false */
  error?: boolean;
  helperText?: string;
  /** Default: false */
  disabled?: boolean;
  /** Default: {} */
  fileSizeLimitMap?: FileSizeLimitMap;
}
