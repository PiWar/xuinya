import React, { memo, useRef, useState } from 'react';
import { formatMention } from '../../helpers';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import EmailEditor from '../EmailEditor';

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Email = ({ owner, comment }) => {
  const jsx = (
    <>
      <div className="email__title">
        <div className="email__title_avatar">
          <img
            src={`http://tracking.cbgr.ru` + comment.OwnerAvatar}
            alt="avatar"
          />
        </div>
        <div className="email__title_text">
          {comment.OwnerName}, {comment.AddingTime}
        </div>
      </div>
      <div
        className="email__body"
        dangerouslySetInnerHTML={{
          __html: formatMention(comment.HTML),
        }}
      ></div>
    </>
  );
  if (!owner) {
    return <div className="email stranger">{jsx}</div>;
  }
  const [editable, setEditable] = useState(false);
  const menuRef = useRef(null);
  const { openContextMenu, closeContextMenu } = useContextMenu(menuRef);
  useOutsideClick(menuRef, closeContextMenu);

  if (!editable) {
    return (
      <div className="email his">
        <div className="email__context-menu" ref={menuRef}>
          <div className="menu-item" onClick={() => setEditable(true)}>
            Редактировать
          </div>
          <hr />
          <div className="menu-item">Удалить</div>
        </div>
        <div className="email__title">
          <div className="email__title_avatar">
            <img
              src={`http://tracking.cbgr.ru` + comment.OwnerAvatar}
              alt="avatar"
            />
          </div>
          <div className="email__title_text">
            {comment.OwnerName}, {comment.AddingTime}
          </div>
        </div>
        <div
          className="email__body"
          onContextMenu={openContextMenu}
          dangerouslySetInnerHTML={{
            __html: formatMention(comment.HTML),
          }}
        ></div>
      </div>
    );
  }
  return <EmailEditor id={'editable'} />;
};

export default memo(Email);
