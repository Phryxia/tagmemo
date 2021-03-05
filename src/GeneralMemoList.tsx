import React from 'react';
import Memo from './Memo';
import MemoAddButton from './MemoAddButton';
import MemoPreview from './MemoPreview';
import './MemoList.css';

interface GeneralMemoListProps {
  memos: Memo[]
}

/**
 * 검색어를 입력하지 않았을 때 보이는 전체메모뷰
 */
const GeneralMemoList = ({ memos }: GeneralMemoListProps) => {
  return (
    <div className='memos-container'>
      <MemoAddButton />
      {memos && memos.map(memo => <MemoPreview key={memo.id} memo={memo} />)}
    </div>
  )
};

export default GeneralMemoList;