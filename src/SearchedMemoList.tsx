import React from 'react';
import Memo from './Memo';
import MemoPreview from './MemoPreview';
import './MemoList.css';

interface SearchedMemoListProps {
  memos: Memo[]
}

/**
 * 검색어를 입력하지 않았을 때 보이는 전체메모뷰
 */
const SearchedMemoList = ({ memos }: SearchedMemoListProps) => {
  return (
    <React.Fragment>
      <h2>검색결과</h2>
      <div className='memos-container'>
        {memos && memos.map(memo => <MemoPreview key={memo.id} memo={memo} />)}
      </div>
    </React.Fragment>
  )
};

export default SearchedMemoList;