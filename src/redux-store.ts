import { createStore } from 'redux';
import State, { initialState } from './redux-state';
import reducer from './redux-reducer';
import Memo from './Memo';

// storage에 저장된 데이터를 불러온다.
// 그런 거 없으면 초기 상태를 불러온다.
let savedState: State = initialState;
const savedJSON = localStorage.getItem('data');

if (savedJSON) {
  const json = JSON.parse(savedJSON);

  savedState = {
    ...json,
    memos: json.memos.map((memo: any): Memo => {
      return {
        ...memo,
        modifiedAt: new Date(memo.modifiedAt)
      };
    }),
    lastCreatedMemo: null
  };
}

const store = createStore(reducer, savedState);

// storage에 현재 상태를 저장한다.
store.subscribe(() => {
  const state = store.getState();

  const data = JSON.stringify({
    memos: state.memos.map((memo: Memo) => {
      return {
        ...memo,
        modifiedAt: memo.modifiedAt.toUTCString()
      };
    }),
    idcnt: state.idcnt
  });

  localStorage.setItem('data', data);
});

export default store;