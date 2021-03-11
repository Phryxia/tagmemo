import React from 'react';
import './MemoAddButton.css';

interface MemoAddButtonProps {
  onClickAdd: () => void
}

/**
 * 메인에서 메모 미리보기 버튼들을 담당하는 컴포넌트
 */
const MemoAddButton = React.memo(({ onClickAdd }: MemoAddButtonProps) => {
  return (
    <input type='button' className='memo-add-button' value='+' onClick={onClickAdd} />
  );
});

export default MemoAddButton;