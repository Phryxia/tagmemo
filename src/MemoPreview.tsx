import React from 'react';
import Memo, { memosAreEqual } from './Memo';

interface MemoPreviewProps {
  memo: Memo
};

/**
 * 메인에서 메모 미리보기 버튼들을 담당하는 컴포넌트
 */
const MemoPreview = React.memo(({ memo }: MemoPreviewProps) => {
  return (
    <div className='memo-preview'>
      {/* 메모 상단 날짜랑 삭제 버튼 */}
      <div className='date-and-close'>
        {formatDate(memo.modifiedAt)}
        <input type='button' value='×' />
      </div>

      {/* 메모 내용 미리보기 */}
      <a>{summarize(memo.content, 64)}</a>

      {/* 태그들 */}
      <div className='memo-preview-tags'>
      {
        summarize(memo.tags.map(tag => `#${tag}`).join(' '), 16)
      }
      </div>
    </div>
  );
}, (prevProps: MemoPreviewProps, nextProps: MemoPreviewProps) => memosAreEqual(prevProps.memo, nextProps.memo));

export default MemoPreview;

/**
 * YYYY-MM-DD HH:MM 형식으로 날짜를 출력한다.
 * @param date Date 오브젝트
 */
function formatDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

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