import Memo from './Memo';

export default interface State {
  // 현재 들고있는 메모들
  memos: Memo[],

  // 새 메모가 가질 id
  idcnt: number,
  
  // 새로 생성된 메모를 바로 편집하게 하기 위해서 리듀서에서 활용
  lastCreatedMemo: Memo | null
}

export const initialState: State = {
  memos: [],
  idcnt: 0,
  lastCreatedMemo: null
};