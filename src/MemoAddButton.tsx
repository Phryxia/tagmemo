import React, { useCallback } from 'react';
import './MemoAddButton.css';

/**
 * 메인에서 메모 미리보기 버튼들을 담당하는 컴포넌트
 */
const MemoAddButton = React.memo(() => {
  return (
    <input type='button' className='memo-add-button' value='+' />
  );
});

export default MemoAddButton;