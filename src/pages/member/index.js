import React, { useState, Component, useEffect } from 'react';
import Customer from './Customer';
import CustomerAdd from './CustomerAdd';
import {
  Paper,
  AppBar,
  Box,
  Button,
  Card,
  CircularProgress,
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material';
import { UserAdd as AddIcon } from '../../icons/user-add';
import axios from 'axios';
import { Search as SearchIcon } from '../../icons/search';
import { DashboardLayout } from 'src/components/dashboard-layout';
import CustomerDelete from './CustomerDelete';
import CustomerAuth from './CustomerAuth';
import CustomerDetail from './CustomerDetail';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { DevTool } from '@hookform/devtools';

const Management = () => {
  // db get용
  const [data, setData] = useState([]);
  // page 나누고 전환용 
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  // 서치 관련 상태관리
  const [inputText, setInputText] = useState("");

  const onChangeInput = e => {
    setInputText(e.target.value);
  };
  const onReset = () => {
    setInputText("");
  };
  // 고객 정보 받기  
  useEffect(() => {
    const callApi = async () =>  {
      const response = await axios.get('http://localhost:8080/restapi/member'); 
      setData(response.data.payload);
    };
    callApi();
  }, [])

  //받은 데이터를 activeyn 'Y'인 것만 걸러내기.
  const ResultMap = data.filter((x)=> {
    return x.activeyn == 'Y' 
  })
  // active 필터링 되었던 값 다시 서치에 따라 재필터링 되게 만들기.
  const searchResult = ResultMap.filter((data)=>{
    if(inputText == null)
        return data
    else if(data.id.toLowerCase().includes(inputText.toLowerCase()) || data.name.toLowerCase().includes(inputText.toLowerCase())|| data.email.toLowerCase().includes(inputText.toLowerCase())){
        return data
    }
  })


  const handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value,10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };  
  return (
    <div className="root">
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
          고객 관리 시스템
        </Typography>
        <Box sx={{ m: 1 }}>
          <CustomerAdd />
        </Box> 
      </Box>   
      <div className="grow" />
      <div className="search">
        <div className="searchIcon">
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
        </div>
      </div>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    NO
                  </TableCell>
                  <TableCell align="center">
                    PERM
                  </TableCell>
                  <TableCell align="right">
                    ID
                  </TableCell>
                  <TableCell align="left">
                  </TableCell>
                  <TableCell align="center">
                    NAME
                  </TableCell>
                  <TableCell align="center">
                    EMAIL
                  </TableCell>
                  <TableCell align="center">
                    AUTH
                  </TableCell>
                  <TableCell align="center">
                  </TableCell>
                  <TableCell align="center">
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResult.slice(page * limit, (page + 1) * limit).map((member) => (
                  <TableRow
                    hover
                    key={member.no}
                    
                  >
                    <TableCell align="center">
                      {member.no}
                    </TableCell>
                    <TableCell align="center">
                      {member.permission}
                    </TableCell>
                    <TableCell align="right">
                      {member.id}
                    </TableCell>
                    <TableCell align="left">
                      <CustomerDetail no = {member.no}/> 
                    </TableCell>
                    <TableCell align="center">
                      {member.name}
                    </TableCell>
                    <TableCell align="center">
                      {member.email}
                    </TableCell>
                    <TableCell align="center">
                      {member.auth}
                    </TableCell>
                    <TableCell align="center">
                      <CustomerAuth no = {member.no}/> 
                    </TableCell>
                    <TableCell align="center">
                      <CustomerDelete no = {member.no}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={data.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </div>  
  );
};
Management.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
export default Management;