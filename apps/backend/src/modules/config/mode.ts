export enum Mode {
  DEVELOPMENT = 2,
  TEST = 1,
  PRODUCTION = 0,
}

export const getMode = (mode?: string): Mode => {
  switch (mode) {
    case 'development':
      return Mode.DEVELOPMENT;
    case 'testing':
      return Mode.TEST;
    case 'production':
      return Mode.PRODUCTION;
    default:
      return Mode.DEVELOPMENT;
  }
};
