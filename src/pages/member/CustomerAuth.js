import React, { useState} from 'react';
import axios from 'axios';
import {
    Button, Grid, IconButton,
  } from '@mui/material';
import Fingerprint from '@mui/icons-material/Fingerprint';

const CustomerAuth = (no) => {
    const [open, setOpen] = useState(false);
    var temp = new Date();
    var date = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate() + ' ' + temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
    const nDate = date;
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const memno = no.no;
    const authCustomer =(memno,e)=> {
        console.log(memno, e);
        const url = `http://localhost:8080/restapi/memberre/Auth/` + memno;
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
    }
    return (
        <Grid>
            <IconButton aria-label="fingerprint" color="success" onClick={(e) => {authCustomer(memno=memno)}}>
              <Fingerprint />
            </IconButton>
        </Grid>
    )

}

export default CustomerAuth;