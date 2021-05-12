import React, { FC, useState, useEffect, useCallback } from 'react';
import { Box, Button, TextareaAutosize, Typography } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';

import { TextEditorFieldProps } from './TextEditorField.types';
import { toHtml } from './helpers';
import { decorators } from './TextEditorField.config';

import { useStyles } from './styles';

const TextEditorField: FC<TextEditorFieldProps> = ({ input: { onChange, value }, placeholder, meta }) => {
  const [showHtmlCode, setShowHtmlCode] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const classes = useStyles();
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

  useEffect(() => {
    if (toHtml(editorState) === value) {
      return;
    }
    const blocksFromHTML = htmlToDraft(value || '');
    const { contentBlocks, entityMap } = blocksFromHTML;

    const blockArray = ContentState.createFromBlockArray(contentBlocks, entityMap);

    const state = EditorState.createWithContent(blockArray);

    setEditorState(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, setEditorState]);

  const handleEditorStateChange = useCallback(
    (es: EditorState) => {
      setEditorState(es);
      const html = toHtml(es);

      if (value !== html) {
        onChange({ target: { name: 'text', value: html } });
      }
    },
    [setEditorState, onChange, value]
  );

  return (
    <Box mb={1}>
      <Editor
        placeholder={placeholder}
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
        toolbarClassName={classes.toolbar}
        wrapperClassName={classes.wrapper}
        editorClassName={classes.editor}
        customDecorators={decorators}
      />
      {value && (
        <Button style={{ marginTop: '10px' }} onClick={() => setShowHtmlCode((s) => !s)}>
          Open/Close html code
        </Button>
      )}

      {showHtmlCode && (
        <Box border={1} mt={1} borderRadius={5} p={2}>
          <TextareaAutosize className={classes.textArea} value={value} onChange={onChange} />
        </Box>
      )}

      {showError && (
        <Typography color="error" variant="caption" gutterBottom>
          {meta.error || meta.submitError}
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(TextEditorField);
