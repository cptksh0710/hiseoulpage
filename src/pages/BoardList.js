import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    TextField,
    Typography
  } from '@mui/material';

import NextLink from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { selectRow } from '../store/boardReducer';
 
function BoardList() {
    const {inputData} = useSelector(state => state.boardReducer)
    const {lastId} = useSelector(state => state.boardReducer)
 
	// 클릭한 글의 id를 넘겨주기 위해 dispatch 를 사용한다.
    const dispatch = useDispatch();
 
	// reducer 의 selectRow 함수에 선택한 id값을 넘겨준다.
    const selectContent = (id) => {
        dispatch(selectRow(id))
    }
 
    return(
        <div>
            <h2>공지사항</h2>
            <div>
                <table className='listTable'>
                    <tbody>
                        <tr>
                            <td className='listTableIndex th'>index</td>
                            <td className='listTableTitle th'>title</td>
                        </tr>
                        {lastId !== 0 ?
                            inputData.map(rowData => (
                                rowData.id !== '' &&
                                <tr>
                                    <td className='listTableIndex' onClick={() => selectContent(rowData.id)}>
                                        <NextLink 
                                            href="/BoardContent"
                                        > 
                                            <a>{rowData.id}</a>
                                        </NextLink>
                                    </td>
                                    <td className='listTableTitle' onClick={() => selectContent(rowData.id)}>
                                        <NextLink 
                                            href="/BoardContent"
                                        >
                                            <a>{rowData.title}</a> 
                                        </NextLink>
                                    </td>
                                </tr>
                            )) : 
                            <tr>
                                <td className='listTableIndex'></td>
                                <td className='listTableTitle noData'>작성된 글이 없습니다.</td>
                            </tr>
                        }
                    </tbody>
                </table>
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
                href="/BoardNew"
                passHref
            >
                <Button>
                    새 공지 작성
                </Button>
            </NextLink>
        </div>
    )
}
 
export default BoardList;