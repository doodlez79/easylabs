import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentBlock, ContentState } from 'draft-js';

export const toHtml = (es: EditorState): string => {
  return draftToHtml(convertToRaw(es.getCurrentContent()));
};

export const findImageEntities = (contentBlock: ContentBlock, callback: () => {}, contentState: ContentState): void => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();

    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE';
  }, callback);
};
