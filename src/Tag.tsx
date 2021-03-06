import React from 'react';
import './Tag.css';

interface TagProps {
  tag: string
};

/**
 * 메모 에디터의 태그 컴포넌트를 담당한다.
 */
const Tag = React.memo(({ tag }: TagProps) => {
  return (
    <div className='tag'>
      {tag}
      <input type='button' value='×' />
    </div>
  );
});

export default Tag;