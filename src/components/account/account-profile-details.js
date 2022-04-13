import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  FormHelperText,
  Typography
} from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import CancleModal from './canclemodal';
import WithdrawModal from './withdrawmodal';
import ModifyModal from './modifymodal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SendIcon from '@mui/icons-material/Send';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export const AccountProfileDetails = (props) => {
  var temp = new Date();
  var date = temp.getFullYear() + '-' + (temp.getMonth()+1) + '-' + temp.getDate() +' '+ temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
  const nDate = date;
  
  const addCustomer = () => {
    const url = 'http://localhost:8080/restapi/member';
    const formData = new FormData();
    formData.append("no", 0);
    formData.append("id", formik.values.firstName);
    formData.append("pass", formik.values.password);
    formData.append("name", formik.values.lastName);
    formData.append("email", formik.values.email);
    formData.append("activeyn", "Y");
    formData.append("writedate", nDate);
    formData.append("update", nDate);
    formData.append("permission", 1);
    formData.append("auth", 1);
    formData.append("instanceyn", "N");
    const config = {
      headers: {
      "content-type": "multipart/form-data", 
      },
    };
    return (axios.post(url, formData, config)
      .then( response => {
        console.log('response :', JSON.stringify(response, null, 2))
      }).catch( error => {
        console.log('failed', error)
      }))
    }
  

  
  const formik = useFormik({
    initialValues: {
      name: '',
      pass: '',
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required(
          'name is required'),
      pass: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
    }),
    onSubmit: () => {
      router.push('/login');
    }
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    const apiCall = async () =>  {
      const response = await axios.get('http://localhost:8080/restapi/member/1'); 
          setData(response.data.payload);
        };
      apiCall();
    }, [])
    console.log(data)
    const [values, setValues] = useState({
      name: data.name,
      pass: data.pass
    });
    console.log(values)
    const AccountValue = (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });  
    };


  
  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
        >
          <WithdrawModal/>
        </Box> 
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography
                gutterBottom
                color="textSecondary"
                variant='caption'
              >
              ID
              </Typography>
              <Div gutterBottom>{data.id}</Div>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography
                gutterBottom
                color="textSecondary"
                variant='caption'
              >
              Email address
              </Typography>
              <Div 
              gutterBottom
              >{data.email}
              </Div>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={AccountValue}
                required
                variant="outlined"
                value={formik.values.name}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                //helperText="[경고] 비밀번호 값이 존재하면 비밀번호가 변경됩니다."
                label="Password"
                name="pass"
                error={Boolean(formik.touched.pass && formik.errors.pass)}
                helperText={formik.touched.pass && formik.errors.pass}
                margin="normal"
                onChange={formik.handleChange}
                required
                variant="outlined"
                value={formik.values.pass}
                type="password"
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Stack direction="row" spacing={2}>
            <Box>
              <CancleModal/>
            </Box>
            <Box>
              <ModifyModal />
            </Box>
          </Stack>
        </Box>
      </Card>
    </form>
  );
};
