import Memo from './Memo';
import State from './redux-state';

export default function rootReducer(state: any, action: any): State {
  switch (action.type) {
    // 메모를 만든다. payload는 id를 제외한 모든 필드가 들어간 Memo이다.
    case 'memo/add':
      const newMemo = { ... action.payload, id: state.idcnt };
      return {
        ... state,
        memos: [... state.memos, newMemo],
        idcnt: state.idcnt + 1,
        lastCreatedMemo: newMemo
      };
    
    // 메모를 수정한다. payload는 id를 포함한 모든 필드가 들어간 Memo이다.
    case 'memo/modify':
      return {
        ... state,
        memos: [... state.memos.filter((memo: Memo) => memo.id !== action.payload.id), action.payload]
      };
    
    // 메모를 삭제한다. payload는 id이다.
    case 'memo/remove':
      return {
        ... state,
        memos: state.memos.filter((memo: Memo) => memo.id !== action.payload)
      };
    
    default:
      return state;
  }
};