import { EasyLabsCategory } from '@easy-labs-int/shared';

export interface CategoriesProps {
  data: EasyLabsCategory[];
  testResults: {};
  handlerTestInput: (id: string, value: number, unit: string) => void;
}
