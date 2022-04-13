import {
  Box,
  Button,
  Card,
  Grid,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { UserAdd as AddIcon } from '../../icons/user-add';
import { User as UserIcon } from '../../icons/user';
import { XCircle as XIcon } from '../../icons/x-circle';
import { useState } from 'react';
import axios from 'axios';

export const MemberListToolbar = (props) => {
  const [inputText, setInputText] = useState("");
  props.setSearch(inputText);
  const onChangeInput = e => {
    setInputText(e.target.value);
  };
  const onReset = () => {
    setInputText("");
  };
  console.log(props.memdata)// memdev부터 넘어온 값 확인
  // 날짜 형식 만들기
  var temp = new Date();
  var date = temp.getFullYear() + '-' + (temp.getMonth()+1) + '-' + temp.getDate() +' '+ temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
  const nDate = date;
  // 승인 api
  const memberAuth = () => {
    const url = `http://localhost:8080/restapi/memberre/Auth/`+props.memdata; 
    const formData = new FormData();

    formData.append("auth", 1);
    formData.append("update", nDate);
    const config = {
      headers: {
      "content-type": "multipart/form-data", 
      },
    };
    location.reload();
    return (axios.put(url, formData, config)
      .then( response => {
        console.log('response :', JSON.stringify(response, null, 2))
      }).catch( error => {
        console.log('failed', error)
      })
      )
  }
  // 활성화 api
  const memberActive = () => {
    const url = `http://localhost:8080/restapi/memberre/Active/`+props.memdata; 
    const formData = new FormData();

    formData.append("activeyn", 'N');
    formData.append("update", nDate);
    const config = {
      headers: {
      "content-type": "multipart/form-data", 
      },
    };
    location.reload();
    return (axios.put(url, formData, config)
      .then( response => {
        console.log('response :', JSON.stringify(response, null, 2))
      }).catch( error => {
        console.log('failed', error)
      }))
  }
  return(
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 3 }}
          variant="h4"
        >
          회원정보 검색
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<AddIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            등록하기
          </Button>
          <Button
            startIcon={(<UserIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            세부정보
          </Button>
          <Button
            startIcon={(<XIcon fontSize="small" />)}
            sx={{ mr: 1 }}
            onClick={memberActive}
          >
            삭제하기
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={memberAuth}
          >
            선택 승인
          </Button>
        </Box>
      </Box>
      <Box sx={{ ml: 1 }}>
        <Card>
          <CardContent>
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1
            }}
          >
              <TextField
                fullWidth
                onChange={onChangeInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
              
          </CardContent>
              
        </Card> 
      </Box>
    </Box>
  );
};
