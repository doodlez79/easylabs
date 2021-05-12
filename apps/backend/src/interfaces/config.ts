import { Mode } from 'modules/config/mode';

export interface Config {
  logger: {
    stdout: boolean;
  };

  api: {
    interface: string;
    port: number;
  };

  mode: Mode;

  mocksEnabled: boolean;
}
