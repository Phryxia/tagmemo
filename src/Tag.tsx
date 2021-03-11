import React, { useCallback } from 'react';
import './Tag.css';
import './CloseButton.css';

interface TagProps {
  tag: string,
  onClickClose: (tag: string) => void
};

/**
 * 메모 에디터의 태그 컴포넌트를 담당한다.
 */
const Tag = React.memo(({ tag, onClickClose }: TagProps) => {
  // 닫기 버튼 눌렀을 때 호출
  const onClickCloseButton = useCallback((event) => {
    onClickClose(tag);
  }, [tag, onClickClose]);

  return (
    <div className='tag'>
      {tag}
      <input type='button' value='×' onClick={onClickCloseButton} className='close-button' />
    </div>
  );
});

export default Tag;