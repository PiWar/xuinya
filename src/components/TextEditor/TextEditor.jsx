import React, { useMemo } from 'react';
import { useQuill } from '../../hooks/useQuill';
import { AttachmentsViewer } from '../AttachmentsViewer/AttachmentsViewer';
import Toolbar from './Toolbar';

export const TextEditor = () => {
  const { openMentionMenu, focusEditor } = useQuill(
    'editor',
    'toolbar',
    'Задать вопрос, или опубликовать новую информацию...'
  );

  const toolbarProps = useMemo(
    () => ({
      openMentionMenu,
      focusEditor,
    }),
    [openMentionMenu, focusEditor]
  );

  return (
    <div className="text-editor">
      <p className="text-editor__title">Добавить комментарий</p>
      <div className="text-editor__editor">
        <div id="editor"></div>
        <AttachmentsViewer />
        <Toolbar {...toolbarProps} />
      </div>
      <button className="text-editor__send">Отправить</button>
    </div>
  );
};
