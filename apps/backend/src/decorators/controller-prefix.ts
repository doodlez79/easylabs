export const ControllerPrefix = (prefix: string): ClassDecorator => (target): void => {
  const path = Reflect.getMetadata('path', target);
  const newPath = `${prefix}/${path}`.replace(/\/+/g, '/');

  Reflect.defineMetadata('path', newPath, target);
};
