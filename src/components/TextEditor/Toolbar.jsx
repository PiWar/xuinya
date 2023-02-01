import React, { memo, useRef } from 'react';
import ToolbarButton from './ToolbarButton';
import { useAttachmentsStore } from '../../store/useAttachmentsStore';

// eslint-disable-next-line react/prop-types
const Toolbar = ({ openMentionMenu, focusEditor }) => {
  const inputRef = useRef(null);
  const addFiles = useAttachmentsStore(state => state.addFiles);
  const fileChangeHandler = e => {
    addFiles(e.target.files);
  };
  const fileClickHandler = () => {
    focusEditor();
    if (inputRef.current) {
      inputRef.current.value = null; // очищаешь value, чтобы можно было загрузить один и тот же файл более одного раза
    }
  };

  return (
    <div className="text-editor__toolbar">
      <div id="toolbar">
        <ToolbarButton className="ql-bold" tooltip="Жирный" />
        <ToolbarButton className="ql-italic" tooltip="Курсивный" />
        <ToolbarButton className="ql-underline" tooltip="Подчеркнутый" />
        <ToolbarButton className="ql-strike" tooltip="Зачеркнутый" />
        <ToolbarButton className="ql-code" tooltip="Жирный" />
        <ToolbarButton className="" tooltip="Тегнуть" onClick={openMentionMenu}>
          @
        </ToolbarButton>
        <ToolbarButton className="" tooltip="Прикрепить файл">
          <input
            ref={inputRef}
            type="file"
            name="file"
            id="file"
            onChange={fileChangeHandler}
            multiple
            style={{ display: 'none' }}
          />
          <label
            className="text-editor__file-label"
            htmlFor="file"
            onClick={fileClickHandler}
          >
            &#128206;
          </label>
        </ToolbarButton>
      </div>
    </div>
  );
};

export default memo(Toolbar);
