import React, { useState, useCallback } from 'react';
import Memo from './Memo';
import Tag from './Tag';
import * as Util from './Util';
import './MemoEditor.css';

interface MemoEditorProps {
  memo: Memo,
  onClickModify: (memo: Memo) => void,
  onClickCancel: () => void
}

const MemoEditor = ({ memo, onClickModify, onClickCancel }: MemoEditorProps) => {
  // 현재 편집기가 표시할 콘텐츠
  const [content, setContent] = useState<string> (memo.content);

  // 현재 편집기가 표시할 태그들
  const [tags, setTags] = useState<string[]> (memo.tags);

  // 현재 편집기가 표시할 수정날짜
  const [modifiedAt, setModifiedAt] = useState<Date> (memo.modifiedAt);

  // 태그 추가하기 인풋에 입력된 데이터
  const [newTag, setNewTag] = useState<string> ('');

  // 콘텐츠 수정 콜백
  const onChangeTextarea = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  // 수정 버튼 핸들러
  const onClickModifyButton = useCallback(() => {
    const newDate = new Date();
    onClickModify({
      id: memo.id,
      content,
      tags,
      modifiedAt: newDate
    });
    setModifiedAt(newDate);
  }, [memo, content, tags]);

  // 취소 버튼 핸들러
  const onClickCancelButton = useCallback(() => {
    onClickCancel();
  }, []);

  // 태그 삭제 버튼 핸들러
  const onClickTagClose = useCallback((deletedTag: string) => {
    setTags((tags: string[]) => tags.filter(tag => tag !== deletedTag));
  }, []);

  // 태그 추가하기 인풋 핸들러
  const onChangeNewTag = useCallback((event) => {
    setNewTag(event.target.value.trim());
  }, []);

  const onKeyUpNewTag = useCallback((event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      setTags((tags: string[]) => [...tags, newTag]);
      setNewTag('');
    }
  }, [newTag]);

  return (
    <div className='memo-editor'>
      {/* 메모와 수정 날짜 */}
      <div className='memo-editor-header'>
        메모
        <span>modified at {Util.formatDate(modifiedAt)}</span>
      </div>

      {/* 메모 입력 */}
      <textarea value={content} onChange={onChangeTextarea}></textarea>
      
      {/* 태그들 */}
      <div className='memo-editor-header'>태그</div>
      <div className='memo-editor-tags'>
        {tags.map((tag: string) => <Tag key={tag} tag={tag} onClickClose={onClickTagClose} />)}
        <div>+<input type='text' value={newTag} onChange={onChangeNewTag} onKeyUp={onKeyUpNewTag} /></div>
      </div>

      {/* 버튼 */}
      <div className='memo-editor-buttons'>
        <input type='button' value='수정' onClick={onClickModifyButton} />
        <input type='button' value='취소' onClick={onClickCancelButton} />
      </div>
    </div>
  );
};

export default MemoEditor;