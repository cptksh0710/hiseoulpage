import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  CardHeader,
  Divider,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { UserAdd as AddIcon } from '../../icons/user-add';
import { User as UserIcon } from '../../icons/user';
import { XCircle as XIcon } from '../../icons/x-circle';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NoEncryption } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 4,
};

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
  var date = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate() + ' ' + temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
  const nDate = date;
  //세부정보 가져오기 용
  const [memdetail, setMemDetail] = useState({});

  // 승인 api
  function memberAuth() {
    props.memdata.forEach(function (ele, index) {
      console.log(ele, index);
      const url = `http://localhost:8080/restapi/memberre/Auth/` + ele;
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
        .then(response => {
          console.log('response :', JSON.stringify(response, null, 2))
        }).catch(error => {
          console.log('failed', error)
        })
      )
    });
  };

  // 활성화 api
  function memberActive() {
    props.memdata.forEach(function (ele, index) {
      console.log(ele, index);
      const url = `http://localhost:8080/restapi/memberre/Active/` + ele;
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
        .then(response => {
          console.log('response :', JSON.stringify(response, null, 2))
        }).catch(error => {
          console.log('failed', error)
        })
      )
    });
  };
  // 등록하기
  const addMember = () => {
    const url = 'http://localhost:8080/restapi/memberre';
    const formData = new FormData();
    formData.append("no", 0);
    formData.append("id", formik.values.id);
    formData.append("pass", formik.values.password);
    formData.append("name", formik.values.lastName);
    formData.append("email", formik.values.email);
    formData.append("instanceyn", "N");
    formData.append("writedate", nDate);
    formData.append("update", nDate);
    formData.append("permission", formik.values.permission);
    formData.append("auth", 0);
    formData.append("activeyn", "Y");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    setOpen1(false); 
    location.reload();
    return (axios.post(url, formData, config)
      .then(response => {
        console.log('response :', JSON.stringify(response, null, 2))
      }).catch(error => {
        console.log('failed', error)
      })) 
  }
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      id: '',
      name: '',
      password: '0000',
      permission: '9',
      instanceyn: '',
      activeyn:'',
      auth:'',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      id: Yup
        .string()
        .max(255)
        .required(
          'First name is required'),
      name: Yup
        .string()
        .max(255)
        .required(
          'Last name is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
      permission: Yup
        .string()
        .max(255)
        .required(
          'Permission is required'),          
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
  });

  //체크 후 세부정보에 불러오기까지 가능
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleOpen2 = () => {
    const apiCall = async () => {
      const response = await axios.get(`http://localhost:8080/restapi/memberre/` + props.memdata[0]);
      console.log(response.data);
      setMemDetail(response.data);
    };
    console.log(props.memdata);
    {props.memdata.length === 1 ? apiCall() : setOpen2(false)}
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const [values, setValues] = useState(memdetail);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  //console.log(memdetail);
  return (
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
            onClick={handleOpen1}
            sx={{ mr: 1 }}
          >
            등록하기
          </Button>
          <Modal
            open={open1}
            onClose={handleClose1}
          >
            <Box sx={{ ...style }}>
              <Card>
                <CardHeader
                  title="회원 등록"
                  subheader="Admin Regist"
                />
                <Divider />
                <CardContent>
                  <TextField
                    error={Boolean(formik.touched.id && formik.errors.id)}
                    fullWidth
                    helperText={formik.touched.id && formik.errors.id}
                    label="아이디"
                    margin="normal"
                    name="id"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.id}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="비밀번호"
                    margin="normal"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="이름"
                    margin="normal"
                    name="lastName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="이메일"
                    margin="normal"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(formik.touched.permission && formik.errors.permission)}
                    fullWidth
                    helperText={formik.touched.permission && formik.errors.permission}
                    label="권한"
                    margin="normal"
                    name="permission"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.permission}
                    variant="outlined"
                  />
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      ml: -1
                    }}
                  >
                  </Box>
                  {Boolean(formik.touched.policy && formik.errors.policy) && (
                    <FormHelperText error>
                      {formik.errors.policy}
                    </FormHelperText>
                  )}
                  <Box sx={{ py: 2 }}>

                    <Button
                      color="primary"
                      disabled={formik.isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      onClick={addMember}
                    >
                      회원가입
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Modal>
          <Button
            startIcon={(<UserIcon fontSize="small" />)}
            sx={{ mr: 1 }}
            onClick={handleOpen2}
          >
            세부정보
          </Button>
          <Modal
            open={open2}
            onClose={handleClose2}
          >
            <Box sx={{ ...style }}>
              <Card>
                <CardHeader
                  title="회원 세부 정보"
                  subheader="member_information"
                />
                <Divider />
                <CardContent>
                  <Typography gutterBottom variant="h7" component="div">
                    <label>멤버 고유 No : </label>
                    <label>{memdetail.no}</label><br/>
                  </Typography>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="ID"
                        name="id"
                        onChange={handleChange}
                        required
                        value={memdetail.id}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="NAME"
                        name="name"
                        onChange={handleChange}
                        required
                        value={memdetail.name}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="PASSWORD"
                        name="pass"
                        onChange={handleChange}
                        value={memdetail.pass}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        required
                        value={memdetail.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="InstanceYN"
                        name="instanceyn"
                        onChange={handleChange}
                        required
                        value={memdetail.instanceyn}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="ActiveYN"
                        name="activeyn"
                        onChange={handleChange}
                        required
                        value={memdetail.activeyn}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Permission"
                        name="permission"
                        onChange={handleChange}
                        required
                        value={memdetail.permission}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Auth"
                        name="auth"
                        onChange={handleChange}
                        required
                        value={memdetail.auth}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Typography gutterBottom variant="h7" component="div">
                    <label> 가입일 : </label>
                    <label>{memdetail.writedate}</label>
                  </Typography>
                  <Divider />
                  <Typography gutterBottom variant="h7" component="div">
                    <label> 최근 업데이트 날짜 : </label><br/>
                    <label>{memdetail.update}</label>
                  </Typography>
                </CardContent>
                <Divider />
                <Button
                  variant='outlined'
                  onClick={handleClose2}
                  fullWidth
                >
                  종료하기
                </Button>
              </Card>
            </Box>
          </Modal>
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
