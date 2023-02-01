import React, { useCallback, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill-mention';
import 'quill-mention/dist/quill.mention.css';

export const useQuill = (quillId, toolbarId, placeholder) => {
  const [quill, setQuill] = useState({});
  useEffect(() => {
    setQuill(
      new Quill('#' + quillId, {
        theme: 'snow',
        modules: {
          toolbar: '#' + toolbarId,
          mention: {
            allowedChars: /^[A-Za-z А-яа-я\sÅÄÖåäö]*$/,
            mentionDenotationChars: ['@'],
            positioningStrategy: '',
            source: function (searchTerm, renderList, mentionChar) {
              let values;

              if (mentionChar === '@') {
                values = [
                  { value: 'ivan' },
                  { value: 'navi' },
                  { value: 'alex' },
                ];
              }

              if (searchTerm.length === 0) {
                renderList(values, searchTerm);
              } else {
                const matches = [];
                for (let i = 0; i < values.length; i++)
                  if (
                    ~values[i].value
                      .toLowerCase()
                      .indexOf(searchTerm.toLowerCase())
                  )
                    matches.push(values[i]);
                renderList(matches, searchTerm);
              }
            },
          },
        },
        placeholder: placeholder,
      })
    );
  }, []);

  const openMentionMenu = useCallback(() => {
    const selection = quill.getSelection(true);
    quill.insertText(selection, '@');
    quill.blur();
    quill.focus();
  }, [quill]);

  const focusEditor = useCallback(() => {
    quill.focus();
  }, [quill]);

  return { quill, openMentionMenu, focusEditor };
};
