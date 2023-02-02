import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useAttachmentsStore = create(
  immer(set => ({
    files: [],
    _uuid: 0,
    addFiles: files =>
      set(state => {
        if (!files.length) {
          files = [files];
        }
        for (const file of files) {
          file.id = ++state._uuid;
          state.files.push(file);
        }
      }),
    removeFile: id =>
      set(state => {
        state.files = state.files.filter(file => file.id !== id);
      }),
    clear: () =>
      set(state => {
        state.files = [];
      }),
  }))
);
