/**
 * 하나의 메모를 전담하는 모델
 */
type Memo = {
  id?: number,
  content: string,
  tags: string[],
  modifiedAt: Date
};

export default Memo;

/**
 * 두 태그 배열이 같은지
 * @param arr1 태그 배열 1
 * @param arr2 태그 배열 2
 */
export function tagsArrayAreEqual(arr1: string[], arr2: string[]) {
  let out = arr1.length === arr2.length;
  
  if (!out)
    return out;
  
  // 순서만 다르고 내용물은 같은 경우를 감지하기 위해서
  arr1 = arr1.slice().sort();
  arr2 = arr2.slice().sort();
  
  for (let i = 0; out && i < arr1.length; ++i) {
    out &&= arr1[i] === arr2[i];
  }

  return out;
}

/**
 * 두 Memo가 같은지 판별
 * @param prevMemo 
 * @param nextMemo 
 */
export function memosAreEqual(prevMemo: Memo, nextMemo: Memo): boolean {
  return prevMemo.content === nextMemo.content
    && tagsArrayAreEqual(prevMemo.tags, nextMemo.tags)
    && prevMemo.modifiedAt === nextMemo.modifiedAt;
}