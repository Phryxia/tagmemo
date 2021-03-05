import Memo from './Memo';
import State from './redux-state';

const initialState: State = {
  memos: [
    {
      id: 0,
      content: '배고프다',
      tags: ['태그1', '태그2'],
      modifiedAt: new Date()
    },
    {
      id: 1,
      content: '살어리 살어리랏다 청산에 살어리랏다 근데 받침 시옷 맞냐',
      tags: ['태그3', '태그4'],
      modifiedAt: new Date()
    }
  ],
  idcnt: 0
};

export default function rootReducer(state = initialState, action: any): State {
  switch (action.type) {
    // 메모를 만든다. payload는 id를 제외한 Memo의 모든 필드가 들어가있으면 된다.
    case 'memo/add':
      return {
        ... state,
        memos: [... state.memos, { ... action.payload, id: state.idcnt }],
        idcnt: state.idcnt + 1
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