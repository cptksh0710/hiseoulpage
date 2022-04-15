import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField
  } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

const CustomerAdd = () => {
    // 날짜 형식 만들기
    var temp = new Date();
    var date = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate() + ' ' + temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
    const nDate = date;
    const handleFormSubmit = (e) => {
        e.preventDefault()
            addMember()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
    }
    const [open, setOpen] = useState(false);

    const handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
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
        setOpen(false); 
        location.reload();
        return (axios.post(url, formData, config)
          .then(response => {
            console.log('response :', JSON.stringify(response, null, 2))
          }).catch(error => {
            console.log('failed', error)
          })) 
    }
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
            'ID is required'),
        name: Yup
          .string()
          .max(255)
          .required(
            'Name is required'),
        password: Yup
          .string()
          .max(255)
          .required(
            'Password is required'),
        permission: Yup
          .string()
          .max(255)
          .required(
            'Permission is required')        
      }),
    });
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                회원 정보 등록
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  회원 정보 등록<br/>
                  Create_member
                </DialogTitle>
                <DialogContent dividers>
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
                    /><br/>
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
                    /><br/>
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
                    /><br/>
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
                    /><br/>
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
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}    
export default CustomerAdd;