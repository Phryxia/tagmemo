import React, { useState, useCallback } from 'react';

import Memo, { tagsArrayAreEqual } from './Memo';
import GeneralMemoList from './GeneralMemoList';
import SearchedMemoList from './SearchedMemoList';
import MemoEditor from './MemoEditor';
import MemoPreview from './MemoPreview';

import store from './redux-store';
import State from './redux-state';
import { connect } from 'react-redux';
import './App.css';

interface AppProps {
  memos: Memo[]
}

/**
 * 메모를 검색하고 결과를 출력한다.
 * 검색을 하지 않았거나 키워드가 없는 경우 일반 화면을 띄운다.
 */
const App = ({ memos }: AppProps) => {
  // 현재 검색창에 입력한 검색어들
  const [curKeywords, setCurKeywords] = useState<string[]> ([]);

  // 검색 버튼을 눌렀을 때 검색에 사용할 검색어들
  const [lastKeywords, setLastKeywords] = useState<string[]> ([]);

  // 메모 에디터에 띄울 메모. 없으면 null
  const [currentMemo, setCurrentMemo] = useState<Memo | null> (memos[0]);

  // 현재 입력된 키워드를 갱신함.
  const onSearchChange = useCallback(event => {
    const trimmed = event.target.value.trim();

    // 검색창에 아무 것도 입력돼 있지 않으면 []로 설정해야 함
    // split의 경우 아무 것도 없으면 그냥 ['']를 반환하기 때문...
    if (trimmed)
      setCurKeywords(trimmed.split(' '));
    else
      setCurKeywords([]);
  }, [curKeywords]);

  // 검색 결과로 보여질 키워드를 갱신함.
  const onSearchClick = useCallback(event => {
    setLastKeywords(curKeywords);
  }, [curKeywords]);

  // 메모 편집기 모달에서 수정 누르면 실행
  const onClickModify = useCallback((memo: Memo) => {
    store.dispatch({ type: 'memo/modify', payload: memo });
    setCurrentMemo(null);
  }, []);

  // 메모 편집기 모달에서 취소 누르면 실행
  const onClickCancel = useCallback(() => {
    setCurrentMemo(null);
  }, []);

  // 현재 보여질 메모 컴포넌트들을 설정
  // 굳이 App에서 이걸 만들어서 내려보내는 이유는
  // 이벤트 핸들러를 중간단계 경유해서 보내기가 싫어서임
  let visibleMemos = [];
  if (lastKeywords.length > 0)
    visibleMemos = searchMemos(memos, lastKeywords);
  else
    visibleMemos = memos;

  // 수정할 때마다 보여지는 순서가 바뀌면 곤란하므로 id순으로 정렬
  // any로 한 이유: id가 undefined일 수 있다는 에러가 뜸... 
  // 근데 visibleMemos는 id가 모두 존재할 수 밖에 없음
  visibleMemos.sort((memo1: any, memo2: any) => {
    return memo1.id - memo2.id;
  });

  // 메모를 클릭하면 현재 편집 중인 메모를 설정함
  const memoComponents = visibleMemos.map(memo => 
    <MemoPreview key={memo.id} memo={memo} onClickMemo={(memo: Memo) => setCurrentMemo(memo)} />
  );

  return (
    <div>
      <h1>TagMeMo</h1>
      <h2>검색하기</h2>
      <div className='button-and-search'>
        <input type='button' value='검색' onClick={onSearchClick} />
        <input type='search' placeholder='태그를 띄어쓰기해서 입력해주세요' onChange={onSearchChange} />
      </div>
      
      <hr />
      {lastKeywords.length > 0 ? 
        <SearchedMemoList memoComponents={memoComponents} /> : 
        <GeneralMemoList memoComponents={memoComponents} />}

      {/* 모달창 (메모 편집기) */}
      {currentMemo && 
      <div className='wall'>
        <MemoEditor memo={currentMemo} onClickModify={onClickModify} onClickCancel={onClickCancel} />
      </div>}
    </div>
  );
};

/**
 * memos에서 keywords로 검색하여 결과를 반환한다.
 * @param memos 
 * @param keywords 
 */
function searchMemos(memos: Memo[], keywords: string[]): Memo[] {
  return memos.filter(memo => {
    let approve = false;
    
    keywords.forEach(keyword => {
      // 본문에 keyword가 포함돼 있으면 검색
      approve = approve || memo.content.includes(keyword);

      // 태그에 keyword가 포함돼 있으면 검색
      approve = approve || memo.tags.indexOf(keyword) !== -1;
    });

    return approve;
  });
}

export default connect((state: State) => ({ memos: state.memos }))(App);
