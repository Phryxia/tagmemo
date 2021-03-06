import React from 'react';
import './MemoList.css';

interface SearchedMemoListProps {
  memoComponents: JSX.Element[]
}

/**
 * 검색어를 입력하지 않았을 때 보이는 전체메모뷰
 */
const SearchedMemoList = ({ memoComponents }: SearchedMemoListProps) => {
  return (
    <React.Fragment>
      <h2>검색결과</h2>
      <div className='memos-container'>
        {memoComponents}
      </div>
    </React.Fragment>
  )
};

export default SearchedMemoList;