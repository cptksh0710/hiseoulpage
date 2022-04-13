import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography
  } from '@mui/material';
import { useDispatch } from 'react-redux';
import { dataSave } from '../store/boardReducer';
import { uriSave } from '../store/uriReducer';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useHistory } from 'react-router-dom';

function BoardNew() {
    // title, content 를 제어하기 위해 선언
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    // 함수형 컴포넌트에서 useDispatch 사용을 위해 선언
    const dispatch = useDispatch();

    //data dispatch 후 list 페이지로 이동하기 위해 선언
    const history = useRouter();

    const onSave = () => {
        // reducer 에 선언된 초기값과 동일한 타입으로 data 값 설정
        const _inputData = {
            id: '',
            title: title,
            content: content
        }
        // 리듀서의 dataSave 함수에 dispatch
        dispatch(dataSave(_inputData))
        // input 값 reset
        setTitle('')
        setContent('')
        // data dispatch 후 페이지 이동
        history.push("/BoardList")
        // 페이지 이동 시 footer 의 button 설정을 위해 dispatch
        dispatch(uriSave("/BoardList"))
    }

    // input 값이 onChange 될 때마다 호출되어 setTitle, setContent 에 값을 넣어 제어한다.
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleContent = (e) => {
        setContent(e.target.value)
    }

    return (
        <div>
            <h2>공지 글 작성</h2>
            <div>
                <div>
                    <input type='text' className='inputTitle' placeholder='제목을 입력하세요' onChange={handleTitle} value={title} />
                </div>
                <div>
                    <textarea className='inputContent' placeholder='내용을 입력하세요' onChange={handleContent} value={content} />
                </div>
                <div>
                    <button type='button' onClick={onSave}>submit</button>
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
                    공지사항
                </Button>
            </NextLink>
        </div>
    )
}

export default BoardNew;