import * as yup from 'yup';
import { setIn } from 'final-form';

export const validate = <T extends any>(schema: yup.ObjectSchema) => {
  return async (values: T) => {
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (e) {
      return e.inner.reduce((errors: { [key: string]: string }, error: { path: string; message: string }) => {
        return setIn(errors, error.path, error.message);
      }, {});
    }
  };
};
