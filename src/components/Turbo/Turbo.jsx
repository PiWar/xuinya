import React, { memo } from 'react';
import { useCommentStore } from '../../store/useCommentStore';

const Turbo = () => {
  const comments = useCommentStore(state => state.comments);
  const changeComment = useCommentStore(state => state.changeComment);
  const addComments = useCommentStore(state => state.addComments);
  const currentUserId = useCommentStore(state => state.userId);
  const setUserId = useCommentStore(state => state.setUserId);
  console.log(comments, currentUserId);

  window.showComments = (json, currentUserId) => {
    try {
      const data = JSON.parse(json);
      if (data && data.Comments) {
        addComments(data.Comments);
      }
      if (currentUserId) {
        setUserId(currentUserId);
      }
    } catch (e) {
      console.log('Неправильный формат данных, showComments');
    }
  };
  window.addNewComment = json => {
    try {
      const data = JSON.parse(json);
      if (data) {
        addComments(data);
      }
    } catch (e) {
      console.log('Неправильный формат данных, addNewComment');
    }
  };
  window.editComment = (id, json) => {
    try {
      const data = JSON.parse(json);
      if (data && id) {
        changeComment(id, data);
      }
    } catch (e) {
      console.log('Неправильный формат данных, editComment');
    }
  };
};

export default memo(Turbo);
