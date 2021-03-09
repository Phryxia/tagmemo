import React, { useCallback } from 'react';
import Memo from './Memo';
import MemoAddButton from './MemoAddButton';
import store from './redux-store';
import './MemoList.css';

interface GeneralMemoListProps {
  memoComponents: JSX.Element[]
}

/**
 * 검색어를 입력하지 않았을 때 보이는 전체메모뷰
 */
const GeneralMemoList = ({ memoComponents }: GeneralMemoListProps) => {
  const onClickAddButton = useCallback(() => {
    store.dispatch({
      type: 'memo/add',
      payload: {
        content: '내용을 입력하세요...',
        tags: [],
        modifiedAt: new Date()
      }
    });
  }, []);

  return (
    <div className='memos-container'>
      <MemoAddButton onClickAdd={onClickAddButton} />
      {memoComponents}
    </div>
  )
};

export default GeneralMemoList;