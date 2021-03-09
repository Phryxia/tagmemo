import React, { useCallback } from 'react';
import Memo, { memosAreEqual } from './Memo';
import store from './redux-store';
import * as Util from './Util';
import './MemoPreview.css';

interface MemoPreviewProps {
  memo: Memo,
  onClickMemo: (memo: Memo) => void
};

/**
 * 메인에서 메모 미리보기 버튼들을 담당하는 컴포넌트
 */
const MemoPreview = React.memo(({ memo, onClickMemo }: MemoPreviewProps) => {
  const onClickArea = useCallback((event) => {
    onClickMemo(memo);
  }, [memo]);

  const onClickCloseButton = useCallback(() => {
    store.dispatch({ type: 'memo/remove', payload: memo.id });
  }, [memo]);

  return (
    <div className='memo-preview'>
      {/* 메모 상단 날짜랑 삭제 버튼 */}
      <div className='date-and-close'>
        {Util.formatDate(memo.modifiedAt)}
        <input type='button' value='×' onClick={onClickCloseButton} />
      </div>

      {/* 메모 내용 미리보기 */}
      <div className='content-and-tags' onClick={onClickArea}>
        <a>{summarize(memo.content, 25)}</a>

        {/* 태그들 */}
        <div className='memo-preview-tags'>
        {
          summarize(memo.tags.map(tag => `#${tag}`).join(' '), 11)
        }
        </div>
      </div>
    </div>
  );
}, (prevProps: MemoPreviewProps, nextProps: MemoPreviewProps) => memosAreEqual(prevProps.memo, nextProps.memo));

export default MemoPreview;

/**
 * content가 length자보다 길면 잘라서 ...을 붙여준다.
 * @param content 자를 문자열
 * @param length 자를 길이
 */
function summarize(content: string, length: number) {
  if (content.length <= length)
    return content;
  else
    return content.substring(0, length) + '...';
}