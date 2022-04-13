import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
import { MemberListResults } from '../components/member/member-list-results';
import { MemberListToolbar } from '../components/member/member-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
const Memberdev = () => {
  const [data, setData] = useState([]);
  const [memdata, setMemData] = useState([]); // 하위에서 받아오기 위한 상태 설정 // 하위로는 셋을 넘기게 된다.
  const [search, setSearch] = useState("");
  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get('http://localhost:8080/restapi/member');
      setData(response.data.payload);
    };
    apiCall();
  }, [])
  //console.log(search); 서치텍스트 받아온것 확인.
  //만든 데이터를 activeyn 'Y'인 것만 걸러내기.
  const ResultMap = data.filter((x) => {
    return x.activeyn == 'Y'
  })

  // active 필터링 되었던 값 다시 서치에 따라 재필터링 되게 만들기.
  const searchResult = ResultMap.filter((data) => {
    if (search == null)
      return data
    else if (data.id.toLowerCase().includes(search.toLowerCase()) || data.name.toLowerCase().includes(search.toLowerCase())) {
      return data
    }
  })
  //console.log(memdata); 하위에서 셋으로부터 받아온 값 잘들어온것 확인.
  return (
    <div>
      <>
        <Head>
          <title>
            Members | Byeol_ver
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth={false}>
            <MemberListToolbar memdata={memdata} setSearch={setSearch} />
            <Box sx={{ mt: 3 }}>
              <MemberListResults members={searchResult} setMemData={setMemData} />
            </Box>
          </Container>
        </Box>
      </>
    </div>
  );
};
Memberdev.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Memberdev;