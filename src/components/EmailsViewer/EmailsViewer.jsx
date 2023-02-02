import React, { memo } from 'react';
import { useCommentStore } from '../../store/useCommentStore';
import Email from './Email';

const EmailsViewer = () => {
  const comments = useCommentStore(state => state.comments);
  const userId = useCommentStore(state => state.userId);

  return (
    <div className="emails-viewer">
      {comments.map(comment => (
        <Email
          comment={comment}
          key={comment.CommentID}
          owner={comment.OwnerID == userId}
        />
      ))}
    </div>
  );
};

export default memo(EmailsViewer);
