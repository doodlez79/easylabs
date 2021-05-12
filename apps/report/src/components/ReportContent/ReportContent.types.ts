import { EasyLabsGroup } from '@easy-labs-int/shared';
import { ResultsConfig } from 'types/ResultsConfigType';

export interface ReportContentProps {
  data: ResultsConfig[];
  groups: EasyLabsGroup[];
}
