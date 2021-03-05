import React from 'react';
import MemoPreview from './MemoPreview';

const App = () => {
  return (
    <div>
      <h1>TagMeMo</h1>
      <h2>검색하기</h2>
      <div>
        <input type='button' value='검색' />
        <input type='search' placeholder='태그를 띄어쓰기해서 입력해주세요' />
      </div>
      
      <hr />

      {/* 메모들! */}
    </div>
  );
};

export default App;
