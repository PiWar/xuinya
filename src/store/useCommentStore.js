import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useCommentStore = create(
  immer(set => ({
    comments: [],
    userId: null,
    addComments: comments =>
      set(state => {
        if (!Array.isArray(comments)) {
          comments = [comments];
        }
        state.comments.push(...comments);
      }),
    removeComment: id =>
      set(state => {
        state.comments = state.comments.filter(
          comment => comment.CommentID !== id
        );
      }),
    changeComment: (id, newData) => {
      set(state => {
        const index = state.comments.findIndex(
          comment => (comment.CommentID = id)
        );
        state.comments[index] = { ...state.comments[index], ...newData };
      });
    },
    setUserId: id =>
      set(state => {
        state.userId = id;
      }),
  }))
);
