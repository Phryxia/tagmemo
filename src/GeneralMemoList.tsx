import React, { useCallback } from 'react';
import Memo from './Memo';
import MemoAddButton from './MemoAddButton';
import store from './redux-store';
import './MemoList.css';

interface GeneralMemoListProps {
  // 표시할 메모 프리뷰 버튼들
  memoComponents: JSX.Element[],

  // 새 메모가 추가되었을 때 실행할 콜백
  onMemoAdd: (memo: Memo) => void
}

/**
 * 검색어를 입력하지 않았을 때 보이는 전체메모뷰
 */
const GeneralMemoList = ({ memoComponents, onMemoAdd }: GeneralMemoListProps) => {
  // 메모 추가 버튼을 눌렀을 때 실행
  const onClickAddButton = useCallback(() => {
    store.dispatch({
      type: 'memo/add',
      payload: {
        content: '',
        tags: [],
        modifiedAt: new Date()
      }
    });
    onMemoAdd(store.getState().lastCreatedMemo as Memo);
  }, [onMemoAdd]);

  return (
    <div className='memos-container'>
      <MemoAddButton onClickAdd={onClickAddButton} />
      {memoComponents}
    </div>
  )
};

export default GeneralMemoList;