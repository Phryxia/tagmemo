import React, { useState, useCallback, useRef } from 'react';
import Memo from './Memo';
import Tag from './Tag';
import * as Util from './Util';
import './MemoEditor.css';

interface MemoEditorProps {
  // 에디터의 초기값으로 채울 메모
  memo: Memo,

  // 수정하기를 누르면 호출된다. 인자는 수정된 메모 객체. (id는 같지만 레퍼런스는 다른 객체임)
  onClickModify: (memo: Memo) => void,

  // 취소하기를 누르면 호출된다.
  onClickCancel: () => void,

  // 현재 편집기가 방금 막 생성한 메모를 불러오는지 여부. (문구가 달라짐)
  isNewMemo: boolean
}

const MemoEditor = ({ memo, onClickModify, onClickCancel, isNewMemo }: MemoEditorProps) => {
  // 현재 편집기가 표시할 콘텐츠
  const [content, setContent] = useState<string> (memo.content);
  // 수정 전 content
  const originalContent = useRef<string>(memo.content); // persist 

  // 현재 편집기가 표시할 태그들
  const [tags, setTags] = useState<string[]> (memo.tags);
  // 수정 전 tags
  const originalTags = useRef<string[]>([...memo.tags]);

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
    // 만약 새로운 메모일 때 아무 내용이 없으면 아무 것도 하지 않음.
    if (isNewMemo && content.trim() === '') {
      onClickCancel();
      return;
    }
    // 만약 수정 중일 때 수정된 내용이 없으면 (태그랑 내용 둘 다 비교) 아무 것도 하지 않음.
    const sorted1 = tags.sort();
    const sorted2 = originalTags.current.sort();
    let isDiff = false;
    if (sorted1.length === sorted2.length) {
      for (let i = 0; i < sorted1.length; i++) {
        if (sorted1[i] !== sorted2[i]) {
          isDiff = true;
          break;
        }
      }
    } else {
      isDiff = true;
    }
    if (!isNewMemo && content.trim() === originalContent.current.trim() && !isDiff) {
        onClickCancel();
        return;
    }

    const newDate = new Date();
    onClickModify({
      id: memo.id,
      content,
      tags,
      modifiedAt: newDate
    });
    setModifiedAt(newDate);
  }, [memo, content, tags, onClickModify, isNewMemo, onClickCancel]);

  // 취소 버튼 핸들러
  const onClickCancelButton = useCallback(() => {
    onClickCancel();
  }, [onClickCancel]);

  // 태그 삭제 버튼 핸들러
  const onClickTagClose = useCallback((deletedTag: string) => {
    setTags((tags: string[]) => tags.filter(tag => tag !== deletedTag));
  }, []);

  const addNewTag = useCallback((newTag: string) => {
    if (newTag.trim() === '') {
      return;
    }
    if (tags.filter((tag)=>tag===newTag).length === 0) {
      setTags((tags: string[]) => [...tags, newTag]);
    }
}, [tags]);


  // 태그 추가하기 인풋 핸들러
  const onChangeNewTag = useCallback((event) => {
    setNewTag(event.target.value.trim());
  }, []);

  // 스페이스나 엔터 치면, 공백이 아니면 태그를 추가함
  const onKeyUpNewTag = useCallback((event) => {
    if ((event.key === ' ' || event.key === 'Enter')) {
      addNewTag(newTag);
      setNewTag('');
    }
  }, [newTag, addNewTag]);

  // 태그 입력창에 아무것도 없는 상태에서 백스페이스 누르면 기존에 태그가 있을 경우 그 태그 삭제함
  const onKeyDownDeleteTag = useCallback((event) => {
    if (event.key === 'Backspace' && newTag === '') {
      setTags((tags: string[]) => {
        const newTags = [...tags];
        newTags.pop();
        return newTags;
      });
    }
  }, [newTag]);

  const onBlurNewTag = useCallback((event) => {
    if (newTag.trim() !== '') {
      addNewTag(newTag);
      setNewTag('');
    }
  }, [newTag, addNewTag]);

  return (
    <div className='memo-editor'>
      {/* 메모와 수정 날짜 */}
      <div className='memo-editor-header'>
        메모
        <span>modified at {Util.formatDate(modifiedAt)}</span>
      </div>

      {/* 메모 입력 */}
      <textarea placeholder={"내용을 입력하세요..."} value={content} onChange={onChangeTextarea}></textarea>
      
      {/* 태그들 */}
      <div className='memo-editor-header'>태그</div>
      <div className='memo-editor-tags' style={{
        overflowY:"scroll", height:"60px"
      }}>
        {tags.map((tag: string) => <Tag key={tag} tag={tag} onClickClose={onClickTagClose} />)}
        <div>+<input type='text' value={newTag} onChange={onChangeNewTag} onKeyUp={onKeyUpNewTag} onKeyDown={onKeyDownDeleteTag} onBlur={onBlurNewTag} /></div>
      </div>

      {/* 버튼 */}
      <div className='memo-editor-buttons'>
        <input type='button' value='취소' onClick={onClickCancelButton} />
        <input type='button' value={isNewMemo ? '확인' : '수정'} onClick={onClickModifyButton} />
      </div>
    </div>
  );
};

export default MemoEditor;