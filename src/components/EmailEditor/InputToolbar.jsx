import React, { memo, useCallback, useRef } from 'react';
import ToolbarButton from './ToolbarButton';
import { useAttachmentsStore } from '../../store/useAttachmentsStore';

// eslint-disable-next-line react/prop-types
const InputToolbar = ({ openMentionMenu, focusEditor, id }) => {
  const inputFileRef = useRef(null);
  const addFiles = useAttachmentsStore(state => state.addFiles);
  const fileChangeHandler = useCallback(
    e => {
      addFiles(e.target.files);
    },
    [addFiles]
  );
  const fileClickHandler = useCallback(() => {
    focusEditor();
    if (inputFileRef.current) {
      inputFileRef.current.value = null; // очищаешь value, чтобы можно было загрузить один и тот же файл более одного раза
    }
  }, [inputFileRef, focusEditor]);

  return (
    <div className="text-editor__toolbar">
      <div id={'toolbar' + id}>
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
            ref={inputFileRef}
            type="file"
            name="file"
            id={'file' + id}
            onChange={fileChangeHandler}
            multiple
            style={{ display: 'none' }}
          />
          <label
            className="text-editor__file-label"
            htmlFor={'file' + id}
            onClick={fileClickHandler}
          >
            &#128206;
          </label>
        </ToolbarButton>
      </div>
    </div>
  );
};

export default memo(InputToolbar);
