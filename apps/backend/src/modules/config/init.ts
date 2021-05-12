import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { Logger, LoggerService } from '@nestjs/common';
import { configMap } from '.';
import { getMode, Mode } from './mode';

export const configInit = (): ConfigModuleOptions => {
  const logger: LoggerService = new Logger();
  const logVerbose = logger.verbose ? logger.verbose.bind(logger) : console.log;

  logVerbose(`NODE_ENV is ${process.env.NODE_ENV}`, 'Initialization');

  const mode = getMode(process.env.NODE_ENV);

  logVerbose(`Mode is ${Mode[mode]}`, 'Initialization');

  // can be changed from process.env if necessary
  const ignoreEnvFile = false;
  const ignoreEnvVars = false;

  const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

  if (ignoreEnvFile) {
    for (let index = 0; index < 20; index += 1) {
      logger.warn('Ignoring env file!', 'Initialization');
    }
  } else {
    logVerbose(`Using ${envFilePath} as env source`, 'Initialization');
  }

  if (ignoreEnvVars) {
    for (let index = 0; index < 20; index += 1) {
      logger.warn('Ignoring env vars!', 'Initialization');
    }
  }

  return {
    isGlobal: true,
    envFilePath,
    ignoreEnvFile,
    ignoreEnvVars,
    load: [configMap],
  };
};
