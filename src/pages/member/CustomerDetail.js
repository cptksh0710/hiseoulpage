import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField
} from '@mui/material';  

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const CustomerDetail = (no) => {
    const memno = no.no;
    const [memdetail, setMemDetail] = useState({});
    
    const [open, setOpen] = useState(false);

    const getdetail =(memno) =>{
      const callurl = `http://localhost:8080/restapi/memberre/` + memno;  
      return (axios.get(callurl)
          .then(response => {
            console.log('response :', JSON.stringify(response, null, 2))
            setMemDetail(response.data); 
          }).catch(error => {
            console.log('failed', error)
          })
        ) 
    }
    console.log(memdetail);
    var temp = new Date();
    var date = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate() + ' ' + temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
    const nDate = date;
    const handleOpen = () => {
        getdetail(memno);
        setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleFormSubmit = (e) => {
      e.preventDefault()
          addMember()
          .then((response) => {
              console.log(response.data);
              this.props.stateRefresh();
          })
    }
    //const upCustomer = () => {
    //  const url = 'http://localhost:8080/restapi/memberre';
    //  const formData = new FormData();
    //  formData.append("no", 0);
    //  formData.append("id", formik.values.id);
    //  formData.append("pass", formik.values.password);
    //  formData.append("name", formik.values.lastName);
    //  formData.append("email", formik.values.email);
    //  formData.append("instanceyn", "N");
    //  formData.append("writedate", nDate);
    //  formData.append("update", nDate);
    //  formData.append("permission", formik.values.permission);
    //  formData.append("auth", 0);
    //  formData.append("activeyn", "Y");
    //  const config = {
    //    headers: {
    //      "content-type": "multipart/form-data",
    //    },
    //  };
    //  setOpen(false); 
    //  location.reload();
    //  return (axios.post(url, formData, config)
    //    .then(response => {
    //      console.log('response :', JSON.stringify(response, null, 2))
    //    }).catch(error => {
    //      console.log('failed', error)
    //    })) 
    //}
    //const formik = useFormik({
    //  initialValues: {
    //    email: '',
    //    id: '',
    //    name: '',
    //    password: '0000',
    //    permission: '9',
    //    instanceyn: '',
    //    activeyn:'',
    //    auth:'',
    //    policy: false
    //  },
    //  validationSchema: Yup.object({
    //    email: Yup
    //      .string()
    //      .email(
    //        'Must be a valid email')
    //      .max(255)
    //      .required(
    //        'Email is required'),
    //    id: Yup
    //      .string()
    //      .max(255)
    //      .required(
    //        'ID is required'),
    //    name: Yup
    //      .string()
    //      .max(255)
    //      .required(
    //        'Name is required'),
    //    password: Yup
    //      .string()
    //      // Password Rule (영문, 숫자, 특수문자 포함 8~20글자)
    //      .matches(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/, 
    //      "비밀번호는 영문, 숫자, 특수문자를 조합하여 8자리 이상 20글자 이하의 길이로 구성하여야합니다.")
    //      .max(255)
    //      .required(
    //        'Password is required'),
    //    permission: Yup
    //      .string()
    //      .max(255)
    //      .required(
    //        'Permission is required')        
    //  }),
    //});
      return (
        <div>
            <IconButton aria-label="fingerprint" onClick={handleOpen}>
              <AssignmentIndIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  회원 세부 정보<br/>
                  Detail_member
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                    value={memdetail.no}
                    variant="outlined"
                    />
                    <TextField
                    value={memdetail.writedate}
                    variant="outlined"
                    /><br/>
                    <TextField
                    value={memdetail.id}
                    variant="outlined"
                    />
                    <TextField
                    value={memdetail.name}
                    variant="outlined"
                    /><br/>
                    <TextField
                    value={memdetail.email}
                    variant="outlined"
                    />
                    <TextField
                    value={memdetail.auth}
                    variant="outlined"
                    /><br/>
                    <TextField
                    value={memdetail.permission}
                    variant="outlined"
                    />
                    <TextField
                    value={memdetail.update}
                    variant="outlined"
                    /><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary">수정</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default CustomerDetail;