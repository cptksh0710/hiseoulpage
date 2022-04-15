import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const router = useRouter();
  const logo = {
    mainlogo: "/static/images/avatars/login_logo.png",
  };
  const formik = useFormik({
    initialValues: {
      userid: "",
      password: "",
    },
    validationSchema: Yup.object({
      userid: Yup.string().max(255).required("ID를 입력하세요"),
      password: Yup.string().max(255).required("비밀번호를 입력하세요"),
    }),
    onSubmit: () => {
      router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Login | HISEOUL ML CONSOLE</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <Grid align="center">
            <Avatar
              src={logo.mainlogo}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography align="center" color="textPrimary" variant="h4">
                HISEOUL ML CONSOLE
              </Typography>
              <Typography align="center" color="textSecondary" gutterBottom variant="body2">
                로그인 화면 입니다
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.userid && formik.errors.userid)}
              fullWidth
              helperText={formik.touched.userid && formik.errors.userid}
              label="User ID"
              margin="normal"
              name="userid"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="userid"
              value={formik.values.userid}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />

            <Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} sx={{ mt: 1, mb: 2 }}>
                  <Button
                    color="info"
                    fullWidth
                    onClick={formik.handleSubmit}
                    size="large"
                    variant="contained"
                  >
                    로그인
                  </Button>
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 1, mb: 2 }}>
                  <Button
                    fullWidth
                    color="error"
                    onClick={formik.handleChange}
                    size="large"
                    variant="contained"
                    href="/register"
                  >
                    회원 가입
                  </Button>
                </Grid>
              </Grid>
            </Typography>

            <Typography>
              <Grid container>
                <Grid item xs>
                  <NextLink href="/findid">
                    <Link
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      아이디 찾기
                    </Link>
                  </NextLink>
                </Grid>
                <Grid item>
                  <NextLink href="/findpass">
                    <Link
                      variant="subtitle2"
                      underline="hover"
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      비밀번호 찾기
                    </Link>
                  </NextLink>
                </Grid>
              </Grid>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
}

export default Login;
