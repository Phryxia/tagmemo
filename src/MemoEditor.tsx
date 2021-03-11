import React, { useState, useCallback, useEffect } from 'react';
import Memo, { memosAreEqual } from './Memo';
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

  // ESC 누르면 취소 누른 거랑 동일하게 동작
  useEffect(() => {
    document.onkeyup = (event) => {
      if (event.key === 'Escape') {
        // 수정에 변화가 있으면 물어보고 취소함
        if (!memosAreEqual(memo, { content, tags, modifiedAt }) && !window.confirm('수정을 취소하시겠습니까?'))
          return;

        onClickCancel();
      }
    };
  }, [memo, onClickCancel, content, tags, modifiedAt]);

  // 태그 삭제 버튼 핸들러
  const onClickTagClose = useCallback((deletedTag: string) => {
    setTags((tags: string[]) => tags.filter(tag => tag !== deletedTag));
  }, []);

  // 태그 추가하기 인풋 핸들러
  const onChangeNewTag = useCallback((event) => {
    setNewTag(event.target.value.trim());
  }, []);
  
  // 새 태그를 추가함
  const addNewTag = (newTag: string) => {
    if (!newTag || tags.includes(newTag))
      return ;
    setTags([...tags, newTag]);
  };

  // 스페이스나 엔터 치면, 공백이 아니면 태그를 추가함
  const onKeyUpNewTag = useCallback((event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      addNewTag(newTag);
      setNewTag('');
    }
    // 백스페이스 누르고 newTag가 ''면 태그를 지움
    else if (event.key === 'Backspace' && newTag === '') {
      setTags((tags: string[]) => {
        const newTags = [...tags];
        newTags.pop();
        return newTags;
      });
    }
  }, [tags, newTag, addNewTag]);

  const onBlurNewTag = useCallback((event) => {
    addNewTag(newTag);
    setNewTag('');
  }, [newTag, addNewTag]);

  return (
    <div className='memo-editor'>
      {/* 메모와 수정 날짜 */}
      <div className='memo-editor-header'>
        메모
        <span>modified at {Util.formatDate(modifiedAt)}</span>
      </div>

      {/* 메모 입력 */}
      <textarea value={content} onChange={onChangeTextarea} placeholder='내용을 입력해주세요...'></textarea>
      
      {/* 태그들 */}
      <div className='memo-editor-header'>태그</div>
      <div className='memo-editor-tags' style={{
        overflowY:"scroll", height:"60px"
      }}>
        {tags.map((tag: string) => <Tag key={tag} tag={tag} onClickClose={onClickTagClose} />)}
        <div>+<input type='text' value={newTag} onChange={onChangeNewTag} onKeyUp={onKeyUpNewTag} onBlur={onBlurNewTag} /></div>
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