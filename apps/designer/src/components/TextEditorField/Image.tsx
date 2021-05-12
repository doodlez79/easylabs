import React, { FC } from 'react';

import { ContentState } from 'draft-js';

interface ImageProps {
  contentState: ContentState;
  entityKey: string;
}

export const Image: FC<ImageProps> = ({ contentState, entityKey }) => {
  const { height, src, width } = contentState.getEntity(entityKey).getData();

  return <img src={src} height={height} width={width} alt="Rich Editor" />;
};
