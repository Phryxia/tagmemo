import React from 'react';
import Memo from './Memo';
import MemoAddButton from './MemoAddButton';
import MemoPreview from './MemoPreview';
import './MemoList.css';

interface GeneralMemoListProps {
  memoComponents: JSX.Element[]
}

/**
 * 검색어를 입력하지 않았을 때 보이는 전체메모뷰
 */
const GeneralMemoList = ({ memoComponents }: GeneralMemoListProps) => {
  return (
    <div className='memos-container'>
      <MemoAddButton />
      {memoComponents}
    </div>
  )
};

export default GeneralMemoList;