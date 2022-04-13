import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FindPass = () => {
    const router = useRouter();
    const formik = useFormik({
      validationSchema: Yup.object({
        email: Yup
          .string()
          .email(
            'Must be a valid email')
          .max(255)
          .required(
            'Email is required'),
        password: Yup
          .string()
          .max(255)
          .required(
            '가입 시 입력한 이메일 주소가 필요합니다')
      }),
      onSubmit: () => {
        router.push('/');
      }
    });
  
    return (
      <>
        <Head>
          <title>FindId | Material Kit</title>
        </Head>
        <Box
          component="main"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%'
          }}
        >
          <Container maxWidth="sm">
            <NextLink
              href="/login"
              passHref
            >
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
              >
                이전 화면
              </Button>
            </NextLink>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                 error={Boolean(formik.touched.userid && formik.errors.userid)}
                fullWidth
                helperText={formik.touched.userid && formik.errors.userid}
                label="아이디"
                margin="normal"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="name"
                variant="outlined"
                />
            
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="인증번호"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                variant="outlined"
               />

                <Box sx={{ py: 1 }}>
                  <Typography align = 'center'>
                    <Button
                        color="primary"
                        disabled={formik.isSubmitting}
                        style={{width:"45%"}}
                        size="middle"
                        type="submit"
                        variant="outlined"
                    >
                      비밀번호 찾기
                    </Button>
                  </Typography>
               </Box>
            </form>
          </Container>
        </Box>
      </>
    );
  };
  
  export default FindPass;