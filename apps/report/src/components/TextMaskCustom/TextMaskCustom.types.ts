export interface TextMaskCustomProps {
  mask: () => (string | RegExp)[];
  inputRef?: (ref: HTMLElement | null) => void;
}
