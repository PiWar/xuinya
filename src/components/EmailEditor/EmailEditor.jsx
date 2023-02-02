import React, { memo } from 'react';
import { publish } from '../../helpers/events';
import { useAttachmentsStore } from '../../store/useAttachmentsStore';
import Input from './Input';

// eslint-disable-next-line react/prop-types
const TextEditor = ({ title, id }) => {
  const clearAttachments = useAttachmentsStore(state => state.clear);

  const sendEmail = e => {
    e.preventDefault();
    clearAttachments();
    publish('clearEmailEditor' + id);
  };

  return (
    <div className="text-editor">
      <p className="text-editor__title">{title}</p>
      <Input id={id} />
      <button className="text-editor__send" onClick={sendEmail}>
        Отправить
      </button>
    </div>
  );
};

TextEditor.defaultProps = {
  id: '',
  title: 'Добавить комментарий',
};

export default memo(TextEditor);
