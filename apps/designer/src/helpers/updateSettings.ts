import { EasyLabsConfig } from '@easy-labs-int/shared';

export const updateSettings = (data: EasyLabsConfig): Promise<Response> => {
  return fetch('/api/settings/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
