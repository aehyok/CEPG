import React, { useRef, useEffect } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Input } from 'antd';
import styles from './DocumentList.less';
import { ClickHandler } from './DocumentList';
import { PageDataItem } from '@/types';

type DocumentListItemProps = PageDataItem & {
  active: boolean;
  editable: boolean;
  onClick: ClickHandler;
  contextId: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const DocumentListItem = (props: DocumentListItemProps) => {
  const { name, cId, contextId, active, onClick, editable, onBlur } = props;
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, [editable]);

  return (
    <>
      <ContextMenuTrigger
        id={contextId}
        holdToDisplay={1000}
        collect={props => ({ cId })}
      >
        {editable ? (
          <Input
            ref={inputRef}
            size="small"
            type="text"
            defaultValue={name}
            onBlur={onBlur}
          />
        ) : (
          <li
            className={`${styles['doc-list-item']} ${
              active ? styles.active : ''
            }`}
            onClick={e => onClick(e, { cId })}
          >
            {name}
          </li>
        )}
      </ContextMenuTrigger>
    </>
  );
};

export default DocumentListItem;
