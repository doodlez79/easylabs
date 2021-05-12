import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import { Config } from 'interfaces';
import { getMode } from './mode';

interface RequiredEnvs {
  NODE_ENV?: string;
  API_INTERFACE?: string;
  API_PORT?: string;
  MOCKS_ENABLED?: string;
}

const getBoolean = (val: string, envKey: string, strict = true): boolean => {
  if (val === 'true' || val === '1' || val === 'on') {
    return true;
  }

  if (val === 'false' || val === '0' || val === 'off') {
    return false;
  }

  if (strict) {
    throw new Error(`Can't read boolean from ${envKey}`);
  }

  return false;
};

export const configMap: ConfigFactory<Config> = () => {
  const {
    NODE_ENV,

    LOGGER_STDOUT,

    API_INTERFACE,
    API_PORT,

    MOCKS_ENABLED,
  } = process.env;

  const requiredEnvVar: RequiredEnvs = {
    NODE_ENV,
    API_INTERFACE,
    API_PORT,
    MOCKS_ENABLED,
  };

  const errors = Object.entries(requiredEnvVar).reduce((acc, [key, value]) => {
    if (typeof value === 'undefined') {
      return [...acc, key];
    }

    return acc;
  }, [] as string[]);

  if (errors.length) {
    throw new Error(`Missing or bad required env variables: ${errors.join(', ')}`);
  }

  const config: Config = {
    mode: getMode(NODE_ENV),

    logger: {
      stdout: getBoolean(LOGGER_STDOUT || '', 'LOGGER_STDOUT', false),
    },

    api: {
      interface: API_INTERFACE || '0.0.0.0',
      port: parseInt(API_PORT || '', 10) || 3000,
    },

    mocksEnabled: getBoolean(MOCKS_ENABLED || '', 'MOCKS_ENABLED', false),
  };

  return config;
};
