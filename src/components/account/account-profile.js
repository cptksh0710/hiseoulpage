import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AccountProfile = (props) => {
  const avatar = '/static/images/avatars/ico_01.png';

  const [data, setData] = useState([]);
  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get('http://localhost:8080/restapi/member/1');
      setData(response.data.payload);
    };
    apiCall();
  }, [])


  return (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={avatar}
          sx={{
            height: 200,
            mb: 2,
            width: 200
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {data.name}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
  </Card>
)}