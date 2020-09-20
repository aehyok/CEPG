import React from 'react';

type BaseProps = {
  className: string;
  style?: React.CSSProperties;
};
const ContextMenu = React.forwardRef<HTMLUListElement, BaseProps>(
  (props, ref) => (
    <ul {...props} ref={ref}>
      <li>复制</li>
      <li>删除</li>
    </ul>
  ),
);

export default ContextMenu;
