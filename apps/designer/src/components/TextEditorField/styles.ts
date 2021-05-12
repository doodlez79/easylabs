import { createStyles, makeStyles, Theme } from '@material-ui/core';

const isSafari =
  // @ts-ignore
  /constructor/i.test(window.HTMLElement) ||
  ((p) => p.toString() === '[object SafariRemoteNotification]')(
    // @ts-ignore
    !window.safari || (typeof safari !== 'undefined' && safari.pushNotification)
  );
export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    textArea: {
      width: '100%',
      border: 'none',
      background: 'transparent',
      outline: 'none',
    },
    toolbar: {
      background: theme.palette.primary.light,
      fontSize: `${theme.typography.fontSize}px`,
      '& .rdw-dropdown-wrapper': {
        height: '20px',
      },
      '& .rdw-block-dropdown': {
        width: '90px',
      },
      '& .rdw-option-wrapper': {
        height: '20px',
        border: 'none',
        padding: '0px',
        minWidth: '20px',
      },
      '& .rdw-colorpicker-modal': {
        zIndex: '99999',
      },
      '& .rdw-image-modal': {
        zIndex: '99999',
      },
      '& .rdw-embedded-modal': {
        zIndex: '99999',
      },
    },
    wrapper: {
      border: '1px solid',
      borderRadius: '5px',
      fontSize: `${theme.typography.fontSize}px`,
      color: theme.palette.text.primary,
    },
    editor: {
      fontsize: 14,
      maxHeight: '200px',
      overflow: 'auto',
      padding: '5px',
      fontSize: `${theme.typography.fontSize}px`,
      color: theme.palette.text.primary,
      '& .public-DraftEditor-content': {
        outline: () => (isSafari ? 'auto transparent 100px !important' : 'none !important'),
      },
    },
  });
});
