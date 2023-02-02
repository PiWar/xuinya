import React, { memo } from 'react';
import { useAttachmentsStore } from '../../store/useAttachmentsStore';

// eslint-disable-next-line react/prop-types
const Attachment = ({ id, children }) => {
  const removeFile = useAttachmentsStore(state => state.removeFile);
  const removeAttachment = () => removeFile(id);

  return (
    <div className="attachments-viewer__attachment">
      <div className="attachment__controls controls">
        <div className="controls__remove" onClick={removeAttachment}>
          &#10006;
        </div>
      </div>
      {children}
    </div>
  );
};

export default memo(Attachment);
