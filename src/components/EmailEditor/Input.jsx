import React, { memo, useEffect, useMemo } from 'react';
import AttachmentsViewer from '../AttachmentsViewer';
import InputToolbar from './InputToolbar';
import { useQuill } from '../../hooks/useQuill';
import { subscribe, unsubscribe } from '../../helpers/events';

// eslint-disable-next-line react/prop-types
const Input = ({ id }) => {
  const { openMentionMenu, focusEditor, clearEditor, quill } = useQuill(
    'editor' + id,
    'toolbar' + id,
    'Задать вопрос, или опубликовать новую информацию...'
  );

  useEffect(() => {
    if (quill.root) {
      subscribe('clearEmailEditor' + id, clearEditor);
      return () => {
        unsubscribe('clearEmailEditor' + id, clearEditor);
      };
    }
  }, [quill]);

  const toolbarProps = useMemo(
    () => ({
      openMentionMenu,
      focusEditor,
      id,
    }),
    [openMentionMenu, focusEditor]
  );
  return (
    <div className="text-editor__input">
      <div id={'editor' + id}></div>
      <AttachmentsViewer />
      <InputToolbar {...toolbarProps} />
    </div>
  );
};

export default memo(Input);
