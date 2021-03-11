import React, { useCallback } from 'react';
import './CloseButton.css';
import './MemoList.css';
import './SearchedMemoList.css';

interface SearchedMemoListProps {
  memoComponents: JSX.Element[],
  onClose: () => void
}

/**
 * 검색어를 입력하지 않았을 때 보이는 전체메모뷰
 */
const SearchedMemoList = ({ memoComponents, onClose }: SearchedMemoListProps) => {
  const onClickClose = useCallback(() => {
    onClose();
  }, [onClose]);
  return (
    <React.Fragment>
      <h2 className='no-wrap'>검색결과</h2>
      <input type='button' value='×' id='cancel-search' className='close-button' onClick={onClickClose} /><br />
      <div className='memos-container'>
        {memoComponents}
      </div>
    </React.Fragment>
  )
};

export default SearchedMemoList;