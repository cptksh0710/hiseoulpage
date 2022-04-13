import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    TextField,
    Typography
  } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { editContent, removeContent } from '../store/boardReducer';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
 
function BoardContent() {
    const { selectRowData } = useSelector(state => state.boardReducer)
 
    const [title, setTitle] = useState(selectRowData.title)
    const [content, setContent] = useState(selectRowData.content)
 
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
 
    const handleContent = (e) => {
        setContent(e.target.value)
    }
 
    const dispatch = useDispatch()
    const history = useRouter();
 
    const onChange = () => {
        const _inputData = {
            id: selectRowData.id,
            title: title,
            content: content
        }
        console.log('clickSave :: ', _inputData)
        dispatch(editContent(_inputData))
        setTitle('')
        setContent('')
        history.push("/BoardList")
    }
 
    const onRemove = () => {
    	// reducer의 removeContent 함수에 삭제할 id 값을 전달한다.
        dispatch(removeContent(selectRowData.id))
        // input 값 초기화
        setTitle('')
        setContent('')
        // 페이지 이동
        history.push("/BoardList")
    }
 
    return(
        <div>
            <h2>상세보기</h2>
            <div>
                <div>
                    <input type='text' className='inputTitle' onChange={handleTitle} value={title} />
                </div>
                <div>
                    <textarea className='inputContent' onChange={handleContent} value={content} />
                </div>
                <div>
                    <button type='button' onClick={onChange} className='editBtn'>edit</button>
                    <button type='button' onClick={onRemove} className='deleteBtn'>delete</button>
                </div>
            </div>
            <NextLink
                href="/"
                passHref
            >
                <Button>
                    메인 화면
                </Button>
            </NextLink>
            <NextLink
                href="/BoardList"
                passHref
            >
                <Button>
                    리스트로
                </Button>
            </NextLink>
        </div>
    )
}
 
export default BoardContent;
