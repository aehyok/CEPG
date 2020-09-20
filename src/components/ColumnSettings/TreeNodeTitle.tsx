import { message, Input } from 'antd';
import { CategoryItemType } from '@/types';
import React, { useRef, useEffect } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';

export const ColumnTitle: React.FC<CategoryItemType & {
  saveTitle: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}> = ({ saveTitle, cId, categoryName, isEdit }) => {
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [isEdit]);

  const handleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.keyCode === 13) {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      if (inputRef.current) {
        inputRef.current.blur();
      }
      message.error('名称不能为空');
      return;
    }
    saveTitle(e, cId);
  };

  const Title = (
    <ContextMenuTrigger id="column" collect={props => ({ cId })}>
      {categoryName}
    </ContextMenuTrigger>
  );
  const EditTitle = (
    <Input
      ref={inputRef}
      size="small"
      defaultValue={categoryName}
      onKeyUp={handleKeyup}
      onBlur={handleBlur}
    />
  );

  return isEdit ? EditTitle : Title;
};
