import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Button,
  Typography
} from '@mui/material';
import NextLink from 'next/link';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import * as Yup from 'yup';

//모달 스타일
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 4,
};
// ID, Email 글씨 스타일
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export const AccountProfileDetails = (props) => {
  var memnumber = 1
  //취소 버튼 변수
  const [cancleopen, setcOpen] = useState(false);
  const chandleOpen = () => {
    setcOpen(true);
  };
  const chandleClose = () => {
    setcOpen(false);
  };
  //탈퇴 버튼 변수
  const [pwithdrawopen, setpwithdrawOpen] = useState(false);
  const pwithdrawhandleOpen = () => {
    setpwithdrawOpen(true);
  };
  const pwithdrawhandleClose = () => {
    setpwithdrawOpen(false);
  };
  //자식 
  const [cwithdrawopen, setcwithdrawOpen] = useState(false);
  const memberWithdraw = () => {
    setcwithdrawOpen(true);
    const url = 'http://localhost:8080/restapi/memberre/Active/' + memnumber;
    const formData = new FormData();
    formData.append("activeyn", "N");
    formData.append("update", nDate);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return (axios.put(url, formData, config)
      .then(response => {
        console.log('response :', JSON.stringify(response, null, 2))
      }).catch(error => {
        console.log('failed', error)
      }))
  };
  const cwithdrawhandleClose = () => {
    setcwithdrawOpen(false);
  };

  var temp = new Date();
  var date = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate() + ' ' + temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
  const nDate = date;

  function memberpass(props) {
    var mempass;
    if (props && true) {
      mempass = props;
    } else {
      mempass = data.pass;
    }
    return mempass;
  };

  function membername(props) {
    var memname;
    if (props && true) {
      memname = props;
    } else {
      memname = data.name;
    }
    return memname;
  };

  // 이름, 비밀번호 포스트 
  const accountInput = () => {
    const url = 'http://localhost:8080/restapi/memberre/Account/' + memnumber;
    const formData = new FormData();
    formData.append("pass", memberpass(formik.values.password));
    formData.append("name", membername(formik.values.name));
    formData.append("update", nDate);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return (axios.put(url, formData, config)
      .then(response => {
        console.log('response :', JSON.stringify(response, null, 2))
      }).catch(error => {
        console.log('failed', error)
      }))
  }
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmpassword: ''
    },
    validationSchema: Yup.object().shape({
      password: Yup
        .string()
        // Password Rule (영문, 숫자, 특수문자 포함 8~20글자)
        .matches(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/, 
        "비밀번호는 영문, 숫자, 특수문자를 조합하여 8자리 이상 20글자 이하의 길이로 구성하여야합니다."),
      confirmpassword: Yup
        .string()
        // confirmpassword와 password를 비교하여 틀릴 때와 공백일 때 에러를 반환
        .oneOf([Yup.ref('password'), null], "입력한 비밀번호와 일치하지않습니다.")
        .required('비밀번호를 입력하세요.')
    }),
    onSubmit: () => {
      router.push('/login');
    }
  })
  // 비밀번호 일치 할때

  function Passwordvalidation() {
    if (formik.values.password === formik.values.confirmpassword) {
      //수정버튼 변수
      const [modifyopen, setmOpen] = useState(false);
      const mhandleOpen = () => {
        setmOpen(true);
      };
      const mhandleClose = () => {
        setmOpen(false);
      };
      return (
        <React.Fragment>
          <Button
            onClick={mhandleOpen}
            variant='contained'
            startIcon={<SendIcon />}
          >
            수정
          </Button>
          <Modal
            open={modifyopen}
            onClose={mhandleClose}
          >
            <Box sx={{ ...style }}>
              <h2>수정하시겠습니까?</h2>
              <NextLink href="/">
                <Button
                  variant='contained'
                  onClick={accountInput}
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  yes
                </Button>
              </NextLink>
              <Button
                variant='outlined'
                onClick={mhandleClose}
              >
                no
              </Button>
            </Box>
          </Modal>
        </React.Fragment>
      )
    } else {
      // 비밀번호 틀렸을때
      const [passopen, setpassOpen] = useState(false);
      const passhandleOpen = () => {
        setpassOpen(true);
      };
      const passhandleClose = () => {
        setpassOpen(false);
      };
      return (
        <React.Fragment>
          <Button
            onClick={passhandleOpen}
            variant='contained'
            startIcon={<SendIcon />}
          >
            수정
          </Button>
          <Modal
            open={passopen}
            onClose={passhandleClose}
          >
            <Box sx={{ ...style }}>
              <h2>비밀번호가 일치하지않습니다.</h2>
              <Button
                variant='outlined'
                onClick={passhandleClose}
              >
                확인
              </Button>
            </Box>
          </Modal>
        </React.Fragment>
      )
    }
  };
  // api호출 
  const [data, setData] = useState([]);
  useEffect(() => {
    const apiCall = async () => {
      const response = await axios.get('http://localhost:8080/restapi/member/' + memnumber);
      setData(response.data.payload);
      console.log(response)
    };
    apiCall();
  }, [])

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
          <Button
            onClick={pwithdrawhandleOpen}
            variant='contained'
            startIcon={<DeleteIcon />}
            color="error"
          >
            탈퇴
          </Button>
          <Modal
            open={pwithdrawopen}
            onClose={pwithdrawhandleClose}
          >
            <Box sx={{ ...style }}>
              <h2>탈퇴하시겠습니까?</h2>
              <Button
                variant='contained'
                onClick={memberWithdraw}
              >
                yes
              </Button>
              <Modal
                hideBackdrop
                open={cwithdrawopen}
                onClose={cwithdrawhandleClose}
              >
                <Box sx={{ ...style }}>
                  <h2>탈퇴가 완료되었습니다.</h2>
                  <NextLink
                    href="/login"
                  >
                    <Button
                      onClick={cwithdrawhandleClose}
                      variant="outlined"
                    >
                      확인
                    </Button>
                  </NextLink>
                </Box>
              </Modal>
              <Button
                variant='outlined'
                onClick={pwithdrawhandleClose}
              >
                no
              </Button>
            </Box>
          </Modal>
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
              <Div>{data.id}</Div>
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
              <Div>{data.email}</Div>
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
                onChange={formik.handleChange}
                margin="normal"
                onBlur={formik.handleBlur}
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
                label="Password"
                margin="normal"
                name="password"
                error={Boolean((formik.touched.password && formik.errors.password))}
                helperText={(formik.touched.password && formik.errors.password)}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
                autoComplete="current-password"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={1}
            >
              <Typography
                color="textSecondary"
                variant='caption'
              >
                [경고] 비밀번호 값이 존재하면 비밀번호가 변경됩니다.
              </Typography>
              </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="ConfirmPassword"
                margin="normal"
                name="confirmpassword"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                error={Boolean((formik.touched.confirmpassword && formik.errors.confirmpassword))}
                helperText={(formik.touched.confirmpassword && formik.errors.confirmpassword)}
                value={formik.values.confirmpassword}
                variant="outlined"
                autoComplete="current-password"
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
              <Button
                onClick={chandleOpen}
                variant='outlined'
                startIcon={<DeleteIcon />}
              >
                취소
              </Button>
              <Modal
                open={cancleopen}
                onClose={chandleClose}
              >
                <Box sx={{ ...style }}>
                  <h2>취소하시겠습니까?</h2>
                  <NextLink href="/">
                    <Button
                      variant='contained'
                    >
                      yes
                    </Button>
                  </NextLink>
                  <Button
                    variant='outlined'
                    onClick={chandleClose}
                  >
                    no
                  </Button>
                </Box>
              </Modal>
            </Box>
            <Box>
              <Passwordvalidation />
            </Box>
          </Stack>
        </Box>
      </Card>
    </form>
  );
};
