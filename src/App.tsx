import React, { useState, useCallback } from 'react';

import Memo, { tagsArrayAreEqual } from './Memo';

import GeneralMemoList from './GeneralMemoList';
import SearchedMemoList from './SearchedMemoList';

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
  const [curKeywords, setCurKeywords] = useState<string[]> ([]);
  const [lastKeywords, setLastKeywords] = useState<string[]> ([]);

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

  return (
    <div>
      <h1>TagMeMo</h1>
      <h2>검색하기</h2>
      <div className='button-and-search'>
        <input type='button' value='검색' onClick={onSearchClick} />
        <input type='search' placeholder='태그를 띄어쓰기해서 입력해주세요' onChange={onSearchChange} />
      </div>
      
      <hr />
      {lastKeywords.length > 0 ? <SearchedMemoList memos={searchMemos(memos, lastKeywords)} /> : <GeneralMemoList memos={memos} />}
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
