import React, { memo } from 'react';

// eslint-disable-next-line react/prop-types
const ToolbarButton = ({ className, tooltip, children, onClick }) => {
  tooltip = tooltip ? <p>{tooltip}</p> : null;
  if (typeof children === 'string' || !children) {
    children = (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <div className="text-editor__toolbar-button">
      {children}
      {tooltip}
    </div>
  );
};

export default memo(ToolbarButton);
